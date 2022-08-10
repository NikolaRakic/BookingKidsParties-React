import { useState, useEffect } from "react";
import ServiceOfferCard from "../serviceOfferCard/ServiceOfferCard";
import { ServiceOfferService } from "../../services/ServiceOfferService";
import moment from "moment";

export default function Ofers(props) {
  const [offersData, setOffers] = useState([]);
  const [durationOfHours, setDurationOfHours] = useState();
  const [sortType, setSortType] = useState("averageRating");
  const [sortMethod, setSortMethod] = useState("descending");
  const dataForReq = props.formData;

  useEffect(() => {
    findAllPlayroomsOffersByBookingDetails({ ...dataForReq });
    differenceBetweenTwoTimes(dataForReq.startTime, dataForReq.endTime);
  }, [dataForReq, sortType, sortMethod]);

  const differenceBetweenTwoTimes = (startTime, endTime) => {
    let hours = parseFloat(
      moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm"), "minutes") / 60
    );
    setDurationOfHours(hours);
  };

  const findAllPlayroomsOffersByBookingDetails = async ({
    city,
    numberOfKids,
    numberOfAdults,
    date,
    startTime,
    endTime,
  }) => {
    const offers =
      await ServiceOfferService.findAllPlayroomsOffersByBookingDetails(
        city,
        parseInt(numberOfKids),
        parseInt(numberOfAdults),
        date,
        startTime,
        endTime
      );
    sortArray(sortType, offers.data, sortMethod);
  };

  const sortArray = (type, offers, sortMethod) => {
    let sorted;
    if (sortMethod === "ascending")
      sorted = [...offers].sort((a, b) => a[type] - b[type]);
    else sorted = [...offers].sort((a, b) => b[type] - a[type]);
    setOffers(sorted);
  };

  return (
    <div>
      <div className="select-input-div">
        <p>Sortiraj po </p>
        <select
          className="select-input"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="averageRating">Oceni</option>
          <option value="pricePerHour">Ceni</option>
        </select>
        <select
          className="select-input"
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="descending">Opadajuće</option>
          <option value="ascending">Rastuće</option>
        </select>
      </div>
      <div className="card-div">
        {offersData.map((offer, index) => {
          return (
            <ServiceOfferCard
              visible={props.visible}
              durationOfHours={durationOfHours}
              numberOfKids={dataForReq.numberOfKids}
              numberOfAdults={dataForReq.numberOfAdults}
              key={index}
              offer={offer}
              localStorageNameItem={"playroomOfferId"}
              nextUrl={"/dodatna-usluga/catering"}
              showButton={true}
            />
          );
        })}
      </div>
    </div>
  );
}
