import { UserContextProvider } from '@/context/userContext';
import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
const theme = extendTheme({
  colors: {
    brand: {
      'purple': '#9981F9'
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}
