import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { RuteoPrincipal } from './routes/RuteoPrincipal';

const cargarComponente = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className="mt-3">
        <span className='spinner-grow spinner-grow-sm fs-4 fw-bold text-danger'></span>
        <br />
        <span className='text-center fst-italic fs-3 text-danger'> Cargando</span>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={cargarComponente()}>
        <RuteoPrincipal />
      </Suspense>


    </BrowserRouter>
  );
}

export default App;
