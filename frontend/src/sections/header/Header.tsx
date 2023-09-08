import { BsFillSendFill, BsSearch, BsInstagram, BsTwitter, BsFillCartFill } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';

import styles from './header.module.css';

const Header = () => {
    const { isAuthorized } = useContext<ContextType>(AuthContext);
    const [isNavActive, setIsNavActive] = useState<boolean>(false);

    function toggleNav(): void {
        setIsNavActive(prev => !prev);
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <form className={styles.top__row}>
                    <label className={styles.top__heading}>Newsletter</label>
                    <input className={styles.top__input} type="email" placeholder='Adres e-mail' />
                    <button className={styles.top__button}>
                        <BsFillSendFill />
                    </button>
                </form>
                <form className={styles.top__row}>
                    <input className={styles.top__input} placeholder='Wyszukaj' aria-label='Wyszukaj' type="text" />
                    <button className={styles.top__button}>
                        <BsSearch />
                    </button>
                </form>
                <div className={styles.top__row}>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <FaFacebookF />
                    </a>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <BsInstagram />
                    </a>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <BsTwitter />
                    </a>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
            <div className={styles.header__bottom}>
                <Link to='/'>
                    <img className={styles.header__logo} src="/img/logo.png" alt="logo sklepu" />
                </Link>
                <nav className={styles.header__nav}>
                    <Link className={styles.header__navLink} to='/sklep'>Sklep</Link>
                    <button className={styles.header__navLink}>Kategorie</button>
                    <Link className={styles.header__navLink} to='/o-firmie'>O firmie</Link>
                    <Link className={styles.header__navLink} to='/kontakt'>Kontakt</Link>
                    {
                        isAuthorized && <Link className={styles.header__navLink} to='/konto'>Konto</Link>
                    }
                    <Link className={styles.bottom__button} to='/koszyk'>
                        <BsFillCartFill />
                    </Link>
                    {
                        isAuthorized &&
                        <button className={styles.bottom__button}>
                            <IoLogOut />
                        </button>
                    }
                </nav>
            </div>
            <div className={styles.header__bottom_mobile}>
                <div className={styles.header__bottom_mobile__top}>
                    <Link onClick={() => setIsNavActive(false)} to='/'>
                        <img className={styles.header__logo} src="/img/logo.png" alt="logo sklepu" />
                    </Link>
                    <button onClick={toggleNav} className={`${styles.header__hamburger} ${isNavActive && styles.header__hamburger_active}`}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <nav className={`${styles.header__bottom_mobile__nav} ${isNavActive && styles.header__bottom_mobile__nav_active}`}>
                    <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/sklep'>Sklep</Link>
                    <button onClick={() => setIsNavActive(false)} className={styles.header__navLink}>Kategorie</button>
                    <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/o-firmie'>O firmie</Link>
                    <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/kontakt'>Kontakt</Link>
                    {
                        isAuthorized && <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/konto'>Konto</Link>
                    }
                    <Link onClick={() => setIsNavActive(false)} className={styles.bottom__button} to='/koszyk'>
                        <BsFillCartFill />
                    </Link>
                    {
                        isAuthorized &&
                        <button onClick={() => setIsNavActive(false)} className={styles.bottom__button}>
                            <IoLogOut />
                        </button>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header
