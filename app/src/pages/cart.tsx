import { useAppContext } from '@/context/context';
import styles from '@/components/Asteroid/styles.module.css'
import React from 'react';
import { getPhrase } from '@/utils';
import { dateOptions } from '@/constants';
import Arrow from '@/components/Arrow/Arrow';
import image from '@/assets/asteroid.png'
import Image from 'next/image';
import DangerIcon from '@/components/Icons/DangerIcon';
import PlanetLayout from '@/components/PlanetLayout/PlanetLayout';
import cartStyles from '@/styles/cart.module.css'
import { OneAsteroid } from '@/types';
import AsteroidIcon from '@/components/Icons/AsteroidIcon';
import Link from 'next/link';
const cart = () => {
    const { items, spacing }: any = useAppContext()


    console.log(items)
    return (
        <PlanetLayout>
            <div>
                <div className={cartStyles.title}>Заказ отправлен!</div>
                {items.length !== 0 ?

                    items.map((item: OneAsteroid) => {
                        const date = new Date(item.close_approach_data[0].close_approach_date).toLocaleString("ru-US", dateOptions as Intl.DateTimeFormatOptions)
                        const lunarDistance = Math.floor(+item.close_approach_data[0].miss_distance.lunar)
                        const kmDistance = Math.floor(+item.close_approach_data[0].miss_distance.kilometers)
                        const distance = spacing === 'km' ? kmDistance.toLocaleString() + ' км' : lunarDistance.toLocaleString() + getPhrase(lunarDistance)
                        const diameter = Math.floor(item.estimated_diameter.meters.estimated_diameter_min).toLocaleString()
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
                                    <AsteroidIcon size={+item.estimated_diameter.meters.estimated_diameter_min > 150 ? 'big' : 'small'} />
                                    <div className={styles.description}>
                                        <Link href={`${item.id}`}>
                                            <div className={styles.name}>
                                                {item.name}
                                            </div>
                                        </Link >
                                        <div className={styles.diameter}>
                                            {diameter} м
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div className={styles.danger}>
                                        {item.is_potentially_hazardous_asteroid && <div className={styles.dangerContainer}><DangerIcon /><div className={styles.danger}>Опасен</div></div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className={cartStyles.empty}>Корзина пуста</div> // TODO styles and layouts
                }
            </div>
        </PlanetLayout>
    );
};

export default cart;