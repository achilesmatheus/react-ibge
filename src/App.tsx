import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/components/Routes/Login';
import Home from './components/Routes/Home';
import Location from './components/Routes/Location';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/location/:id" element={<Location />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
