import Account from './components/Account/Account';
import logo from './logo.png';
import './App.css';
import Header from './components/Header/Header';
import Transaction from './components/Transaction/Transaction';

function App() {
  return (
    <div className="App">
      <Header/>
      <Account/>
      <section className='transactions'>
        <Transaction cost={10} tag={"shop"}/>
        <Transaction cost={5} tag={"bus"}/>
      </section>
    </div>
  );
}

export default App;
