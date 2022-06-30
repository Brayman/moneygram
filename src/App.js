import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MyMenu from './components/Menu/Menu';
import Main from './components/Main/MainContainer';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound';
import { Add, Edit } from './components/AddTransaction/AddConteiner';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCard } from './redux/account';
import SignIn from './components/Sign/SignIn';
import SignUp from './components/Sign/SignUp';
import { useEffect } from 'react';
import CardCreateForm from './components/CardCreator/CardCreator';
import { accountThunks } from './redux/actions/account-actions';
import * as selectors from "./redux/selectors";
import TransComponent from './components/Transaction/TransComponent';
import Accounts from './components/Accounts/Accounts';
import "./App.css";
import { actions, cardThunks } from './redux/card';
import ChartPage from './components/Chart/Chart';

const App = () => {
  const dispatch = useDispatch();

  const login = useSelector(selectors.login)
  const initialized = useSelector(selectors.initialized)
  const isAuth = useSelector(selectors.isAuth)
  const cardidForSave = useSelector(selectors.cardidForSave)
  const cardForSave = useSelector(selectors.cardForSave)
  const cards = useSelector(selectors.cards)
  const app = useSelector(selectors.app)
  const account = useSelector(selectors.account)
  const modal = useSelector(selectors.modal)
  const transactions = useSelector(selectors.transactions)
  const signUp = FormData => dispatch(accountThunks.SignUp(FormData))
  const Auth = FormData => dispatch(accountThunks.AuthThunk(FormData))
  const addCard = card => dispatch(CreateCard(card))
  const card = useSelector(selectors.card)
  useEffect(() => {
    if (cardidForSave) {
      dispatch(actions.getCardForSave(cardidForSave))
    }
  }, [cardidForSave, dispatch])
  useEffect(() => {
    if (cardForSave) {
      dispatch(cardThunks.saveCard(cardForSave))
    }
  }, [cardForSave, dispatch])
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
        <Route path='/' element={<Navigate to='/accounts' />} />
        <Route path='/accounts' element={<Accounts isAuth={isAuth} />} />
        <Route
          path='/transactions/:cardid'
          element={<Main login={login} isAuth={isAuth} modal={modal} />}
        />
        <Route path='/profile' element={
          <Profile
            account={account}
            isAuth={isAuth}
            setUser={Auth}
            card={card}
            cards={cards}
          />
        } />
        <Route path='/analytics' element={<ChartPage isAuth={isAuth} data={transactions}/>} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='/transaction/:id' element={<TransComponent isAuth={isAuth} />} />
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

export default App;
