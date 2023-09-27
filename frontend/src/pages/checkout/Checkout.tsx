import {useState, useEffect, useContext} from 'react';
import { ContextType, AuthContext} from '../../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';

import styles from './checkout.module.css';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';

const Checkout = () => {
    const {cart, setContextCart} = useContext<ContextType>(AuthContext);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {      
    //     return () => {
    //         setContextCart([]);
    //     }
    // }, []);


    async function submit(e: React.FormEvent){
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const city = form.querySelector('#city') as HTMLInputElement;
        const address = form.querySelector('#address') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const phoneNumber = form.querySelector('#phoneNumber') as HTMLInputElement;
        const checkedShipping = form.querySelector('[name="shipping"]:checked') as HTMLInputElement;
        const couponCode = form.querySelector('#couponCode') as HTMLInputElement;

        if(!checkedShipping){
            return setValidationError('Wybierz sposób dostawy');
        }
        if(couponCode.value){
            try{
                const res = await axiosClient({
                    method: 'get',
                    url: `/is-coupon-code-valid?code=${couponCode.value}`
                });
                if(!res.data.valid){
                    return setValidationError('Niepoprawny kod zniżkowy');
                }
            }catch(err){
                return setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if(error){
        return <Error>{error}</Error>
    }

    // if(cart.length === 0){
    //     return <Navigate to='/' />
    // }

    return (
        <main className={styles.main}>
            <h1 className={styles.main__heading}>Dostawa i płatność</h1>
            <form onSubmit={submit} className={styles.main__form}>
                <section className={styles.section}>
                    <h2 className={styles.section__heading}>Zmień adres</h2>
                    <div className={styles.section__grid}>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="city">Miasto</label>
                            <input max={100} required id='city' type="text" className={styles.section__input} />
                        </div>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="address">Adres</label>
                            <input max={100} required id='address' type="text" className={styles.section__input} />
                        </div>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="email">E-mail</label>
                            <input max={100} required id='email' type="email" className={styles.section__input} />
                        </div>
                        <div className={styles.section__field}>
                            <label className={styles.section__label} htmlFor="phoneNumber">Numeru telefonu</label>
                            <input max={100} required id='phoneNumber' type="text" className={styles.section__input} />
                        </div>
                    </div>
                </section>
                <section className={styles.section}>
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
                        <input className={styles.section__radio} type="radio" name="shipping" id='dpd' />
                        <label htmlFor="dpd" className={styles.section__label}>Kurier DPD</label>
                        <p className={styles.section__price}>19.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                    <div className={styles.section__shippingField}>
                        <div className={styles.section__shippingField__top}>
                        <input className={styles.section__radio} type="radio" name="shipping" id='dhl' />
                        <label htmlFor="dhl" className={styles.section__label}>Kurier DHL</label>
                        <p className={styles.section__price}>21.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                    <div className={styles.section__shippingField}>
                        <div className={styles.section__shippingField__top}>
                        <input className={styles.section__radio} type="radio" name="shipping" id='pocztaPolska' />
                        <label htmlFor="pocztaPolska" className={styles.section__label}>Poczta Polska</label>
                        <p className={styles.section__price}>15.99zł</p>
                        </div>
                        <p className={styles.section__expectedDate}>wt. 5 wrz.</p>
                    </div>
                </section>
                <section className={`${styles.section} ${styles.section_discount}`}>
                    <label className={styles.section__heading} htmlFor="couponCode">Kod zniżkowy</label>
                    <input id='couponCode' className={`${styles.section__input} ${styles.section__input_wide}`} type="text" />
                </section>
                {
                    validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                }
                <button className={styles.form__button}>Płacę</button>
            </form>
        </main>
    )
}

export default Checkout
