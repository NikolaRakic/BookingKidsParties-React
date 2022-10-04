import React from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationService } from "../../services/AuthenticationService";

export default function PrivateRoute({ children, role }) {
    const loggedUserRole = AuthenticationService.getRole();
    if(loggedUserRole === null){
        return <Navigate to="/prijava" />
    }
    else if(loggedUserRole === role){
       return children;
    }
    else{
        return <Navigate to="/" />
    }
  }
