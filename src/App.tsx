// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ToSchedule from './pages/ToSchedule/ToSchedule';
import { Payment } from './pages/Payment/Payment';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/agendamento' element={<ToSchedule />} />
      <Route path='/pagamento' element={<Payment />} />
    </Routes>
  );
}

export default App;
