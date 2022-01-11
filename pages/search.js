import React, { useState, useEffect } from "react";
import Head from "next/head";

import ThemeWrapper from "../components/ThemeWrapper";
import Navbar from "../components/Navbar";
import Tradable from "../components/Tradable";

export default function Search() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("weilai_user")) || null;
    const userData = JSON.parse(localStorage.getItem("weilai_data")) || null;
    const searchData = JSON.parse(localStorage.getItem("search_cache")) || null;
    console.log(searchData);
    localStorage.setItem("search_cache", JSON.stringify([]));
    setUser(user);
    setUserData(userData);
    setSearchData(searchData);
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
          <div className="cards_new">
            {searchData && (
              <>
                {searchData.map((e) => (
                  <Tradable card={e} key={Math.floor(Math.random() * 1617)}/>
                ))}
              </>
            )}
          </div>
        </div>
      </ThemeWrapper>
    </>
  );
}
