import './App.css'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './containers/Welcome/Welcome'
import Home from './containers/Home/Home'
import { UserDataContext } from './contexts/UserDataContext'
import CalculateOptions from './containers/CalculateOptions/CalculateOptions'
import SmartCalc from './containers/SmartCalcPage/SmartCalc'
import ManualCalc from './containers/ManualCalcPage/ManualCalc'

const App = () => {

  const [userData, setUserData] = useState({});
  const location = useLocation(); // get the location to conditionally render header


  return (
    <div className="content-padding">
    <UserDataContext.Provider value={{ userData, setUserData }}>
    {location.pathname !== '/' && <Header />} {/* render Header only if not on the Welcome page */}
        <Routes>
          
        <Route exact path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />

        <Route path="/calculate-options" element={<CalculateOptions />} />
        <Route path="/smart-calculate" element={<SmartCalc />} />
        <Route path="/manual-calculate" element={<ManualCalc />} />
      </Routes>
      </UserDataContext.Provider>
      </div>
  );
};

  export default App;
