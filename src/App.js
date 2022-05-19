import './App.css';
import Main from './components/Main';
import Register from './components/Register'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className='max-w-7xl mx-auto px-2'>
      <Navbar />
      <Routes>
        <Route path='/' element={<RequireAuth><Main /></RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
