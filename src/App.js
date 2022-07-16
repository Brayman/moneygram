import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyMenu from './components/Menu/Menu';
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
import { API } from './api/api';
import { Statistic } from './pages/Statistic';
import Transactions from './pages/Transactions';
import HomePage from './pages/HomePage';
import WalletDetail from './pages/WalletDetail';


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
  useEffect(() => {
    if (!!account.balance) {
      API.updateAccount({ id: account.id, balance: account.balance })
    }
  }, [account, dispatch])
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
        <Route path='/' element={<HomePage isAuth={isAuth} />} />
        <Route path='/accounts' element={<Accounts isAuth={isAuth} balance={account.balance} />} />
        <Route path='/wallet/:cardid' element={<WalletDetail isAuth={isAuth} />} />
        <Route
          path='/transactions'
          element={<Transactions login={login} isAuth={isAuth} modal={modal} />}
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
        <Route path='/analytics' element={<Statistic {...{ isAuth, transactions, balance: account.balance }} />} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='/transaction/:id' element={<TransComponent {...{ modal, isAuth }} />} />
        <Route path='/transaction/edit/:id' element={<Edit isAuth={isAuth} />} />
        <Route path='/sign-up' element={<SignUp onSubmit={signUp}/>} />
        <Route path='/add' element={<Add isAuth={isAuth} />} />
        <Route path='/profile' element={<Profile isAuth={isAuth} />} />
        <Route
          path='/create-card'
          element={<CardCreateForm userid={login} CreateCard={addCard} />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <MyMenu />
    </BrowserRouter>
  );
}

export default App;
