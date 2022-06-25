import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";

export const UserService = {
  registration,
  isValidDataForRegistration,
  getParentById
};

async function registration(newUser) {
  return await BookingKidsPartiesClient.post("/auth/parent/signup", newUser);
}

async function getParentById(userId){
  return await BookingKidsPartiesClient.get("/parents/"+userId)
}

function isValidDataForRegistration(newUser) {
  return (
    newUser.name.trim() !== "" &&
    newUser.surname.trim() !== "" &&
    newUser.username.trim() !== "" &&
    newUser.password.trim() !== "" &&
    newUser.email.trim() !== "" &&
    newUser.telephoneNumber.trim() !== ""
  );
}
