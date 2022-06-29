import { useState, useEffect } from "react";
import ServiceOfferCard from "../serviceOfferCard/ServiceOfferCard";
import {ServiceOfferService} from "../../services/ServiceOfferService"
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function Ofers(props) {
  const [offersData, setOffers] = useState([]);
  const [durationOfHours, setDurationOfHours] = useState();
  const dataForReq = props.formData;

  useEffect(() => {
    findAllPlayroomsOffersByBookingDetails({...dataForReq });
    differenceBetweenTwoTimes(dataForReq.startTime, dataForReq.endTime);
  }, [dataForReq]);

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
    const offers = await ServiceOfferService.findAllPlayroomsOffersByBookingDetails(
      city,
      parseInt(numberOfKids),
      parseInt(numberOfAdults),
      date,
      startTime,
      endTime
    );
    setOffers(offers.data);
  };

  return (
    <div>
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
              nextUrl={"/dodatna-usluga/ketering"}
              showButton={true}
            />
          );
        })}
      </div>
    </div>
  );
}
