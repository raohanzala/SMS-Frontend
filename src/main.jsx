window.global = window;

import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
