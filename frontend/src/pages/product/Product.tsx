
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {BsShareFill} from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {Navigate, useNavigate} from 'react-router-dom';
import RateStars from '../../components/rateStars/RateStars';
import CountdownTimer from '../../components/discountCountdown/CountdownTimer';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import styles from './product.module.css';

const Product = () => {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.header__left}>
                    <img className={styles.header__thumbnail} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="miniatura oferty" />
                    <div className={styles.header__images}>
                        <img className={styles.header__image} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="zdjęcie produktu" />
                        <img className={styles.header__image} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="zdjęcie produktu" />
                        <img className={styles.header__image} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="zdjęcie produktu" />
                        <img className={styles.header__image} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="zdjęcie produktu" />
                        <img className={styles.header__image} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="zdjęcie produktu" />
                    </div>
                </div>
                <div className={styles.header__right}>
                    <div className={styles.header__row}>
                        <h1 className={styles.header__title}>Nazwa produktu fajna ten no</h1>
                        <button className={styles.header__blueButton}>
                            <BsShareFill />
                        </button>
                        <button className={styles.header__blueButton}>
                            <AiOutlineHeart />
                        </button>
                    </div>
                    <div className={styles.header__row}>
                        <p className={styles.header__category}>Zegarki</p>
                        <RateStars howMany={2} />
                    </div>
                    <div className={styles.header__row}>
                        <button className={styles.header__variantButton}>Srebrny</button>
                        <button className={styles.header__variantButton}>Złoty</button>
                        <button className={styles.header__variantButton}>Czarny</button>
                    </div>
                    <div className={styles.header__row}>
                        <p className={styles.header__price}>1479zł</p>
                        <p className={styles.header__oldPrice}>4199zł</p>
                        <p className={styles.header__discountPercentage}>40%</p>
                    </div>
                    <CountdownTimer targetDate='2023-10-10T10:00:00.000Z'/>
                    <p className={styles.header__stock}>Pozostało: 11</p>
                    <div className={styles.header__row}>
                        <button className={`${styles.header__quantityButton}`}>
                            <AiOutlineMinus />
                        </button>
                        <p className={styles.header__quantity}>1</p>
                        <button className={`${styles.header__quantityButton}`}>
                            <AiOutlinePlus />
                        </button>
                    </div>
                    <button className={styles.header__addToCart}>Dodaj do koszyka</button>
                    <button className={styles.header__buyNow}>Kup teraz</button>
                </div>
            </header>
        </main>
    )
}

export default Product
