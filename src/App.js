import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Register from './components/Register'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='max-w-7xl mx-auto px-2'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
