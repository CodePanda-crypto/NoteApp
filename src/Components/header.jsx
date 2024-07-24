import './header.css';
import appLogo from '/images/cute-halloween-skeleton.png';

export default function Header() {
  return (
    <header className="App-header">
      <nav className="navbar">
        <div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={appLogo}
              className="App-logo react logo-spin"
              alt="React logo"
            />
          </a>
        </div>
        <div>
          <h1 className="App-title">Meme Generator</h1>
        </div>
      </nav>
    </header>
  );
}
