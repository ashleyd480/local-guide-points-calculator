import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import InputPage from './containers/Input/InputPage'
import Home from './containers/Home/Home'
import { UserDataContext } from './contexts/UserDataContext'
import CalculatePage from './containers/Calculate/CalculatePage'

const App = () => {

  const [userData, setUserData] = useState({});

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/inputform" element={<InputPage />} /> */}
        <Route path="/calculatepage" element={<CalculatePage />} />
      </Routes>
    </UserDataContext.Provider>
  );
};

  export default App;
