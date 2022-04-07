import Account from './components/Account/Account';
import logo from './logo.png';
import './App.css';
import Header from './components/Header/Header';
import Transaction from './components/Transaction/Transaction';
import Settings from './components/Profile/Settings';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      <Menu/>
    </BrowserRouter>
  );
}

export default App;
