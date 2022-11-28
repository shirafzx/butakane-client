import { BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import { createTheme, NextUIProvider } from "@nextui-org/react"

import Navbar from './components/Navbar';
import AnimatedRouter from './components/AnimatedRouter'



const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {background: '#18191A',
    text: '#fff',
    link: '#fff',}
  }
})

function App() {
  
  return (

    <NextUIProvider theme={darkTheme}>
      <Router>
        <Navbar/>
        <AnimatedRouter />
      </Router>
    </NextUIProvider>

  );
}

export default App;
