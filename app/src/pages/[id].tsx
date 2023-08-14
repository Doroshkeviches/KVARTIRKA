import { API_KEY, url } from '@/constants';
import { useAppContext } from '@/context/context';
import { getNumber, getPhrase } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/singleAsteroid.module.css'
import { OneAsteroid, Close, Context } from '@/types';

export default function () {
    const { spacing } = useAppContext() as Context

    const { query } = useRouter()
    const id = query.id
    const [asteroid, setAsteroid] = useState<OneAsteroid>()
    const [fetching, setFetching] = useState(true)
    useEffect(() => {
        if (id) {
            fetch(url + `/neo/${id}` + `?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setAsteroid(data)
                    setFetching(false)
                })
        }
    }, [id])
    
    if (fetching) {
        return (
            <div style={{
                color: 'white'
            }}>
                Fetching...
            </div>
        )
    }
    return (
        <div>
            <div className={styles.title}>Название: {asteroid?.name}</div>
            <div className={styles.text}>absolute magnitude {asteroid?.absolute_magnitude_h}</div>
            <div className={styles.closeContainer}>Cближения: {asteroid?.close_approach_data.map((item: Close) => {
                return (
                    <div className={styles.close}>
                        <div className={styles.text}>Скорость относительно земли {getNumber(item.relative_velocity.kilometers_per_second)} км/с</div>
                        <div className={styles.text}>Время максимального сближения с землей {item.close_approach_date_full}</div>
                        <div className={styles.text}>Расстояние до Земли: {spacing === 'km' ? getNumber(item.miss_distance.kilometers) + ' км' : getNumber(item.miss_distance.lunar) + getPhrase(item.miss_distance.lunar)}</div>
                        <div className={styles.text}>Летит вокруг: {item.orbiting_body}</div>
                    </div>
                )
            })}</div>
        </div>
    )
}