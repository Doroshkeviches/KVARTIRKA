import Image from 'next/image';
import React from 'react';
import image from '@/assets/asteroid.png'
interface Props {
    size: string
}
const AsteroidIcon = ({ size }: Props) => {
    return (
        <Image style={{
            width: size === 'big' ? 50 : 30,
            height: size === 'big' ? 50 : 30,
            margin: '0px 8px'
        }} src={image} alt="" />
    );
};

export default AsteroidIcon;