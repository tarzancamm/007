import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/profile/:id' element={<ProfileScreen/>} />
        <Route path='*' element={<HomeScreen/>} />
      </Routes>
    </div>
  );
}

export default App;
