import { RealityProvider } from '../components/RealityProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <RealityProvider>
      <Component {...pageProps} />
    </RealityProvider>
  );
}
