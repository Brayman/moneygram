import './App.css';
import Header from './components/Header/Header';
import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import Tag from './components/Tag';
import NotFound from './components/NotFound';
import AddContainer from './components/AddTransaction/AddConteiner';
import { connect } from 'react-redux';



function App({transaction, accountData}) {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Main accountData={accountData} transactions={transaction.transactions}/>}/>
          <Route path='/profile' element={<Profile accountData={accountData}/>}/>
          <Route path='/settings/*' element={<Settings/>}/>
          <Route path='/add' element={<AddContainer/>}/>
          <Route path='/test' element={<div>
              <Tag tag='shop'/>
            </div>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Menu/>
    </BrowserRouter>
  );
}
const mapStateToProps = state => {
  return {
      transaction: state.transactions,
      accountData: state.account
  }
}

export default connect(mapStateToProps)(App);
