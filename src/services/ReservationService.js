import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";

export const ReservationService = {
    createReservation,
    getAllReservationsByUser,
    getAllReservationsByServiceProvider,
    getAllReservations
}

async function createReservation(newReservation) {
    return await BookingKidsPartiesClient.post("reservations", newReservation);
  }

  async function getAllReservationsByUser(userId) {
    return await BookingKidsPartiesClient.get("reservations/user/" + userId);
  }

  async function getAllReservationsByServiceProvider(serviceProviderId) {
    return await BookingKidsPartiesClient.get("reservations/serviceProvider/" + serviceProviderId);
  }

  async function getAllReservations() {
    return await BookingKidsPartiesClient.get("reservations");
  }