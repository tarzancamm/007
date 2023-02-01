import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const isAuth = useSelector((state) => state.auth.token)

  return (
    <div>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/profile/:id' /> : <HomeScreen />} />
        <Route path="/profile/:id" element={isAuth ? <ProfileScreen /> : <Navigate to='/' />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
