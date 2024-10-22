import './App.css';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='homeContent'>
        <Home />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
