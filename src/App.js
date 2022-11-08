
import Login from "./components/Login/main.login";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home/main.home";
import ErrorNotFound from "./components/Error/main.error";
import Dashboard from "./components/Dashboard/main.dashboard";
import Register from "./components/Register/main.register";
import Edit from "./components/Profile/main.profile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home title="Absensi Apps" />}></Route>
          <Route path="/login" element={<Login title="Login Page" desc="Mini Absensi Apps" />}></Route>
          <Route path="/register" element={<Register title="Registrasi Page" desc="Mini Absensi Apps" />}></Route>
          <Route path="/dashboard" element={<Dashboard title="Dashboard"/>}></Route>
          <Route path="/profile" element={<Edit title="Update Profile"/>}></Route>
          <Route path="*" element={<ErrorNotFound></ErrorNotFound>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
