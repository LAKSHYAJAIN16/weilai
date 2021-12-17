import React, { useState, useEffect } from "react";
import Head from "next/head";
import { collection, getDocs } from "firebase/firestore";

import ThemeWrapper from "../components/ThemeWrapper";
import Tradable from "../components/Tradable";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import Update from "../components/Update";
import { db } from "../logic/firebase";

export default function Marketplace() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [trades, setTrades] = useState(null);
  const [hot, setHot] = useState([]);
  const [mega, setMega] = useState([]);
  const [cheap, setCheap] = useState([]);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("weilai_user")) || null;
    const userData = JSON.parse(localStorage.getItem("weilai_data")) || null;
    setUser(user);
    setUserData(userData);

    if (!trades) {
      const tradables = [];
      const querySnapshot = await getDocs(collection(db, "tradables"));
      querySnapshot.forEach((doc) => {
        tradables.push(doc.data());
      });
      setTrades(tradables);

      //Take 4 elements as the hot ones randomly
      let hotOnes = [];
      const hot_count = 4;
      for (let i = 0; i < hot_count; i++) {
        hotOnes.push(tradables[Math.floor(Math.random() * tradables.length)]);
      }

      //Find the ones with the most strength, defence and intelligence and add them to the Mega ones
      let megaOnes = tradables;
      const mega_count = 4;
      for (var i = 0; i < megaOnes.length; i++) {
        for (var j = 0; j < megaOnes.length - i - 1; j++) {
          let prob_1 =
            (megaOnes[j].card.health * 1.5 +
              megaOnes[j].card.strength * 1.2 +
              megaOnes[j].card.intelligence * 1) /
            3.7;
          let prob_2 =
            (megaOnes[j + 1].card.health * 1.5 +
              megaOnes[j + 1].card.strength * 1.2 +
              megaOnes[j + 1].card.intelligence * 1) /
            3.7;
          if (prob_1 > prob_2) {
            var temp = megaOnes[j];
            megaOnes[j] = megaOnes[j + 1];
            megaOnes[j + 1] = temp;
          }
        }
      }
      megaOnes.splice(mega_count);

      //Find the ones which are the cheapest, and add them to the cheap ones
      let cheapOnes = tradables;
      const cheap_count = 4;
      for (var i = 0; i < cheapOnes.length; i++) {
        for (var j = 0; j < cheapOnes.length - i - 1; j++) {
          let prob_1 = cheapOnes[j].price.length;
          let prob_2 = cheapOnes[j + 1].price.length;
          if (prob_1 > prob_2) {
            var temp = cheapOnes[j];
            cheapOnes[j] = cheapOnes[j + 1];
            cheapOnes[j + 1] = temp;
          }
        }
      }
      cheapOnes.splice(cheap_count);

      setHot(hotOnes);
      setMega(megaOnes);
      setCheap(cheapOnes);
    }
  }, []);

  return (
    <>
      <ThemeWrapper>
        <Head>
          <title>Weilai</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
            rel="stylesheet"
          />
        </Head>

        <div className="main_new">
          <Navbar user={user} />
          <br />
          <div style={{marginTop:"-50px"}}>
            <Timer className="timer" ui={true} subLabel={false}/>
            <p className="timer">Time left til next deduction</p>
          </div>
          <h1 className="title">
            <span className="fire">🔥 Hot</span> Trades
          </h1>
          <p className="subtitle">
            Valuable AND Cheap : Grab 'em while they last
          </p>
          <div className="cards_new">
            {trades && (
              <>
                {hot.map((e) => (
                  <Tradable card={e} key={Math.floor(Math.random() * 1617)}/>
                ))}
              </>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1 className="title">
            <span className="flex">💪 Mega</span> Trades
          </h1>
          <p className="subtitle">The Rarest cards with the highest stats</p>
          <div className="cards_new">
            {trades && (
              <>
                {mega.map((e) => (
                  <Tradable card={e} key={Math.floor(Math.random() * 1617)}/>
                ))}
              </>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1 className="title">
            <span className="cheap">💰 Cheap</span> Deals!
          </h1>
          <p className="subtitle">Who doesn't like 'em?</p>
          <div className="cards_new">
            {trades && (
              <>
                {cheap.map((e) => (
                  <Tradable card={e} key={Math.floor(Math.random() * 1617)}/>
                ))}
              </>
            )}
          </div>
        </div>
      </ThemeWrapper>
      <style jsx>
        {`
          .title {
            text-align: center;
          }

          .subtitle {
            text-align: center;
          }

          .fire {
            background: -webkit-linear-gradient(
              rgb(255, 0, 0),
              rgb(255, 115, 0)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .flex {
            background: -webkit-linear-gradient(gold, rgb(255, 115, 0));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .cheap {
            background: -webkit-linear-gradient(lightgreen, green);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .timer{
            text-align:center;
            margin-top:-50px;
            margin-bottom:100px;
          }
        `}
      </style>
    </>
  );
}
