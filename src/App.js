import Account from './components/Account/Account';
import logo from './logo.png';
import './App.css';
import Header from './components/Header/Header';
import Transaction from './components/Transaction/Transaction';
import Settings from './components/Profile/Settings';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Account/>}/>
          <Route path='/profile' element={<Settings/>}/>
        </Routes>
      
      <section className='transactions'>
        <Transaction cost={10} tag={"shop"}/>
        <Transaction cost={5} tag={"bus"}/>
      </section>
      <Menu/>
    </BrowserRouter>
  );
}

export default App;
