import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

import styles from "../styles/Home.module.css";
import ThemeWrapper from "./ThemeWrapper";
import { db } from "../logic/firebase";

export default function Navbar({ user }) {
  const marketPlaceToolTip = useRef(null);
  const createToolTip = useRef(null);
  const notificationsToolTip = useRef(null);
  const logoutToolTip = useRef(null);
  const inputRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (screen) {
      console.log(window.screen.width);
      setWidth(window.screen.width);
    }
  }, [])

  const showHoverTooltip = (ref) => {
    console.log(ref);
    ref.current.style.opacity = 1;
  };
  const hideHoverTooltip = (ref) => {
    ref.current.style.opacity = 0;
  };

  const search = async () => {
    const tradables = [];
    const querySnapshot = await getDocs(collection(db, "tradables"));
    querySnapshot.forEach((doc) => {
      tradables.push(doc.data());
    });
    // console.log(tradables);

    //Search Query
    const query = inputRef.current.value;
    var queryRegex = new RegExp(query.split('').join('\\w*').replace(/\W/, ""), 'i');

    const solutions = [];
    tradables.map((tradable) => {
      try {
        if (tradable.cardName.match(queryRegex)) {
          solutions.push(tradable);
        }
      }
      catch {

      }
    })

    window.localStorage.setItem("search_cache", JSON.stringify(solutions));
    window.location.replace("/search");
    console.log(solutions);
  }

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <ThemeWrapper>
        <span className={styles.titleWrapper}>
          <img
            src="/favicon.ico"
            className={styles.logo}
            alt="icon_weilai"
            onClick={() => window.location.replace("/")}
          />
          <p className={styles.title}>Weilai</p>

          <div className={styles.searchWrapper}>
            <i className={`bx bx-search-alt-2 ${styles.searchIcon}`} onClick={() => search()}></i>
            <input
              className={styles.searchInput}
              placeholder="Search for Trades.."
              ref={inputRef}
            ></input>
          </div>

          {width >= 600 && (
            <div className={styles.megaWrapper}>
              <div className={styles.leftWrapper}>
                <Link href="/holdings/user">
                  <i
                    className={`bx bx-wallet-alt ${styles.leftItem}`}
                    onMouseEnter={() => showHoverTooltip(marketPlaceToolTip)}
                    onMouseLeave={() => hideHoverTooltip(marketPlaceToolTip)}
                  ></i>
                </Link>

                <Link href="/marketplace">
                  <i
                    className={`bx bx-store-alt ${styles.leftItem}`}
                    onMouseEnter={() => showHoverTooltip(createToolTip)}
                    onMouseLeave={() => hideHoverTooltip(createToolTip)}
                  ></i>
                </Link>
                <Link href="/leaderboard/main">
                  <i
                    className={`bx bx-medal ${styles.leftItem}`}
                    onMouseEnter={() => showHoverTooltip(notificationsToolTip)}
                    onMouseLeave={() => hideHoverTooltip(notificationsToolTip)}
                  ></i>
                </Link>
                <Link href="/logout">
                  <i
                    className={`bx bx-exit ${styles.leftItem}`}
                    onMouseEnter={() => showHoverTooltip(logoutToolTip)}
                    onMouseLeave={() => hideHoverTooltip(logoutToolTip)}
                  ></i>
                </Link>
              </div>

              <div className={styles.tooltipWrapper}>
                <div
                  className={styles.tooltip}
                  style={{ marginLeft: "-70px" }}
                  ref={marketPlaceToolTip}
                >
                  Holdings
                </div>
                <div
                  className={styles.tooltip}
                  style={{ marginLeft: "-46px" }}
                  ref={createToolTip}
                >
                  Marketplace
                </div>
                <div
                  className={styles.tooltip}
                  style={{ marginLeft: "-9px" }}
                  ref={notificationsToolTip}
                >
                  Leaderboard
                </div>
                <div
                  className={styles.tooltip}
                  style={{ marginLeft: "49px" }}
                  ref={logoutToolTip}
                >
                  Logout
                </div>
              </div>
            </div>
          )}

          {width <= 600 && (
            <div>
              <i
                className={`bx bx-menu ${styles.leftItem}`}
                onClick={() => setPopUp(true)}
              ></i>
            </div>
          )}

          <div className={styles.userWrapper}>
            {user ? (
              <img
                src={user.photoURL}
                className={styles.userProfilePic}
                alt="profile pic"
              />
            ) :
              (
                <button className={styles.button} onClick={() => window.location.replace("/auth/login")}>Sign In</button>
              )}
          </div>
        </span>
        {popUp && (
          <div className={styles.popUp}>
            <div className={styles.popUpHead}>
              <p className={styles.popUpTitle}>Menu</p>
              <i className={`bx bxs-x-circle ${styles.popUpX}`} onClick={() => setPopUp(false)}></i>
            </div>
            <div className={`${styles.popUpHead} ${styles.popUpObject}`} onClick={() => window.location.replace("/holdings/user")}>
              <i
                className={`bx bx-wallet-alt ${styles.popUpIcon}`}
              ></i>
              <p className={styles.popUpName}>Holdings</p>
            </div>
            <div className={`${styles.popUpHead} ${styles.popUpObject}`} onClick={() => window.location.replace("/marketplace")}>
              <i
                className={`bx bx-store-alt ${styles.popUpIcon}`}
              ></i>
              <p className={styles.popUpName}>Marketplace</p>
            </div>
            <div className={`${styles.popUpHead} ${styles.popUpObject}`} onClick={() => window.location.replace("/leaderboard/main")}>
              <i
                className={`bx bx-medal ${styles.popUpIcon}`}
              ></i>
              <p className={styles.popUpName}>Leaderboard</p>
            </div>
            <div className={`${styles.popUpHead} ${styles.popUpObject}`} onClick={() => window.location.replace("/logout")}>
              <i
                className={`bx bx-exit ${styles.popUpIcon}`}
              ></i>
              <p className={styles.popUpName}>Logout</p>
            </div>
          </div>
        )}
      </ThemeWrapper>
    </>
  );
}
