import Settings from './components/Profile/SettingsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyMenu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './components/Sign/SignIn';
import SignUp from './components/Sign/SignUp';
import * as selectors from "./redux/selectors";
import TransComponent from './components/Transaction/TransComponent';
import Accounts from './components/Accounts/Accounts';
import "./App.css";
import Statistic from './containers/Statistic';
import Transactions from './containers/Transactions';
import HomePage from './containers/HomePage';
import WalletDetail from './containers/WalletDetail';
import WalletEditor from './containers/WalletEditor';
import WalletCreate from './containers/WalletCreate';
import { useEffect } from 'react';
import { checkAuth } from './redux/app';
import { accountThunks } from './redux/account'
import Loader from './components/common/Loader/Loader';
import AddTransaction from './containers/AddTransaction';
import EditTransaction from './containers/EditTransaction';


const App = () => {
  const dispatch = useDispatch();
  const login = useSelector(selectors.login)
  const initialized = useSelector(selectors.initialized)
  const isAuth = useSelector(selectors.isAuth)
  const app = useSelector(selectors.app)
  const account = useSelector(selectors.account)
  const modal = useSelector(selectors.modal)
  const transactions = useSelector(selectors.transactions)
  const signUp = FormData => dispatch(accountThunks.SignUp(FormData))
  const Auth = FormData => dispatch(accountThunks.AuthThunk(FormData))



  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  if (!initialized && isAuth) {
    return <Loader/>
  }
  
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
        <Route path='/analytics' element={<Statistic {...{ isAuth, transactions }} />} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='/transaction/:id' element={<TransComponent {...{ modal, isAuth }} />} />
        <Route path='/transaction/edit/:id' element={<EditTransaction isAuth={isAuth} />} />
        <Route path='/sign-up' element={<SignUp onSubmit={signUp} />} />
        <Route path='/add' element={<AddTransaction isAuth={isAuth} />} />
        <Route path='/edit' element={<EditTransaction isAuth={isAuth} />} />
        <Route path='/profile' element={<Profile isAuth={isAuth} />} />
        <Route path='/wallet/edit/:walletid' element={<WalletEditor />} />
        <Route path='/wallet/create' element={<WalletCreate />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <MyMenu />
    </BrowserRouter>
  );
}

export default App;
