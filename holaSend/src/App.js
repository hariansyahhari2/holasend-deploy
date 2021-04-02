import './App.css';
import { Provider } from 'react-redux';
import store from './configs/store';
import Routes from './configs/routes';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
