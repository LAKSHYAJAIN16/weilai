import React, { useState, useEffect } from "react";
import Head from "next/head";
import { setDoc, doc } from "firebase/firestore";

import ThemeWrapper from "../../components/ThemeWrapper";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Post-Registration.module.css";
import { cards } from "../../cards.config";
import { db } from "../../logic/firebase";

export default function Postregistration() {
  const [user, setUser] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("weilai_user")) || null;
    setUser(user);
    selectRandomCards();
  }, []);

  const selectRandomCards = () => {
    let temp_cards = [];
    for (let i = 0; i < 4; i++) {
      temp_cards.push(
        cards[
          Math.min(
            Math.max(Math.floor(Math.random() * cards.length), 1),
            cards.length
          )
        ]
      );
    }
    setSelectedCards(temp_cards);
  };

  const pushToBackend = async () => {
    console.log(user);
    const data = {
      cards: selectedCards,
      name: user.displayName,
      profilePic: user.photoURL,
    };
    await setDoc(doc(db, "users", user.displayName), data);
    window.localStorage.setItem("weilai_data", JSON.stringify(data));

    console.log("Well its done!");
    window.location.replace("/holdings/user");
  };

  return (
    <div>
      <Head>
        <title>Weilai</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <ThemeWrapper>
        <div className="main_new">
          <Navbar user={user} />
          <div className={styles.title}>Welcome to Weilai!</div>
          <p className={styles.subTitle}>Your Cards are -</p>
          <div className={styles.cards}>
            {selectedCards.map((card) => (
              <Card card={card} key={Math.floor(Math.random() * 1617)} />
            ))}
          </div>
          <button
            className={styles.continueButton}
            onClick={() => pushToBackend()}
          >
            Continue
          </button>
        </div>
      </ThemeWrapper>
    </div>
  );
}
