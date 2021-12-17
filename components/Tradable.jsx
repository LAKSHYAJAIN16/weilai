import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import rarityToColor from '../logic/rarity-to-color';
import styles from "../styles/Card.module.css";

export default function Tradable({ card }) {
    const [priceSTR, setPriceSTR] = useState(null);
    useEffect(() => {
        if (!priceSTR) {
            let temp_price = "";
            card.price.map((e) => {
                temp_price += `${e}, `;
            })
            temp_price = temp_price.substring(0, temp_price.length - 2);
            if (temp_price === "") {
                temp_price = "Free!"
            }
            else {
                temp_price = "Price : " + temp_price;
            }
            setPriceSTR(temp_price);
        }
    }, [])

    return (
        <div className={styles.card} style={{ backgroundColor: rarityToColor(card.card.rarity), cursor: "pointer" }} onClick={() => window.location.replace(`/trade/specific?id=${card.id}`)}>
            <Image src={card.card.image} width={"120px"} height={"120px"} />
            <p className={styles.name}>{card.card.name}</p>
            <p className={styles.desc} style={{ fontSize: "0.7em" }}>{card.card.desc}</p>
            <br />
            <p className={styles.property}>Health : {card.card.health}</p>
            <p className={styles.property}>Strength : {card.card.strength}</p>
            <p className={styles.property}>Intelligence : {card.card.intelligence}</p>
            <p className={styles.property} style={{ color: "red", fontSize: "1em", padding: "10px", fontWeight:"bold" }}>{priceSTR}</p>
        </div>
    )
}
