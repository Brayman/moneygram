import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyMenu from './components/Menu/Menu';
import Main from './components/Main/MainContainer';
import Profile from './components/Profile/Profile';
import Tag from './components/Tag';
import NotFound from './components/NotFound';
import AddContainer from './components/AddTransaction/AddConteiner';
import { connect } from 'react-redux';
import { CreateCard } from './redux/account';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Component } from 'react';
import CardCreateForm from './components/CardCreator/CardCreator';
import { accountThunks } from './redux/actions/account-actions';
import * as selectors from "./redux/selectors";
import TransComponent from './components/Transaction/TransComponent';
import Accounts from './components/Accounts/Accounts';
import More from './components/More/More';
import { Grid, GridColumn, Icon, Menu } from 'semantic-ui-react';

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
      app
    } = this.props
    return (
      <BrowserRouter>
        <Grid container >
          <Grid.Row stretched style={{height: '90vh'}}>
            <Grid.Column verticalAlign='middle'>
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
              <Route path='/more' element={<More isAuth={isAuth} />} />
              <Route
                path='/transactions/:cardid'
                element={<Main login={login} isAuth={isAuth} />}
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
              <Route path='/transaction/:id' element={<TransComponent />} />
              <Route path='/sign-in' element={<SignUp onSubmit={signUp} />} />
              <Route path='/add' element={<AddContainer isAuth={isAuth} />} />

              <Route
                path='/create-card'
                element={<CardCreateForm userid={account.id} CreateCard={addCard} />}
              />
              <Route path='/test' element={<div>
                <Tag tag='shop' />
              </div>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{height: '10vh'}}>
            <MyMenu/>
            
          </Grid.Row>

        </Grid>
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
    curentPage: selectors.curentPage(state)
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
