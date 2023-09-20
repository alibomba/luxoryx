import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Error from '../../components/error/Error';
import { KontoSettings, KontoMyOrders, KontoFavorites } from '../../sections';

import styles from './konto.module.css';

type Tab = 'settings' | 'myOrders' | 'favorites';

const tabsAllowed = ['settings', 'myOrders', 'favorites'];

const Konto = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(searchParams.get('tab')){
            if(!tabsAllowed.includes(searchParams.get('tab') as string)){
                setError('Niepoprawna zakładka');
            }
        }
    }, []);

    const [tab, setTab] = useState<Tab>(searchParams.get('tab') as Tab || 'settings');
    const views = {
        settings: <KontoSettings />,
        myOrders: <KontoMyOrders />,
        favorites: <KontoFavorites />
    }

    if(error){
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            {views[tab]}
        </main>
    )
}

export default Konto
