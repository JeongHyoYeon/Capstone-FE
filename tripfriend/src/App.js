import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MyTrip from './components/MyTrip';
import Group from './components/Group';
import Setting from './components/Setting';
import MakeTrip from './components/MakeTrip';
 
function App() {
  return (
    <><BrowserRouter>
    <Header/>
    <div className='App'>
      <Routes>
        <Route path ="/" element ={<MyTrip />}/>
        <Route path ="/groups" element ={<Group />}/>
        <Route path ="/settings" element ={<Setting />}/>
        <Route path ="/maketrips" element ={<MakeTrip />}/>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}
 
export default App;

