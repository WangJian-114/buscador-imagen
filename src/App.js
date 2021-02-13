import React , {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // state de la app 
  const [ busqueda, guardarBusqueda ] = useState(''); 
  const [ imagenes, guardarImagenes ] = useState([]); 

  // state para paginador
  const [paginalactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  // Consultar la API
  useEffect (()=> {

    const consultarAPI = async () => {
      if(busqueda == "") return;

      const imagenesPorPagina = 30;
      const key = '20264455-368fab4464a76cf925ed88e95'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginalactual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);
      
      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    };

    consultarAPI();


  },[busqueda, paginalactual])

  const paginaAnterior = () => {


      const nuevaPaginaActual = paginalactual - 1;
      if(nuevaPaginaActual === 0 ) return;
      console.log(nuevaPaginaActual);
      guardarPaginaActual(nuevaPaginaActual);


  }

  const paginaSiguiente = ()=>{
    const nuevaPaginaActual = paginalactual + 1;
    if(nuevaPaginaActual > totalpaginas ) return;
    guardarPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        { (paginalactual === 1) ? null : 
          (<button
          type="button"
          className="btn btn-info mr-5 mb-3"
          onClick={paginaAnterior}

          > &laquo; Anterior </button>)
        }

        { (paginalactual === totalpaginas ? null :
            (
              <button
              type="button"
              className="btn btn-info mb-3"
              onClick={paginaSiguiente}
    
              >Siguiente &raquo;</button>
            )
          )
        }

      

      </div>
    </div>
  );
}

export default App;
