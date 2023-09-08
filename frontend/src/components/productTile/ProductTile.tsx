
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from './productTile.module.css';

const ProductTile = () => {
    return (
        <article className={styles.product}>
            <Link to='/produkt/1'>
                <img className={styles.product__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/offer1.jpg`} alt="miniatura produktu" />
            </Link>
            <div className={styles.product__data}>
                <h3 className={styles.product__title}><Link style={{ color: 'inherit', textDecoration: 'none' }} to='/produkt/1'>Nazwa produktu fajna bardzo taka ze dluga</Link></h3>
                <div className={styles.product__priceContainer}>
                    <p className={styles.product__price}>499zł</p>
                    <p className={styles.product__oldPrice}>889zł</p>
                    <p className={styles.product__discountPercentage}>40%</p>
                </div>
                <p className={styles.product__discountTimer}>
                    01:22:28:11
                </p>
                <button className={styles.product__addToCart}>Dodaj do koszyka</button>
            </div>
            <p className={styles.product__discountOverlay}>-40%</p>
            <button className={styles.product__likeButton}>
                <AiOutlineHeart />
            </button>
        </article>
    )
}

export default ProductTile
