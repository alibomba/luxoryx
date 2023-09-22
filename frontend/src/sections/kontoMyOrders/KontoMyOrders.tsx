import { useState, useEffect } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import {BsArrowLeft, BsArrowRight} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styles from './kontoMyOrders.module.css';
import axios from 'axios';
import axiosClient from '../../axiosClient';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const KontoMyOrders = ({ setError }: Props) => {
  const [orders, setOrders] = useState<PaginationResponse<OrderWithProduct> | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosClient({
      method: 'get',
      url: `/my-orders?page=${page}`,
      cancelToken: source.token
    })
      .then(res => {
        setNoResults(false);
        setOrders(res.data);
      })
      .catch(err => {
        if(err?.response?.status === 404 && err?.response?.data?.message === 'Brak wyników'){
          setNoResults(true);
        }
        else{
          setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
      });

    return () => {
      source.cancel();
    }

  }, [page]);

  function prevPage(){
    if(orders?.currentPage !== 1){
      setPage(prev => prev - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  }

  function nextPage(){
    if(orders?.currentPage !== orders?.lastPage){
      setPage(prev => prev + 1);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  }

  return (
    <main className={styles.main}>
      {
        noResults === true && <p className={styles.noResults}>Brak zamówień</p>
      }
      {
        (noResults === false && orders && orders.data.length !== 0) &&
        <>
          {orders.data.map(order => {
            return (
              <article key={order.id} className={styles.order}>
                <img className={styles.order__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${order.product.images[0].url}`} alt="miniatura oferty" />
                <div className={styles.order__data}>
                  <h3 className={styles.order__title}>{order.product.name}</h3>
                  <p className={styles.order__quantity}>{order.quantity}x{order.sold_at_price}zł</p>
                  <p className={styles.order__price}>{order.quantity*order.sold_at_price}zł</p>
                </div>
                <button className={styles.order__button}>
                  <AiFillWarning className={styles.order__icon} />
                  <span className={styles.order__button__text}>Zgłoś problem z zakupem</span>
                </button>
                <Link to={`/zwrot/${order.id}`} className={styles.order__button}>
                  <FaArrowRotateLeft className={styles.order__icon} />
                  <span className={styles.order__button__text}>Zwróć</span>
                </Link>
              </article>
            )
          })}
          {
            orders.lastPage > 1 &&
            <div className={styles.pagination}>
              <button onClick={prevPage} aria-disabled={orders.currentPage === 1} disabled={orders.currentPage === 1} className={`${styles.pagination__button} ${orders.currentPage === 1 && styles.pagination__button_disabled}`}>
                <BsArrowLeft />
              </button>
              <div className={styles.pagination__numbers}>
                <p className={`${styles.pagination__number} ${styles.pagination__number_current}`}>{orders.currentPage}</p>
                <div className={styles.pagination__line}></div>
                <p className={`${styles.pagination__number} ${styles.pagination__number_total}`}>{orders.lastPage}</p>
              </div>
              <button onClick={nextPage} aria-disabled={orders.currentPage === orders.lastPage} disabled={orders.currentPage === orders.lastPage} className={`${styles.pagination__button} ${orders.currentPage === orders.lastPage && styles.pagination__button_disabled}`}>
                <BsArrowRight />
              </button>
            </div>
          }
        </>
      }
    </main>
  )
}

export default KontoMyOrders
