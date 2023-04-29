import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
//import MyTrip from "./pages/userPages/MyTrip";
import Group from "./pages/groupPages/Group";
//import Setting from "./pages/userPages/Setting";
import MakeTrip from "./pages/groupPages/MakeTrip";
import MakeGroup from "./pages/groupPages/MakeGroup";
import SignupUser from "./pages/userPages/SignupUser";
import Login from "./pages/userPages/Login";
import GroupTripList from "./pages/groupPages/GroupTripList";
import GrouptripDetail from "./pages/groupPages/GrouptripDetail";
import UploadPhoto from "./pages/groupPages/UploadPhoto";
import PhotoDay from "./pages/groupPages/sorting/PhotoDay";
import PhotoUser from "./pages/groupPages/sorting/PhotoUser";
import AutoGPT from "./pages/groupPages/sorting/AutoGPT";
import InviteList from "./pages/userPages/InviteList";
import PhotoChar from "./pages/groupPages/sorting/PhotoChar";
import PhotoObej from "./pages/groupPages/sorting/PhotoObej";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import PhotoUserFolder from "./pages/groupPages/sorting/PhotoUserFolder";
import PhotoLarge from "./pages/groupPages/sorting/PhotoLarge";

function App() {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute authenticated={JWTtoken} component={<Group />} />
              }
            />
            {/* <Route
              path="/groups"
              element={
                <PrivateRoute authenticated={JWTtoken} component={<Group />} />
              }
            />
            <Route path="/settings" element={<Setting />} /> */}
            <Route
              path="/maketrips"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<MakeTrip />}
                />
              }
            />
            <Route
              path="/makegroups"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<MakeGroup />}
                />
              }
            />
            <Route path="/signup" element={<SignupUser />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/grouptrip/:groupNum"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<GroupTripList />}
                />
              }
            />
            <Route
              path="/grouptripdetail/:tripId"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<GrouptripDetail />}
                />
              }
            />
            <Route
              path="/upload"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<UploadPhoto />}
                />
              }
            />
            <Route
              path="/photo/day"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<PhotoDay />}
                />
              }
            />
            <Route
              path="/photo/auto/char"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<PhotoChar />}
                />
              }
            />
            <Route
              path="/photo/auto/obej"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<PhotoObej />}
                />
              }
            />
            <Route
              path="/photo/userfolder"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<PhotoUserFolder />}
                />
              }
            />
            <Route
              path="/photo/userfolder/:usertag"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<PhotoUser />}
                />
              }
            />
            <Route
              path="/photo/auto/gpt"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<AutoGPT />}
                />
              }
            />
            <Route
              path="/invite"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<InviteList />}
                />
              }
            />
            <Route
              path="/photo/large/:photoid"
              element={
                <PrivateRoute
                  authenticated={JWTtoken}
                  component={<PhotoLarge />}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
