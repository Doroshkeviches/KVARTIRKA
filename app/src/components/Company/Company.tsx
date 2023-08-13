import React from 'react';
import styles from './styles.module.css'
import Link from 'next/link';
const Company = () => {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <div className={styles.title}>
                    ARMAGEDDON 2023
                </div>
            </Link>

            <div className={styles.description}>ООО “Команда им. Б. Уиллиса”.<br />Взрываем астероиды с 1998 года.</div>
        </div>
    );
};

export default Company;