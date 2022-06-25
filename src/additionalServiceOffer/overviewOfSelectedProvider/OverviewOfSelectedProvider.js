import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ServiceOfferCard from "../../../serviceOfferCard/ServiceOfferCard";
import { ServiceOfferService } from "../../../services/ServiceOfferService";
import {AuthenticationService} from "../../../services/AuthenticationService";
import AdditionalInformationsForm from "./AdditionalInformationsForm";
import PayloadModal from "./PayloadModal";

export default function OverviewOfSelectedProvider() {
  const playroomOfferId = localStorage.getItem("playroomOfferId");
  const cateringOfferId = localStorage.getItem("cateringOfferId");
  const animatorOfferId = localStorage.getItem("animatorOfferId");
  const startTime = localStorage.getItem("startTime");
  const endTime = localStorage.getItem("endTime");
  const numberOfKids = localStorage.getItem("numberOfKids");
  const numberOfAdults = localStorage.getItem("numberOfAdults");

  const [additionalInformations, setAdditionalInformations] = useState({
    ageOfKids: 0,
    additionalRequest: "",
    name: "",
    email: "",
  });
  const userId = AuthenticationService.getUserId();
  const [playroomOffer, setPlayroomOffer] = useState();
  const [cateringOffer, setCateringOffer] = useState();
  const [animatorOffer, setAnimatorOffer] = useState();
  const [loaded, setLoaded] = useState(false);
  const [showPayloadModal, setShowPayloadModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const differenceBetweenTwoTimes = (startTime, endTime) => {
    let hours = parseFloat(
      moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm"), "minutes") / 60
    );
    return hours;
  };

  var totalPrice = 0;
  const duration = differenceBetweenTwoTimes(startTime, endTime);

  function payloadButtonHandler() {
    if ((additionalInformations.email !== "" && additionalInformations.name !== "") || userId) {
      setShowPayloadModal(true);
    } else {
      alert("Popunite obavezna polja!");
    }
  }

  useEffect(() => {
    getChosenOffer();
  }, []);

  async function getChosenOffer() {
    try {
      if (playroomOfferId) {
        const response = await ServiceOfferService.getOfferById(
          playroomOfferId
        );
        const playroom = response.data;
        setPlayroomOffer(playroom);
        totalPrice += playroom.pricePerHour * duration;
        //setLoadedPlayroomOffer(true);
      }
      if (cateringOfferId) {
        const response = await ServiceOfferService.getOfferById(
          cateringOfferId
        );
        const catering = response.data;
        totalPrice +=
          catering.pricePerKid * numberOfKids +
          catering.pricePerAdult * numberOfAdults;
        setCateringOffer(catering);
        //setLoadedCataringOffer(true);
      }
      if (animatorOfferId) {
        const response = await ServiceOfferService.getOfferById(
          animatorOfferId
        );
        const animator = response.data;
        setAmount(amount + animator.pricePerHour * duration);
        setAnimatorOffer(animator);
        //setLoadedAnimatorOffer(true);
      }
      setAmount(totalPrice);
      setLoaded(true);
    } catch (error) {
      console.error(`Greška prilikom dobavljanja dodatnih usluga ${error}`);
    }
  }

  return (
    <div className="center">
      {loaded && (
        <>
          {playroomOfferId && (
            <ServiceOfferCard
              visible={false}
              durationOfHours={duration}
              numberOfKids={numberOfKids}
              numberOfAdults={numberOfAdults}
              offer={playroomOffer}
              nextUrl=""
              showButton={false}
              additionalServiceOfferType="IGRAONICA"
            />
          )}

          {cateringOfferId && (
            <ServiceOfferCard
              visible={false}
              durationOfHours={duration}
              numberOfKids={numberOfKids}
              numberOfAdults={numberOfAdults}
              offer={cateringOffer}
              nextUrl=""
              showButton={false}
              additionalServiceOfferType="KETERING"
            />
          )}

          {animatorOfferId && (
            <ServiceOfferCard
              visible={false}
              durationOfHours={duration}
              numberOfKids={numberOfKids}
              numberOfAdults={numberOfAdults}
              offer={animatorOffer}
              nextUrl=""
              showButton={false}
              additionalServiceOfferType="ANIMATOR"
            />
          )}

          <AdditionalInformationsForm
            setAdditionalInformations={setAdditionalInformations}
            additionalInformations={additionalInformations}
          />
          <Button className="primary" onClick={payloadButtonHandler}>
            Ukupno {amount}
          </Button>
          {showPayloadModal && (
            <PayloadModal
              setShowPayloadModal={setShowPayloadModal}
              additionalInformations={additionalInformations}
              amount={amount}
              userId={userId}
            />
          )}
        </>
      )}
    </div>
  );
}
