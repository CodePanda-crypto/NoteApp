import './header.css';
import appLogo from '/images/cute-halloween-skeleton.png';
import { useTheme } from '../ThemeContext';
import ToggleSwitch from './ToggleSwitch';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="App-header">
      <nav className="navbar">
        <div className="logo-title-container">
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
        </div>
        <div className="toggle-theme-container">
          <ToggleSwitch isOn={theme === 'dark'} handleToggle={toggleTheme} />
        </div>
      </nav>
    </header>
  );
}
