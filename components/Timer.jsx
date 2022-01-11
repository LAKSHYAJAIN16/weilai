import React from 'react';
import { useTimer } from 'react-timer-hook';
import { doc, getDocs, setDoc, collection, getDoc } from "firebase/firestore";

import { db } from "../logic/firebase";

export default function Timer({ className, ui = true, subLabel = true }) {
    const getTime = () => {
        const currentDate = new Date(Date.now());
        let nearestHour = currentDate.getHours() + 1;
        nearestHour === 25 ? nearestHour = 1 : nearestHour = nearestHour;
        currentDate.setHours(nearestHour);
        currentDate.setMinutes(0, 0, 0, 0);
        return currentDate;
    }

    const getLastUpdate = async (date) => {
        //Get Last Update
        const last_Update = await (await getDoc(doc(db, "updates", "last-update"))).data().time;
        const last_update_date = new Date(last_Update);
        if (last_update_date === date) {
            console.log("Already Updated");
            return false;
        }
        return true;
    }

    const deduct = async (date) => {
        if (getLastUpdate(date)) {
            const dateId = date.toISOString();

            //Push the Last Update time
            await setDoc(doc(db, "updates", "last-update"), {
                time: dateId
            })

            //Retrieve ALL THE Data
            console.log("latest update pushed");
            const snap = await getDocs(collection(db, "users"));
            snap.forEach(async (doc_card) => {
                //Deduct value
                try {
                    let temp_doc_card = doc_card.data();
                    let temp_cards = [];
                    const cards = doc_card.data().cards;
                    const id = doc_card.id;
                    cards.map(async (card) => {
                        let temp_card = card;
                        temp_card.intelligence -= 1;
                        temp_card.health -= 1;
                        temp_card.strength -= 1;
                        temp_cards.push(temp_card);
                    })
                    temp_doc_card.cards = temp_cards;
                    console.log(temp_doc_card);
                    await setDoc(doc(db, "users", id), temp_doc_card);
                }
                catch {
                    // Oh no!
                }
            });

            window.location.reload();
        }
    }

    const RawTimer = ({ expiryTimestamp }) => {
        const {
            seconds,
            minutes,
            hours,
            days,
            isRunning,
            start,
            pause,
            resume,
            restart,
        } = useTimer({ expiryTimestamp, onExpire: () => deduct(expiryTimestamp) });
        return (
            <div className={className}>
                {ui && (
                    <>
                        <h1>{minutes}:{seconds.toString().length === 1 ? "0" + seconds.toString() : seconds.toString()}</h1>
                        {
                            subLabel && (
                                <p>Time left til next deduction</p>
                            )
                        }
                    </>
                )}

                {/* <button onClick={() => deduct(expiryTimestamp)}>Test</button> */}
                <style jsx>{`
                 h1 {
                   color: white;
                   font-size:4em;
                   font-weight:300;
                   text-align:center;
                 }
                 p {
                     text-align: center;
                     margin-left: -40px;
                     margin-top: -30px;
                 }
                 `}</style>
            </div>
        )
    }

    return (
        <>
            <RawTimer expiryTimestamp={getTime()} />
        </>
    )

}
