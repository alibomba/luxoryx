
import { Hero, HomeOffersSection } from '../../sections';
import styles from './home.module.css';

const Home = () => {
    return (
        <>
            <Hero />
            <main>
                <HomeOffersSection
                    heading='Na przecenie'
                    buttonContent='Zobacz więcej'
                    offersCondition='discount'
                />
                <HomeOffersSection
                    heading='Ograniczony zasób'
                    buttonContent='Przejdź do sklepu'
                    offersCondition='limited'
                />
            </main>
        </>
    )
}

export default Home
