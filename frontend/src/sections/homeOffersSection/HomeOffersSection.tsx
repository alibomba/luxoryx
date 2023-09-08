
import { Link } from 'react-router-dom';
import HeadingStars from '../../components/headingStars/HeadingStars';
import ProductTile from '../../components/productTile/ProductTile';
import ProductsGroup from '../../components/productsGroup/ProductsGroup';
import styles from './homeOffersSection.module.css';

interface Props {
    heading: string;
    buttonContent: string;
    offersCondition: 'discount' | 'limited';
}

const HomeDiscounts = ({ heading, buttonContent, offersCondition }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>{heading}</h2>
            <HeadingStars />
            <ProductsGroup marginTop='3em'>
                <ProductTile />
                <ProductTile />
                <ProductTile />
                <ProductTile />
                <ProductTile />
                <ProductTile />
            </ProductsGroup>
            <Link className={styles.section__button} to='/sklep'>{buttonContent}</Link>
        </section>
    )
}

export default HomeDiscounts
