import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import MyTrip from "./pages/MyTrip";
import Group from "./pages/groupPages/Group";
import Setting from "./pages/Setting";
import MakeTrip from "./pages/groupPages/MakeTrip";
import MakeGroup from "./pages/groupPages/MakeGroup";
import SignupUser from "./pages/SignupUser";
import Login from "./pages/Login";
import GroupTripList from "./pages/groupPages/GroupTripList";

function App() {
  //const user = useSelector(selectUser);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<MyTrip />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/maketrips" element={<MakeTrip />} />
            <Route path="/makegroups" element={<MakeGroup />} />
            <Route path="/signup" element={<SignupUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/grouptrip/:groupNum" element={<GroupTripList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
