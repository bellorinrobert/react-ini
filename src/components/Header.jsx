import { Link } from "react-router-dom"
import FiltroCategoria from "./FiltroCategoria"


export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
            
          <Link to={'/home'} className="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'/movil'} className="nav-link" href="#">Movil</Link>
        </li>
        <li className="nav-item">
          <Link to={'/laptop'} className="nav-link" href="#">Lapto</Link>
        </li>
        <li className="nav-item">
          <Link to={'/tablets'} className="nav-link" href="#">Tablet</Link>
        </li>
        <li className="nav-item">
          <Link to={'/tienda'} className="nav-link" href="#">Tienda</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
               <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorias
          </a>
          <ul class="dropdown-menu">
            <FiltroCategoria />
            
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>


  )
}
