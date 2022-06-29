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

  async function getAllReservationsByUser(userId, page) {
    return await BookingKidsPartiesClient.get("reservations/user/" + userId + "?size=5&page=" + page);
  }

  async function getAllReservationsByServiceProvider(serviceProviderId, page) {
    return await BookingKidsPartiesClient.get("reservations/serviceProvider/" + serviceProviderId);
  }

  async function getAllReservations(page) {
    return await BookingKidsPartiesClient.get("reservations?size=5&page=" + page);
  }