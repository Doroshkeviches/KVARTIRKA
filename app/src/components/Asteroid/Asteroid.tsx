import React, { useState } from 'react';
import styles from './styles.module.css'
import Image from 'next/image';
import { dateOptions } from '@/constants';
import Arrow from '../Arrow/Arrow';
import { useAppContext } from '@/context/context';
import { getNumber, getPhrase } from '@/utils';
import DangerIcon from '@/components/Icons/DangerIcon'
import Link from 'next/link';
import { Context, OneAsteroid } from '@/types';
import AsteroidIcon from '../Icons/AsteroidIcon';
interface Props {
    item: OneAsteroid,
}
const Asteroid = ({ item }: Props) => {
    const { items, spacing, updateItems }: any = useAppContext()

    const buttonHandler = () => {
        updateItems(item)

    }

    const date = new Date(item.close_approach_data[0].close_approach_date).toLocaleString("ru-US", dateOptions as Intl.DateTimeFormatOptions)
    const lunarDistance = item.close_approach_data[0].miss_distance.lunar
    const kmDistance = item.close_approach_data[0].miss_distance.kilometers
    const distance = spacing === 'km' ? getNumber(kmDistance) + ' км' : getNumber(lunarDistance) + getPhrase(lunarDistance)
    const diameter = getNumber(item.estimated_diameter.meters.estimated_diameter_min)

    return (
        <div key={item.id} className={styles.item}>
            <div className={styles.date}>{date}</div>
            <div className={styles.asteroid}>
                <div className={styles.distanceContainer}>
                    <div className={styles.distance}>
                        {distance}
                    </div>
                    <Arrow />
                </div>
                <AsteroidIcon size={+item.estimated_diameter.meters.estimated_diameter_min > 150 ? 'big' : 'small' }/>
                <div className={styles.description}>
                    <Link href={`${item.id}`}>
                        <div className={styles.name}>
                            {item.name}
                        </div>
                    </Link>
                    <div className={styles.diameter}>
                        {diameter} м
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => {
                    buttonHandler()
                }} className={styles.button}>Заказать</button>
                {item.is_potentially_hazardous_asteroid && <div className={styles.dangerContainer}><DangerIcon /><div className={styles.danger}>Опасен</div></div>}
            </div>
        </div>
    );
};

export default Asteroid;