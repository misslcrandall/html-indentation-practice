import styles from './page.module.scss';
import QuestionCarousel from '@/app/ui/question-carousel/question-carousel';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Practice Editor | Front-end Dev Practice Tools | Lisa Crandall',
  description: 'Exercises for practicing HTML intdentation',
};


export default function Page() {
    return (
        <>
            <header>
                <h1>HTML Indentation Practice Editor</h1>
                <p className="instructions">Instruction Copy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </header>
            <QuestionCarousel />
            <footer>
                <p>Copyright 2026, Crandall Creative, LLC</p>
                <p><a href="https://lisaacrandall.com" target="_blank">lisaacrandall.com</a></p>
            </footer>
        </>
    );
}