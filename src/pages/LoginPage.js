import Login from "../components/login/Login";
import Navigation from "../components/global/Navigation";

export default function LoginPage() {
  return (
    <>
      <Navigation active={"/prijava"} /> 
      <Login />;
    </>
  );
}
