import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import CheckVoucher from "./views/check-voucher/CheckVoucher";
import Home from "./views/home/Home";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registrado:", registration);

          // Solicita permiso de notificaciones
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("🔔 Permiso de notificaciones concedido");
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
        <Route path="/check-voucher" element={<CheckVoucher />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
