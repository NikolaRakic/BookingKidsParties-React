import React from "react";
import Navigation from "../components/global/Navigation";
import UserRegistration from "../components/userRegistration/UserRegistration";

export default function UserRegistrationPage() {
  return (
    <>
      <Navigation active={"/registracija"} />
      <UserRegistration />
    </>
  );
}
