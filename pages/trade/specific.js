import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import ThemeWrapper from "../../components/ThemeWrapper";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import { db } from "../../logic/firebase";
import { cards } from "../../cards.config";

import styles from "../../styles/Trade.module.css";

export default function Specific() {
  const { asPath } = useRouter();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const [cardData, setCardData] = useState(null);

  useEffect(async () => {
    //Boiler-Plate
    const user = JSON.parse(localStorage.getItem("weilai_user")) || null;
    const userData = JSON.parse(localStorage.getItem("weilai_data")) || null;
    setUser(user);
    setUserData(userData);

    //Retreive the data using the getDoc method
    let id = asPath.replace("/trade/specific?id=", "");
    id = id
      .replace("%20", " ")
      .replace("%20", " ")
      .replace("%20", " ")
      .replace("%20", " ")
      .replace("%20", " ")
      .replace("%20", " ");
    const _doc = await getDoc(doc(db, "tradables", id));
    setCardData(_doc.data());
  }, []);

  const Option = ({ name }) => {
    return (
      <div className={styles.option}>
        <span>&rarr; </span>
        <span>{name}</span>
      </div>
    );
  };

  const tradeToBackend = async () => {
    //Check if our purchaser has the required cards
    const purchaser_cards = userData.cards;
    const price = cardData.price;
    let valid = true;
    let price_cards = [];

    price.map((e) => {
      let satisfied = false;
      purchaser_cards.map((f) => {
        if (e === f.name && !satisfied) {
          satisfied = true;
          price_cards.push(f);
        }
      });
      if (!satisfied) {
        valid = false;
        throw new Error(
          "You cannot trade! You do not satisfy the requirements!"
        );
      }
    });

    //Check if we are trading to ourself
    if (userData.username === cardData.username) {
      valid = false;
      throw new Error("You cannot trade to yourself!");
    }

    //If it is valid, proceed with the transaction
    //First, deduct the card from the recipent and add the price cards
    const recipentData = await getDoc(doc(db, "users", cardData.username));
    let recipentCardsData = recipentData.data();
    let recipentCardsTemp = recipentCardsData["cards"];
    recipentCardsTemp = recipentCardsTemp.concat(price_cards);
    for (let i = 0; i < recipentCardsTemp.length; i++) {
      //Deduct card
      if (recipentCardsTemp[i].name === cardData.cardName) {
        recipentCardsTemp.splice(i, 1);
        break;
      }
    }

    //Then, deduct the price cards from the purchaser and add the card
    let purchaserCardsTemp = purchaser_cards;
    purchaserCardsTemp.push(cardData.card);
    price_cards.map((e) => {
      purchaserCardsTemp.splice(purchaserCardsTemp.indexOf(e), 1);
    });

    //Push the Recipent Cards
    const recipentDoc = doc(db, "users", cardData.username);
    const recipentDataF = {
      name: cardData.username,
      profilePic: recipentCardsData.profilePic,
      cards: recipentCardsTemp,
    };
    await setDoc(recipentDoc, recipentDataF);

    //Push the purchaser Cards
    const purchaserDoc = doc(db, "users", userData.name);
    const purchaserDataF = {
      name: userData.name,
      profilePic: userData.profilePic,
      cards: purchaserCardsTemp,
    };
    localStorage.setItem("weilai_data", JSON.stringify(purchaserDataF));
    await setDoc(purchaserDoc, purchaserDataF);

    // Delete the tradable, because the transaction has happened
    const tradableDoc = doc(db, "tradables", cardData.id);
    await deleteDoc(tradableDoc);

    //🤝 Transaction done!
    window.location.replace("/ui/handshake");
    console.log("If everything went right, there should be a transaction");
    console.log({ purchaserDataF, recipentDataF });
  };

  return (
    <>
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
        <div className={`main_new`}>
          <Navbar user={user} />
          <div className={styles.main}>
            {cardData && (
              <>
                <Card card={cardData.card} />
                <div className={styles.right}>
                  <h1>{`Trade For ${cardData.cardName}`}</h1>
                  <h5
                    style={{ textAlign: "center", marginTop: "-30px" }}
                  >{`By ${cardData.username}`}</h5>
                  <p>Requirements : </p>
                </div>
                <div
                  className={styles.optionsWrapper}
                  style={{ marginTop: "140px", marginLeft: "-400px" }}
                >
                  {cardData.price.map((e) => (
                    <Option name={e} key={Math.floor(Math.random() * 1617)} />
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            className={styles.submitButton}
            onClick={() => tradeToBackend()}
          >
            Trade
          </button>
        </div>
      </ThemeWrapper>
    </>
  );
}
