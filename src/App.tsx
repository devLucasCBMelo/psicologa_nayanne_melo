// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ToSchedule from "./pages/ToSchedule/ToSchedule";

function App() {
  return (
    <Routes>
      <Route path="/psicologa_nayanne_melo" element={<Home />} />
      <Route
        path="/psicologa_nayanne_melo/agendamento"
        element={<ToSchedule />}
      />
    </Routes>
  );
}

export default App;
