import './App.css';
import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Main from './components/Main/MainContainer';
import Profile from './components/Profile/Profile';
import Tag from './components/Tag';
import NotFound from './components/NotFound';
import AddContainer from './components/AddTransaction/AddConteiner';
import { connect } from 'react-redux';
import { getCardsThunk, AuthThunk, setNextCardAC, setPreviousCardAC, SignUp } from './redux/account';
import { setCurrentPageAC } from './redux/transactions';
import Login from './components/Login';
import SignIn from './components/SignIn';



function App({setCards,isAuth,Auth, card, account, setNextCard, setPervCard, SignUp}) {
  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/'
                  element={<Main/>}/>
          <Route path='/profile' element={
            
            <Profile
              isAuth={isAuth}
              setUser={Auth}
              account={account}
              card={card}
              setCards={setCards}
              setNextCard={setNextCard}
              setPervCard={setPervCard}
            /> 
          }/>
          <Route path='/settings/*' element={<Settings/>}/>
          <Route path='/sign-up' element={<SignIn onSubmit={(item) => console.log(item)}/>}/>
          <Route path='/add' element={<AddContainer isAuth={isAuth}/>}/>
          <Route path='/login' element={<Login SetUser={Auth} login={account.login}/>}/>
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
    isAuth: state.account.isAuth,
    card: state.account.cards[state.account.selectCard],
    account: state.account,
    pageSize: state.transactions.pageSize,
    totalTransCount: state.transactions.totalTransCount,
    curentPage: state.transactions.curentPage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SignUp: FormData => dispatch(SignUp(FormData)),
    Auth: FormData => dispatch(AuthThunk(FormData)),
    setCards: () => dispatch(getCardsThunk()),
    setPervCard: () => dispatch(setPreviousCardAC()),
    setNextCard: () => dispatch(setNextCardAC()),
    setCurrentPage: page => dispatch(setCurrentPageAC(page)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
