
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from './productTile.module.css';
import getOriginalPriceBasedOnDiscount from '../../utilities/getOriginalPriceBasedOnDiscount';
import isDateLaterThanNow from '../../utilities/isDateLaterThanNow';
import CountdownTimer from '../discountCountdown/CountdownTimer';

const ProductTile = (product: ProductTile) => {

    function toggleLike(): void {
        //toggle like
    }

    return (
        <article className={styles.product}>
            <Link to={`/produkt/${product.id}`}>
                <img className={styles.product__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${product.images[0].url}`} alt="miniatura produktu" />
            </Link>
            <div className={styles.product__data}>
                <h3 className={styles.product__title}><Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/produkt/${product.id}`}>{product.name}</Link></h3>
                <div className={styles.product__priceContainer}>
                    {
                        (product.discount && isDateLaterThanNow(product.discount.expires_at)) ?
                            <>
                                <p className={styles.product__price}>{(product.price).toFixed(2)}</p>
                                <p className={styles.product__oldPrice}>{(getOriginalPriceBasedOnDiscount(product.price, product.discount)).toFixed(2)}zł</p>
                                <p className={styles.product__discountPercentage}>{product.discount.percentage}%</p>
                            </>
                            : <p className={styles.product__price}>{(product.price).toFixed(2)}zł</p>
                    }
                </div>
                {
                    product.discount && <CountdownTimer targetDate={product.discount.expires_at} />
                }
                {
                    product.stock <= 30 && <p className={styles.product__stock}>Pozostało: {product.stock}</p>
                }
                <button onClick={toggleLike} className={styles.product__addToCart}>Dodaj do koszyka</button>
            </div>
            {
                (product.discount && isDateLaterThanNow(product.discount.expires_at)) && <p className={styles.product__discountOverlay}>-{product.discount.percentage}%</p>
            }
            <button className={styles.product__likeButton}>
                <AiOutlineHeart />
            </button>
        </article>
    )
}

export default ProductTile
