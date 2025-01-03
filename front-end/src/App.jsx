// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginAndSignUp/Login';
import Home from './components/Home/Home';
import Clubs from './components/Clubs/Clubs';
import Profile from './components/AdminZone/Clubs/Profile/Profile';
import Docs from './components/AdminZone/Clubs/docs/Docs';
import Posts from './components/AdminZone/Clubs/post/Posts';
import { PrivateRouteClubs, PrivateRouteAdmin } from './hooks/PrivateRoute';
import LoginAdmin from './components/AdminZone/Admin/login/LoginAdmin';
import DashboardAdmin from './components/AdminZone/Admin/DashBoard/DashboardAdmin';
import ClubDocuments from './components/AdminZone/Admin/ClubDocuments/ClubDocuments';
import UserList from './components/AdminZone/Admin/DashBoard/UserList';
import Settings from './components/AdminZone/Admin/DashBoard/Settings';
import NotFound from './components/404/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        
        <Route path="/Login" element={<Login />} />
        <Route path="/Clubs/*" element={<Clubs />} />
        <Route path="/Home" element={<PrivateRouteClubs> <Home /></PrivateRouteClubs>} />
        <Route path="/ClubProfile" element={<PrivateRouteClubs> <Clubs /></PrivateRouteClubs>} />
        <Route path="/ClubsAdministration" element={<PrivateRouteClubs> <Profile /></PrivateRouteClubs>} />
        <Route path="/Docs" element={<PrivateRouteClubs> <Docs /></PrivateRouteClubs>} />
        <Route path="/Post" element={<PrivateRouteClubs> <Posts /></PrivateRouteClubs>} />

        <Route path="/*" element={<NotFound/>} />
        {/* admin routes LAMMSKISETSFXISETDE$FLOPPEDBYMTC=HADI_CHOUAIEB_DEVELOPER  */}

        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/DashboardAdmin" element={<PrivateRouteAdmin> <DashboardAdmin /> </PrivateRouteAdmin>} />
        <Route path="/ClubDocuments" element={<PrivateRouteAdmin>  <ClubDocuments /> </PrivateRouteAdmin>} />
        <Route path="/ClubDocuments/Users" element={<PrivateRouteAdmin>  <UserList /> </PrivateRouteAdmin>} />
        <Route path="/ClubDocuments/Settings" element={<PrivateRouteAdmin>  <Settings /> </PrivateRouteAdmin>} />



      </Routes>
    </Router>
  );
}

export default App;
