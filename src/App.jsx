//Zona de importacion
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
//Pages
import { Home } from "./pages/Home"
import { Laptop } from "./pages/Laptop"
import { Movil } from "./pages/Movil"
import { Detalle } from "./pages/Detalle"
import { Table } from "./pages/Table"
import { Categorias } from "./pages/Categorias"
import { Tienda } from "./pages/Tienda"
import Busqueda from "./pages/Busqueda"
import Tablas from "./pages/Tablas"
import { CarritoProvider } from "./context/CarritoContext"



const App = () => {
 
  

    

  return (
    <>
    <CarritoProvider> 

      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/movil"  element={<Movil  />} />
            <Route path="/laptop" element={<Laptop  />} />
            <Route path="/tablets" element={<Table  />} />
            <Route path="/tienda" element={<Tienda  />} />
            <Route path="/busquedas" element={<Busqueda  />} />
            <Route path="/tabla" element={<Tablas />} />
            <Route path="/detalle/:id/:name" element={<Detalle />} />
            <Route path="/categorias/:cate/:name" element={<Categorias  />} />


            <Route path="*" element={<Home />} />

          </Routes>
          <Footer />

        </div>

      </BrowserRouter>
    </CarritoProvider>
    </>
  )
}

export default App