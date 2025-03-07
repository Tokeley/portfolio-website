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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
