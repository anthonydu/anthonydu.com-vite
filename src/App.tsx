import './App.scss';
import Main from './components/Main';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Main />
      <Footer />
      <Cursor />
    </div>
  );
}

export default App;
