window.global = window;

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';
// import 'react-datetime-picker/dist/DateTimePicker.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
