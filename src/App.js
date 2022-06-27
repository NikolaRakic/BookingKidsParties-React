import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import "./App.css";

import ServicesProviderPage from "./pages/ServicesProviderPage";
import HomePage from './pages/HomePage';
import ServiceProviderProfilePage from './pages/ServiceProviderProfilePage';
import LoginPage from './pages/LoginPage';
import UserRegistrationPage from './pages/UserRegistrationPage';
import PrivateRoute from './PrivateRoute';
import ServiceProviderRegistracionPage from './pages/ServiceProviderRegistrationPage';
import AddServiceOfferPage from './pages/AddServiceOfferPage';
import EditServiceProviderProfilePage from './pages/EditServiceProviderProfilePage';
import AdditionalServiceOfferPage from './pages/AdditionalServiceOfferPage';
import OverviewOfSelectedProviderPage from './pages/OverviewOfSelectedProviderPage';
import SuccessPayloadPage from './pages/SuccessPayloadPage';
import NotFoundPage from './pages/NotFoundPage';
import ReservationsPage from './pages/ReservationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pruzaoci-usluga" element={<ServicesProviderPage />} />
        <Route path="/pocetna" element={<HomePage />} />
        <Route path="/dodatna-usluga/:additionalServiceOfferType" element={<AdditionalServiceOfferPage />} />
        <Route path="/" element={<Navigate to ="/pocetna" />}/>
        <Route path="/pruzaoci-usluga/:id" element={<ServiceProviderProfilePage/>} />
        <Route path="/prijava" element={<LoginPage />}/>
        <Route path="/registracija" element={<UserRegistrationPage />}/>
        <Route path="/pregled-izabranih-usluga" element={<OverviewOfSelectedProviderPage/>}/>
        <Route path="/uspesno-placanje" element={<SuccessPayloadPage/>}/>
        <Route path="/rezervacije" element={<ReservationsPage/>}/>
        <Route
          path="/pruzaoci-usluga/registracija"
          element={
            <PrivateRoute role="ROLE_ADMINISTRATOR">
              <ServiceProviderRegistracionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/pruzaoci-usluga/dodaj-ponudu"
          element={
            <PrivateRoute role="ROLE_SERVICE_PROVIDER">
              <AddServiceOfferPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/izmeni-profil/:id"
          element={
            <PrivateRoute role="ROLE_SERVICE_PROVIDER">
              <EditServiceProviderProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
