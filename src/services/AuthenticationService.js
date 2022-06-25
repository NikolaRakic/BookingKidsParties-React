
import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";
import { TokenService } from "./TokenService";

export const AuthenticationService = {
  login,
  logout,
  getRole,
  getUsername,
  getUserId
};

async function login(userCredentials) {
    const response = await BookingKidsPartiesClient.post(
      "/auth/login",
      userCredentials
    );
    const decoded_token = TokenService.decodeToken(response.data.accessToken);

    if (decoded_token) {
        TokenService.setToken(response.data.accessToken);
        window.location.assign("/");
    } else {
      console.error("Invalid token");
    }
}

function logout() {
  TokenService.removeToken();
  window.location.assign("/");
}

function getRole() {
  const token = TokenService.getToken();
  const decoded_token = token ? TokenService.decodeToken(token) : null;
  if (decoded_token) {
    return decoded_token.roles;
  } else {
    return null;
  }
}

function getUsername(){
  const token = TokenService.getToken();
  const decoded_token = token ? TokenService.decodeToken(token) : null;
  if (decoded_token) {
    return decoded_token.sub;
  } else {
    return null;
  }
}

function getUserId(){
  const token = TokenService.getToken();
  const decoded_token = token ? TokenService.decodeToken(token) : null;
  if (decoded_token) {
    return decoded_token.userId;
  } else {
    return null;
  }
}
