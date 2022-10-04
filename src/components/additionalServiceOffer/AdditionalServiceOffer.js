import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceOfferCard from "../serviceOfferCard/ServiceOfferCard";
import { ServiceOfferService } from "../../services/ServiceOfferService";

import ArrowAltCircle from "../global/ArrowAltCircle";
import { TYPE_OF_SERVICE_PROVIDER } from "../../const/const";

export default function AdditionalServiceOffer() {
  const [additionalServiceOffers, setAdditionalServiceOffers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const additionalServiceOfferType =
    useParams().additionalServiceOfferType.toUpperCase();
  let navigate = useNavigate();

  let nextUrl = "";
  let backUrl = "";

  let localStorageNameItem = "";

  if (additionalServiceOfferType === TYPE_OF_SERVICE_PROVIDER.CATERING) {
    nextUrl = "/dodatna-usluga/animator";
    backUrl = "/pocetna";
    localStorageNameItem = "cateringOfferId";
  } else if (additionalServiceOfferType === "ANIMATOR") {
    nextUrl = "/pregled-izabranih-usluga";
    backUrl = "/dodatna-usluga/catering";
    localStorageNameItem = "animatorOfferId";
  } else {
    navigate("/dodatna-usluga/catering");
  }
  let dataForRequest = {
    city: localStorage.getItem("city"),
    date: localStorage.getItem("date"),
    startTime: localStorage.getItem("startTime"),
    endTime: localStorage.getItem("endTime"),
    numberOfKids: localStorage.getItem("numberOfKids"),
    numberOfAdults: localStorage.getItem("numberOfAdults"),
    playroomOfferId: localStorage.getItem("playroomOfferId"),
  };

  useEffect(() => {
    async function getAdditionalOffers(
      dataForRequest,
      additionalServiceOfferType
    ) {
      try {
        const response = await ServiceOfferService.getAdditionalServiceOffers(
          dataForRequest,
          additionalServiceOfferType
        );
        setAdditionalServiceOffers(response.data);
        setLoaded(true);
      } catch (error) {
        console.error(`Greška prilikom dobavljanja dodatnih usluga ${error}`);
      }
    }
    getAdditionalOffers(dataForRequest, additionalServiceOfferType);
  }, [additionalServiceOfferType]);

  const differenceBetweenTwoTimes = (startTime, endTime) => {
    let hours = parseFloat(
      moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm"), "minutes") / 60
    );
    return hours;
  };

  return (
    <>
      <ArrowAltCircle nextUrl={nextUrl} backUrl={backUrl} />
      {loaded ? (
        <>
        <h3 className="center">Izbor {additionalServiceOfferType.toLowerCase()}a za vašu žurku</h3>
          {additionalServiceOffers.length !== 0 ? (
            <div className="card-div">
              {additionalServiceOffers.map((offer, index) => {
                return (
                  <ServiceOfferCard
                    visible={false}
                    durationOfHours={differenceBetweenTwoTimes(
                      dataForRequest.startTime,
                      dataForRequest.endTime
                    )}
                    numberOfKids={dataForRequest.numberOfKids}
                    numberOfAdults={dataForRequest.numberOfAdults}
                    key={index}
                    offer={offer}
                    nextUrl={nextUrl}
                    localStorageNameItem={localStorageNameItem}
                    additionalServiceOfferType = {additionalServiceOfferType}
                    showButton={true}
                  />
                );
              })}
            </div>
          ) : (
            <h1 className="center error">
              {`Za traženi termin nema dostupan ${additionalServiceOfferType.toLowerCase()}`}{" "}
            </h1>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
