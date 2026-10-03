import styles from './page.module.scss';
import QuestionCarousel from '@/app/ui/question-carousel/question-carousel';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Practice Editor | Front-end Dev Practice Tools | Lisa Crandall',
  description: 'Exercises for practicing HTML intdentation',
};

const year = String(new Date().getFullYear());

export default function Page() {
    return (
        <>
            <header className={`${styles.header}`}>
                <h1>HTML Indentation Practice</h1>
                <p className={`${styles.instructions}`}>Complete the questions below to practice HTML indentation.</p>
            </header>
            <QuestionCarousel />
            <footer className={`${styles.footer} flex justify-content`}>
                <p>Copyright {year}, Crandall Creative, LLC</p>
                <p><a href="https://lisaacrandall.com" target="_blank">lisaacrandall.com</a></p>
            </footer>
        </>
    );
}