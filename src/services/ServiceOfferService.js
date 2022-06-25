import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";

export const ServiceOfferService = {
  findAllPlayroomsOffersByBookingDetails,
  isValidDataForAdd,
  addServiceOffer,
  getAdditionalServiceOffers,
  getOfferById
};

async function findAllPlayroomsOffersByBookingDetails(
  city,
  numberOfKids,
  numberOfAdults,
  date,
  startTime,
  endTime
) {
  return await BookingKidsPartiesClient.get("serviceOffers/bookingDetails", {
    params: {
      city: city,
      numberOfKids: numberOfKids,
      numberOfAdults: numberOfAdults,
      date: date,
      startTime: startTime,
      endTime: endTime,
    },
  });
}

async function getOfferById(offerId){
  return await BookingKidsPartiesClient.get("serviceOffers/" + offerId);
}

async function getAdditionalServiceOffers(dataForRequest, additionalServiceOfferType) {
  return await BookingKidsPartiesClient.get(
    "serviceOffers/type/" + additionalServiceOfferType,
    {
      params: {
        city: dataForRequest.city,
        date: dataForRequest.date,
        startTime: dataForRequest.startTime,
        endTime: dataForRequest.endTime,
        numberOfKids: dataForRequest.numberOfKids,
        numberOfAdults: dataForRequest.numberOfAdults,
        playroomOfferId: dataForRequest.playroomOfferId
      },
    }
  );
}

async function addServiceOffer(newServiceOffer) {
  return await BookingKidsPartiesClient.post("serviceOffers", newServiceOffer);
}

function isValidDataForAdd(newServiceOffer) {
  return (
    newServiceOffer.name !== "" &&
    newServiceOffer.startDate !== "" &&
    newServiceOffer.endDate !== "" &&
    !isNaN(newServiceOffer.maxNumberOfKids) &&
    newServiceOffer.maxNumberOfKids !== "" &&
    !isNaN(newServiceOffer.maxNumberOfAdults) &&
    newServiceOffer.maxNumberOfAdults !== "" &&
    ((!isNaN(newServiceOffer.pricePerKid) &&
      !isNaN(newServiceOffer.pricePerAdult) &&
      newServiceOffer.pricePerKid !== "" &&
      newServiceOffer.pricePerAdult !== "") ||
      (!isNaN(newServiceOffer.pricePerHour) &&
        newServiceOffer.pricePerHour !== ""))
  );
}
