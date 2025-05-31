import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import CheckVoucher from "./views/check-voucher/CheckVoucher";
import Home from "./views/home/Home";
import "./App.css";

function App() {
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
