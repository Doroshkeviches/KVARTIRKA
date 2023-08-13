import { FC, ReactNode } from 'react';
import React  from 'react';
import Company from '../Company/Company';
import styles from './style.module.css'
type Childrens = {
    children: ReactNode;
}
const PlanetLayout = ({ children } : Childrens) => {
    return (
        <>
            <Company />
            <div className={styles.body}>
                <div className={styles.planet}>

                </div>
                {children}
            </div>
        </>
    );
};

export default PlanetLayout;