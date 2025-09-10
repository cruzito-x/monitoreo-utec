import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Home from "./views/home/Home";
import "./App.css";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // Request notification permission
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("Permiso de notificaciones concedido");
            }
          });
        })
        .catch((error) => {
          console.error("Error registrando el Service Worker:", error);
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
