export function getNoun(num: number, str1: string) {
    const n = num % 100
    if ((n >= 5 && n <= 20) || n === 0) {
        return str1 + 'ов';
    }
    const p = num % 10
    if (p >= 2 && p <= 4) {
        return str1 + 'a';
    }
    if ((p >= 5 && p <= 9) || p === 0) {
        return str1 + 'ов';
    }
    return str1;
}

export function getPhrase(num: number | string) {
    const a = Math.floor(+num)
    const n = a % 100
    if ((n >= 5 && n <= 20) || n === 0) {
        return ' лунных орбит';
    }
    const p = a % 10
    if (p >= 2 && p <= 4) {
        return ' лунныe орбиты';
    }
    if ((p >= 5 && p <= 9) || p === 0) {
        return ' лунных орбит';
    }
    return ' лунная орбита';
} 
export function getNumber(num : number | string) {
    return Math.floor(+num).toLocaleString()
}