import React from 'react';
import Image from 'next/image';
import rarityToColor from '../logic/rarity-to-color';

import styles from "../styles/Card.module.css";

export default function Card({ card }) {
    return (
        <div className={styles.card} style={{ backgroundColor: rarityToColor(card.rarity) }}>
            <Image src={card.image} width={"150px"} height={"150px"} />
            <p className={styles.name}>{card.name}</p>
            <p className={styles.desc}>{card.desc}</p>
            <br />
            <p className={styles.property}>Health : {card.health}</p>
            <p className={styles.property}>Strength : {card.strength}</p>
            <p className={styles.property}>Intelligence : {card.intelligence}</p>
        </div>
    )
}
