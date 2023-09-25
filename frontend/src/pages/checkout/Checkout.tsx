import {useEffect, useContext} from 'react';
import { ContextType, AuthContext} from '../../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';

import styles from './checkout.module.css';

const Checkout = () => {
    const {cart, setContextCart} = useContext<ContextType>(AuthContext);

    useEffect(() => {      
        return () => {
            setContextCart([]);
        }
    }, []);

    if(cart.length === 0){
        return <Navigate to='/' />
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.main__heading}>Dostawa i płatność</h1>
            <form className={styles.main__form}>
                <section className={styles.section}>
                    <h2 className={styles.section__heading}>Zmień adres</h2>
                    <div className={styles.section__grid}>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="city">Miasto</label>
                            <input id='city' type="text" className={styles.section__input} />
                        </div>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="address">Adres</label>
                            <input id='address' type="text" className={styles.section__input} />
                        </div>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="email">E-mail</label>
                            <input id='email' type="email" className={styles.section__input} />
                        </div>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="phoneNumber">Numeru telefonu</label>
                            <input id='phoneNumber' type="text" className={styles.section__input} />
                        </div>
                    </div>
                </section>
                <section className={styles.form__section}>
                    <h2 className={styles.section__heading}>Sposób dostawy</h2>
                    <div className={styles.section__shippingField}>
                        <div className={styles.section__shippingField__top}>
                        <input className={styles.section__radio} type="radio" name="shipping" id='inpost' />
                        <label htmlFor="inpost" className={styles.section__label}>Paczkomat InPost</label>
                        <p className={styles.section__price}>9.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                    <div className={styles.section__shippingField}>
                        <div className={styles.section__shippingField__top}>
                        <input className={styles.section__radio} type="radio" name="shipping" id='inpost' />
                        <label htmlFor="inpost" className={styles.section__label}>Kurier DPD</label>
                        <p className={styles.section__price}>19.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                    <div className={styles.section__shippingField}>
                        <div className={styles.section__shippingField__top}>
                        <input className={styles.section__radio} type="radio" name="shipping" id='inpost' />
                        <label htmlFor="inpost" className={styles.section__label}>Kurier DHL</label>
                        <p className={styles.section__price}>21.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                    <div className={styles.section__shippingField}>
                        <div className={styles.section__shippingField__top}>
                        <input className={styles.section__radio} type="radio" name="shipping" id='inpost' />
                        <label htmlFor="inpost" className={styles.section__label}>Poczta Polska</label>
                        <p className={styles.section__price}>15.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                </section>
                <section className={styles.form__section}>
                    <label className={styles.section__heading} htmlFor="couponCode">Kod zniżkowy</label>
                    <input className={`${styles.section__input} ${styles.section__input_wide}`} type="text" />
                </section>
                <button className={styles.form__button}>Płacę</button>
            </form>
        </main>
    )
}

export default Checkout
