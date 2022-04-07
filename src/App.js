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
import Tag from './components/Tag';
import NotFound from './components/NotFound';



function App({props}) {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Main accountData={props.accountData} transactions={props.transactions}/>}/>
          <Route path='/profile' element={<Profile accountData={props.accountData}/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/test' element={<div>
              <Tag tag='shop'/>
            </div>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Menu/>
    </BrowserRouter>
  );
}

export default App;
