

import styles from './filters.module.css';

interface Props {
    search: Search;
    setSearch: React.Dispatch<React.SetStateAction<Search>>;
    isFiltersModalActive: boolean;
    setIsFiltersModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Filters = ({ search, setSearch, isFiltersModalActive, setIsFiltersModalActive }: Props) => {
    return (
        <>
            <div style={{ display: isFiltersModalActive ? 'block' : 'none' }} className={styles.overlay}></div>
            <div style={{ display: isFiltersModalActive ? 'flex' : 'none' }} className={styles.filters}>
                <div className={styles.filters__row}>
                    <input min={0} onChange={(e) => { setSearch(prev => { return { ...prev, minPrice: e.target.value } }) }} value={search.minPrice && search.minPrice} className={styles.filters__input} aria-label='Cena od' placeholder='Cena od' step={0.01} type="number" />
                    <input min={0} onChange={(e) => { setSearch(prev => { return { ...prev, maxPrice: e.target.value } }) }} value={search.maxPrice && search.maxPrice} className={styles.filters__input} aria-label='Cena do' placeholder='Cena do' step={0.01} type="number" />
                    <input value={search.category && search.category} onChange={(e) => { setSearch(prev => { return { ...prev, category: e.target.value } }) }} className={styles.filters__input} aria-label='Kategoria' placeholder='Kategoria' type="text" />
                </div>
                <button onClick={() => setIsFiltersModalActive(false)} className={styles.filters__button}>Zapisz</button>
            </div>
        </>
    )
}

export default Filters
