// pages/_app.tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

// Opcional: Extender el tema si necesitas personalizaciones
const theme = extendTheme({
  // tus personalizaciones de tema aquí
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

export default MyApp;