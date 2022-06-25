import axios from "axios";
import { TokenService } from "../TokenService";
import { AuthenticationService } from "../AuthenticationService";

const BookingKidsPartiesClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/KidsParty/"
}); 
// Dodaj token na svaki zahtev ka backendu, ako je korisnik ulogovan
BookingKidsPartiesClient.interceptors.request.use(function success(config) {
  const token = TokenService.getToken();

  if (token) {
    if (TokenService.didTokenExpire()) {
      alert("Token je istekao. Ulogujte se ponovo.");
      AuthenticationService.logout();
      return false;
    }
    config.headers["Authorization"] = token;
  }

  return config;
}); 

// U slučaju da se sa backenda vrati forbidden, token je istekao te izloguj korisnika
BookingKidsPartiesClient.interceptors.response.use(function success(response) {
  return response;
}, function failure(error) {
  const token = TokenService.getToken();

  if (token) {
    if (error.response && error.response.status === 401) {
      AuthenticationService.logout();
    }
  }

  throw error;
});
export default BookingKidsPartiesClient;