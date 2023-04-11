import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import MyTrip from "./pages/userPages/MyTrip";
import Group from "./pages/groupPages/Group";
import Setting from "./pages/userPages/Setting";
import MakeTrip from "./pages/groupPages/MakeTrip";
import MakeGroup from "./pages/groupPages/MakeGroup";
import SignupUser from "./pages/userPages/SignupUser";
import Login from "./pages/userPages/Login";
import GroupTripList from "./pages/groupPages/GroupTripList";
import GrouptripDetail from "./pages/groupPages/GrouptripDetail";
import UploadPhoto from "./pages/groupPages/UploadPhoto";
import PhotoDay from "./pages/groupPages/sorting/PhotoDay";
import PhotoAuto from "./pages/groupPages/sorting/PhotoAuto";
import PhotoUser from "./pages/groupPages/sorting/PhotoUser";
import AutoGPT from "./pages/groupPages/sorting/AutoGPT";
import InviteList from "./pages/userPages/InviteList";

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
            <Route
              path="/grouptripdetail/:tripId"
              element={<GrouptripDetail />}
            />
            <Route path="/upload" element={<UploadPhoto />} />
            <Route path="/photo" element={<PhotoDay />} />
            <Route path="/photo/auto" element={<PhotoAuto />} />
            <Route path="/photo/user" element={<PhotoUser />} />
            <Route path="/photo/auto/gpt" element={<AutoGPT />} />
            <Route path="/invite" element={<InviteList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
