
import { Hero, OffersSection, HomeTestimonials } from '../../sections';
import styles from './home.module.css';

const Home = () => {
    return (
        <>
            <Hero />
            <main>
                <OffersSection
                    heading='Na przecenie'
                    buttonContent='Zobacz więcej'
                    offersCondition='discount'
                />
                <OffersSection
                    heading='Ograniczony zasób'
                    buttonContent='Przejdź do sklepu'
                    offersCondition='limited'
                />
                <HomeTestimonials />
            </main>
        </>
    )
}

export default Home
