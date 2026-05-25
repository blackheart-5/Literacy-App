import "../styles/globals.css";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div key={router.pathname} className="page-fade">
      <Component {...pageProps} />
    </div>
  );
}
