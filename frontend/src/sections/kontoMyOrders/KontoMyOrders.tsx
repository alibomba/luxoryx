import { useState, useEffect } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import styles from './kontoMyOrders.module.css';
import axios from 'axios';
import axiosClient from '../../axiosClient';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const KontoMyOrders = ({ setError }: Props) => {
  const [orders, setOrders] = useState<PaginationResponse<Order> | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosClient({
      method: 'get',
      url: '/my-orders',
      cancelToken: source.token
    })
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

    return () => {
      source.cancel();
    }

  }, []);

  return (
    <main className={styles.main}>
      <article className={styles.order}>
        <img className={styles.order__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="miniatura oferty" />
        <div className={styles.order__data}>
          <h3 className={styles.order__title}>Nazwa produktu fajna</h3>
          <p className={styles.order__quantity}>2x499zł</p>
          <p className={styles.order__price}>898zł</p>
        </div>
        <button className={styles.order__button}>
          <AiFillWarning className={styles.order__icon} />
          <span className={styles.order__button__text}>Zgłoś problem z zakupem</span>
        </button>
        <Link to='/zwrot/123' className={styles.order__button}>
          <FaArrowRotateLeft className={styles.order__icon} />
          <span className={styles.order__button__text}>Zwróć</span>
        </Link>
      </article>
      <article className={styles.order}>
        <img className={styles.order__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="miniatura oferty" />
        <div className={styles.order__data}>
          <h3 className={styles.order__title}>Nazwa produktu fajna</h3>
          <p className={styles.order__quantity}>2x499zł</p>
          <p className={styles.order__price}>898zł</p>
        </div>
        <button className={styles.order__button}>
          <AiFillWarning className={styles.order__icon} />
          <span className={styles.order__button__text}>Zgłoś problem z zakupem</span>
        </button>
        <Link to='/zwrot/123' className={styles.order__button}>
          <FaArrowRotateLeft className={styles.order__icon} />
          <span className={styles.order__button__text}>Zwróć</span>
        </Link>
      </article>
      <article className={styles.order}>
        <img className={styles.order__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="miniatura oferty" />
        <div className={styles.order__data}>
          <h3 className={styles.order__title}>Nazwa produktu fajna</h3>
          <p className={styles.order__quantity}>2x499zł</p>
          <p className={styles.order__price}>898zł</p>
        </div>
        <button className={styles.order__button}>
          <AiFillWarning className={styles.order__icon} />
          <span className={styles.order__button__text}>Zgłoś problem z zakupem</span>
        </button>
        <Link to='/zwrot/123' className={styles.order__button}>
          <FaArrowRotateLeft className={styles.order__icon} />
          <span className={styles.order__button__text}>Zwróć</span>
        </Link>
      </article>
      <article className={styles.order}>
        <img className={styles.order__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="miniatura oferty" />
        <div className={styles.order__data}>
          <h3 className={styles.order__title}>Nazwa produktu fajna</h3>
          <p className={styles.order__quantity}>2x499zł</p>
          <p className={styles.order__price}>898zł</p>
        </div>
        <button className={styles.order__button}>
          <AiFillWarning className={styles.order__icon} />
          <span className={styles.order__button__text}>Zgłoś problem z zakupem</span>
        </button>
        <Link to='/zwrot/123' className={styles.order__button}>
          <FaArrowRotateLeft className={styles.order__icon} />
          <span className={styles.order__button__text}>Zwróć</span>
        </Link>
      </article>
      <article className={styles.order}>
        <img className={styles.order__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/1.jpg`} alt="miniatura oferty" />
        <div className={styles.order__data}>
          <h3 className={styles.order__title}>Nazwa produktu fajna</h3>
          <p className={styles.order__quantity}>2x499zł</p>
          <p className={styles.order__price}>898zł</p>
        </div>
        <button className={styles.order__button}>
          <AiFillWarning className={styles.order__icon} />
          <span className={styles.order__button__text}>Zgłoś problem z zakupem</span>
        </button>
        <Link to='/zwrot/123' className={styles.order__button}>
          <FaArrowRotateLeft className={styles.order__icon} />
          <span className={styles.order__button__text}>Zwróć</span>
        </Link>
      </article>
      {/* <div className={styles.pagination}>
        <button onClick={prevPage} aria-disabled={products.currentPage === 1} disabled={products.currentPage === 1} className={`${styles.pagination__button} ${products.currentPage === 1 && styles.pagination__button_disabled}`}>
          <BsArrowLeft />
        </button>
        <div className={styles.pagination__numbers}>
          <p className={`${styles.pagination__number} ${styles.pagination__number_current}`}>{products.currentPage}</p>
          <div className={styles.pagination__line}></div>
          <p className={`${styles.pagination__number} ${styles.pagination__number_total}`}>{products.lastPage}</p>
        </div>
        <button onClick={nextPage} aria-disabled={products.currentPage === products.lastPage} disabled={products.currentPage === products.lastPage} className={`${styles.pagination__button} ${products.currentPage === products.lastPage && styles.pagination__button_disabled}`}>
          <BsArrowRight />
        </button>
      </div> */}
    </main>
  )
}

export default KontoMyOrders
