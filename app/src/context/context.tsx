import { Close, Context, OneAsteroid } from '@/types';
import { ReactNode, createContext, useContext, useState } from 'react';

const AppContext = createContext<Context | string>('');
type Childrens = {
    children: ReactNode;
}
export function AppWrapper({ children }: Childrens) {
    const [items, setItems] = useState<OneAsteroid[]>([])
    const [spacing, setSpacing] = useState<string>('km')
    const updateItems = (newItems: OneAsteroid) => {
        setItems((prev) => [...prev, newItems]);
    }
    const updateSpacing = (str: string) => {
        setSpacing(str)
    }
    return (
        <AppContext.Provider value={{
            items,
            updateItems,
            spacing,
            updateSpacing,
        } as Context}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}