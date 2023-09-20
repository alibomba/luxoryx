import { useState, useEffect, useRef } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import styles from './kontoSettings.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const KontoSettings = ({ setError }: Props) => {
  const [pfp, setPfp] = useState<string>('/img/default-pfp.jpg');
  const usernameRef = useRef<HTMLParagraphElement>(null);
  const cityRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const phoneNumberRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosClient({
      method: 'get',
      url: '/settings',
      cancelToken: source.token
    })
      .then(res => {
        const data: Settings = res.data;
      })
      .catch(err => {
        setError('Coś poszło nie tak, spróbuj ponownie później...');
      })

    return () => {
      source.cancel();
    }

  }, []);

  function handleImageChange(e: React.ChangeEvent) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setPfp(e.target?.result as string);
        }

        reader.readAsDataURL(file);
      }
      else {
        alert('Niepoprawny typ pliku. Wybierz obraz.');
      }
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.main__heading}>Ustawienia konta</h1>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Informacje</h2>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Zdjęcie profilowe</p>
          <div className={styles.section__field__right}>
            <label className={styles.section__imgLabel} htmlFor="pfp">
              <img className={styles.section__imgLabel__img} src={pfp} alt="zdjęcie profilowe" />
              <AiOutlineCamera className={styles.section__imgLabel__icon} />
            </label>
            <button className={styles.section__deletePfp}>Usuń</button>
            <input accept='image/*' onChange={handleImageChange} id='pfp' type="file" style={{ display: 'none' }} />
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Nazwa użytkownika</p>
          <div className={styles.section__field__right}>
            <p ref={usernameRef} className={styles.section__value}>Wojtek</p>
            <button className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Dane dostawy</h2>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Miasto</p>
          <div className={styles.section__field__right}>
            <p ref={cityRef} className={styles.section__value}>Bielsko-Biała</p>
            <button className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Adres</p>
          <div className={styles.section__field__right}>
            <p ref={addressRef} className={styles.section__value}>ul.Partyzantów, 48A</p>
            <button className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>E-mail</p>
          <div className={styles.section__field__right}>
            <p ref={emailRef} className={styles.section__value}>wojtek@gmail.com</p>
            <button className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Numer telefonu</p>
          <div className={styles.section__field__right}>
            <p ref={phoneNumberRef} className={styles.section__value}>123 123 123</p>
            <button className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Bezpieczeństwo</h2>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Hasło</p>
          <div className={styles.section__field__right}>
            <p className={styles.section__value}>&#183; &#183; &#183; &#183; &#183; &#183; &#183; &#183;</p>
            <button className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default KontoSettings
