import { Carrusel } from "../components/Carrusel"
import b1 from '../assets/b1m.jpg'

export const Home = () => {
  return (
    <div>
      <Carrusel />
      <div className="container">
      <h1 className="text-center py-5">Herramientas utilizadas</h1>
      <div className="row">
        <div className="col-md-6">
          <p className="text-end">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni alias fuga, odit ea iusto, minima ratione eaque placeat quo rerum? <strong>Numquam facilis</strong> assumenda asperiores iure aliquid quibusdam tempore amet. 
          </p>
          <p>
            <span className="text-success">Lorem ipsum, dolor sit amet consectetur adipisicing elit</span>. Laborum laudantium, incidunt asperiores similique deserunt quia temporibus velit ex officia doloribus? Illo perspiciatis ipsam a repellendus mollitia accusamus! Nemo, debitis veritatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, cumque doloremque velit quaerat reprehenderit dicta. Quia, veniam id! Excepturi nisi quisquam illum necessitatibus iusto ea placeat velit ratione quia ullam.
          </p>
          <div className="text-end py-3">
          <a href="" className="btn btn-info">Ir a la pagina oficial</a>

          </div>
        </div>
        <div className="col-md-6">
          <img src={b1} alt="" className="img-fluid" />
        </div>

      </div>

      </div>
    </div>
  )
}
