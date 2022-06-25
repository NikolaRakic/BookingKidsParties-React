import { ServiceProviderService } from "../services/ServiceProviderService";
import ratingService from "../services/RatingService";
import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../components/nav/Navigation";
import ServiceProviderProfile from "../components/ServiceProviderProfile.js/ServiceProviderProfile";
import { useParams } from "react-router-dom";
import { PhotoService } from "../services/PhotoService";

export default function ServiceProviderProfilePage() {
  const serviceProviderId = useParams().id;
  const [serviceProvider, setServiceProvider] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [countOfRate, setCountOfRate] = useState(0);
  const [comments, setComments] = useState();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getOneById(serviceProviderId);
    getAvgRatingValueByServiceProviderId(serviceProviderId);
    getAllCommentsByServiceProviderId(serviceProviderId);
    getAllPhotosByServiceProviderId(serviceProviderId)
  }, [serviceProviderId]);

  const getOneById = async (serviceProviderId) => {
    try {
      const service = await ServiceProviderService.getOneById(
        serviceProviderId
      );
      setServiceProvider(service.data);
    } catch (error) {
      alert("Greska! " + error);
    }
  };

  const getAllCommentsByServiceProviderId = async (serviceProviderId) => {
    try {
      const allComments = await ratingService.getAllRatingByServiceProviderId(
        serviceProviderId
      );
      setComments(allComments.data);
    } catch (error) {
      alert("Greska! " + error);
    }
  };

  const getAvgRatingValueByServiceProviderId = async (serviceProviderId) => {
    try {
      const ratingDTO =
        await ratingService.getAverageRatingValueByServiceProviderId(
          serviceProviderId
        );
      console.log(ratingDTO);
      setRatingValue(ratingDTO.data.averageRating);
      setCountOfRate(ratingDTO.data.countOfRate);
    } catch (error) {
      alert("Greska! " + error);
    }
  };

  const getAllPhotosByServiceProviderId = async (serviceProviderId) => {
    try{
      const response = await PhotoService.getPhotos(serviceProviderId);
      setPhotos(response.data)
    } catch (error){
      alert("Greska! " + error);
    }
  }

  return (
    <div>
      <Navigation />
      <ServiceProviderProfile
        photos={photos}
        comments={comments}
        serviceProvider={serviceProvider}
        ratingValue={ratingValue}
        countOfRate={countOfRate}
      />
    </div>
  );
}
