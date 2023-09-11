
import { BsSearch } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { SklepCategories, OffersSection } from '../../sections';
import styles from './sklep.module.css';

const Sklep = () => {
    return (
        <main className={styles.main}>
            <form className={styles.search}>
                <input className={styles.search__input} type="text" placeholder='Wyszukaj' aria-label='Wyszukaj' />
                <button className={styles.search__button}>
                    <BsSearch />
                </button>
                <button type='button' className={styles.search__filtersToggle}>
                    <FaFilter />
                </button>
            </form>
            <SklepCategories />
            <OffersSection
                heading='Zyskujące popularność'
                offersCondition='popular'
            />
            <OffersSection
                heading='Najnowsze'
                offersCondition='new'
            />
        </main>
    )
}

export default Sklep
