import React from "react";
import Navigation from "../components/nav/Navigation";
import Home from "../components/home/Home"

export default function HomePage(){

    return(
        <>
            <Navigation active={"/pocetna"}/>
            <Home/>
        </>
    )
}

