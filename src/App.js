import './App.css';
import Header from './components/Header/Header';
import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Main from './components/Main/MainContainer';
import Profile from './components/Profile/Profile';
import Tag from './components/Tag';
import NotFound from './components/NotFound';
import AddContainer from './components/AddTransaction/AddConteiner';
import { connect } from 'react-redux';
import { setCardsAC } from './redux/account';
import { setCurrentPageAC, setTransactionsAC } from './redux/transactions';



function App({setCards, accountData}) {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route  path='/'
                  element={<Main/>}/>
          <Route path='/profile' element={<Profile accountData={accountData} setCards={setCards}/>}/>
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
    transaction: {
      transactions: state.transactions.transactions,
      newTrans: state.transactions.newTrans
    },
    accountData: state.account,
    pageSize: state.transactions.pageSize,
    totalTransCount: state.transactions.totalTransCount,
    curentPage: state.transactions.curentPage
  }
}
const mapDispatchToProps = dispatch => {
  return {
      setTransaktions: data => dispatch(setTransactionsAC(data)),
      setCards: data => dispatch(setCardsAC(data)),
      setCurrentPage: page => dispatch(setCurrentPageAC(page))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
