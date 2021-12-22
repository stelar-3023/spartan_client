import { BrowserRouter } from 'react-router-dom';
import { Main } from './components/MainComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Provider store={store}>
          <Main />
          <ToastContainer theme='dark' />
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
