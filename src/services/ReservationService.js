import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";

export const ReservationService = {
    createReservation
}

async function createReservation(newReservation) {
    return await BookingKidsPartiesClient.post("reservations", newReservation);
  }