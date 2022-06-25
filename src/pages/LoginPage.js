import Login from "../components/login/Login";
import Navigation from "../components/nav/Navigation";

export default function LoginPage() {
  return (
    <>
      <Navigation active={"/prijava"} /> 
      <Login />;
    </>
  );
}
