import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyMenu from './components/Menu/Menu';
import Main from './components/Main/MainContainer';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound';
import { Add, Edit } from './components/AddTransaction/AddConteiner';
import { connect } from 'react-redux';
import { CreateCard } from './redux/account';
import SignIn from './components/Sign/SignIn';
import SignUp from './components/Sign/SignUp';
import { Component } from 'react';
import CardCreateForm from './components/CardCreator/CardCreator';
import { accountThunks } from './redux/actions/account-actions';
import * as selectors from "./redux/selectors";
import TransComponent from './components/Transaction/TransComponent';
import Accounts from './components/Accounts/Accounts';
import "./App.css";

class App extends Component {
  render() {
    const {
      setCards,
      isAuth,
      Auth,
      card,
      cards,
      account,
      setNextCard,
      setPervCard,
      signUp,
      addCard,
      initialized,
      login,
      app,
      modal
    } = this.props
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={<SignIn
              Login={Auth}
              state={app.login}
              init={initialized}
            />}
          />
          <Route path='/accounts' element={<Accounts isAuth={isAuth} />} />
          <Route
            path='/transactions/:cardid'
            element={<Main login={login} isAuth={isAuth} modal={modal}/>}
          />
          <Route path='/profile' element={
            <Profile
              account={account}
              isAuth={isAuth}
              setUser={Auth}
              card={card}
              cards={cards}
              setCards={setCards}
              setNextCard={setNextCard}
              setPervCard={setPervCard}
            />
          } />

          <Route path='/settings/*' element={<Settings />} />
          <Route path='/transaction/:id' element={<TransComponent isAuth={isAuth} modal={modal}/>} />
          <Route path='/transaction/edit/:id' element={<Edit isAuth={isAuth} />} />
          <Route path='/sign-up' element={<SignUp onSubmit={signUp} />} />
          <Route path='/add' element={<Add isAuth={isAuth} />} />
          <Route path='/profile' element={<Profile isAuth={isAuth} />} />
          <Route
            path='/create-card'
            element={<CardCreateForm userid={account.id} CreateCard={addCard} />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <MyMenu />
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    login: selectors.login(state),
    transaction: selectors.transactions(state),
    initialized: selectors.initialized(state),
    isAuth: selectors.isAuth(state),
    card: selectors.card(state),
    cards: selectors.cards(state),
    app: selectors.app(state),
    account: selectors.account(state),
    pageSize: selectors.pageSize(state),
    totalTransCount: selectors.totalTransCount(state),
    curentPage: selectors.curentPage(state),
    modal: selectors.modal(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signUp: FormData => dispatch(accountThunks.SignUp(FormData)),
    Auth: FormData => dispatch(accountThunks.AuthThunk(FormData)),
    addCard: card => dispatch(CreateCard(card))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
