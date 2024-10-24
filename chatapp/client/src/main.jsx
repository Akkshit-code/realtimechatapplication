import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ReactDOM from "react-dom/client"
import { Toaster } from "sonner";
import { SocketProvider } from './context/SocketContext.jsx';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SocketProvider>
    <App />
    <Toaster closeButton /> 
  </SocketProvider>
  // </StrictMode>
);
