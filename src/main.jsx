import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "./components/ui/provider"
import { DarkModeProvider } from "./contexts/DarkModeContext"
import { SoundProvider } from './contexts/SoundContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider>
        <SoundProvider>
          <DarkModeProvider>
            <App/>
          </DarkModeProvider>
        </SoundProvider>
      </Provider>
);
