import '@/styles/globals.css';
import { createContext, useState  } from 'react';

export const AppContext = createContext();

export default function App({ Component, pageProps }) {
  const [context, setContext] = useState({ network: null, channel: null })

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
