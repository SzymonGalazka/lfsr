import './App.css';
import Main from './Components/Main';

function App() {
  return (
    <div className='App'>
      <Main />
      <footer className='App-footer'>
        <span>Szymon Galazka 2020</span>
        <a
          className='App-link'
          href='https://github.com/SzymonGalazka/lfsr'
          target='_blank'
          rel='noopener noreferrer'
        >
          Repository link
        </a>
      </footer>
    </div>
  );
}

export default App;
