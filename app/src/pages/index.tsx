import { API_KEY, url } from '@/constants';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/main.module.css'
import Asteroid from '@/components/Asteroid/Asteroid';
import { useAppContext } from '@/context/context';
import { getNoun } from '@/utils';
import Link from 'next/link';
import Company from '@/components/Company/Company';
import PlanetLayout from '@/components/PlanetLayout/PlanetLayout';
import { Context, OneAsteroid } from '@/types';

const main = () => {
    const [nextLink, setNextLink] = useState<RequestInfo | URL>('')
    const [fetching, setFetching] = useState(false)
    const [asteroidList, setAsteroidList] = useState<OneAsteroid[]>([])
    const { items, spacing, setSpacing }: any = useAppContext()

    useEffect(() => {
        console.log(document.documentElement.scrollHeight, 'height')
        console.log(document.documentElement.scrollTop, 'ScrollTop')
        console.log(window.innerHeight, 'InnetHeight')



        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        fetch(url + '/feed' + `?start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}&detailed=false&api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const datesArray = Object.keys(data.near_earth_objects)
                datesArray.map(it => {
                    setAsteroidList(prev => [...prev, ...data.near_earth_objects[it]])
                })
                setNextLink(data.links.next)
            })
    }, [])

    useEffect(() => {
        if (fetching) {
            fetch(nextLink)
                .then(res => res.json())
                .then(data => {
                    const datesArray = Object.keys(data.near_earth_objects)
                    datesArray.map(it => {
                        setAsteroidList(prev => [...prev, ...data.near_earth_objects[it]])
                    })
                    setNextLink(data.links.next)
                    setFetching(false)
                })
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [fetching])

    const scrollHandler = (): void => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 10) {
            setFetching(true)
        }
    }

    return (
        <PlanetLayout>
            <div className={styles.container}>
                <div className={styles.title}>Ближайшие подлёты астероидов</div>
                <div className={styles.change}>
                    <div style={{
                        textDecorationLine: spacing === 'km' ? 'underline' : 'none'
                    }} className={styles.changeItem} onClick={() => setSpacing('km')}>
                        в километрах
                    </div>
                    <div className={styles.changeSeparator}> | </div>
                    <div style={{
                        textDecorationLine: spacing === 'luna' ? 'underline' : 'none'
                    }} className={styles.changeItem} onClick={() => setSpacing('luna')}>
                        в лунных орбитах
                    </div>
                </div>
                {asteroidList.map(item => {
                    return (
                        <Asteroid item={item} />
                    )
                })}
                {fetching ? <div className={styles.loading}>Loading...</div> : null}
            </div>
            <div className={styles.cart}>
                <div>
                    <div className={styles.cartTitle}>Корзина</div>
                    <div className={styles.count}>{items.length} {getNoun(items.length, 'астероид')}</div>
                </div>
                <button className={styles.button}>
                    <Link href="/cart">Отправить</Link>
                </button>
            </div>
        </PlanetLayout>
    );
};

export default main;