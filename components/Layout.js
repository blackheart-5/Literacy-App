import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flashcard Language Learning App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2024 Flashcard Language Learning App</p>
      </footer>
    </div>
  );
}