import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import { UserDataContext } from './contexts/UserDataContext'
import CalculateOptions from './containers/CalculateOptions/CalculateOptions'
import SmartCalc from './containers/SmartCalcPage/SmartCalc'
import ManualCalc from './containers/ManualCalcPage/ManualCalc'

const App = () => {

  const [userData, setUserData] = useState({});
  //TODO remove the inputpage and inputForm.jsx 

  return (
    <div className="content-padding">
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/calculate-options" element={<CalculateOptions />} />
        <Route path="/smart-calculate" element={<SmartCalc />} />
        <Route path="/manual-calculate" element={<ManualCalc />} />
      </Routes>
      </UserDataContext.Provider>
      </div>
  );
};

  export default App;
