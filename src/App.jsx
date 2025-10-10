//Zona de importacion

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
//Pages
import { Home } from "./pages/Home"
import { Laptop } from "./pages/Laptop"
import { Movil } from "./pages/Movil"

const App = () => {
  //Zona de la logica


  return (
    <>
    <BrowserRouter>
      <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/movil" element={<Movil />} />
        <Route path="/laptop" element={<Laptop />} />
        
        <Route path="*" element={<Home/>} />
        
      </Routes>
      <Footer />

      </div>
    
    </BrowserRouter>
    </>
  )
}

export default App