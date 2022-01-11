import React from 'react';
import styles from "../styles/Leaderboard.module.css";

export default function LeaderboardUser({ data }) {
    return (
        <div className={styles.user}>
            {/* {JSON.stringify(data)} */}
            <p className={styles.rank} style={{ color: data[2] === 1 ? "goldenrod" : "silver" }}>#{data[2]}</p>
            <img src={data[1].profilePic} className={styles.profilePic} />
            <p className={styles.name} style={{ color: data[2] === 1 ? "goldenrod" : "silver" }}>{data[1].name}</p>
            <p className={styles.score} style={{ color: data[2] === 1 ? "goldenrod" : "silver" }}>{Math.floor(data[0])}</p>
        </div>
    )
}
