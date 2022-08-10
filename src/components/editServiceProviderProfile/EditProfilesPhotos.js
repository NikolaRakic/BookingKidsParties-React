import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { PhotoService } from "../../services/PhotoService";
import SuccessUploadPhotoAlert from "./SuccessUploadPhotoAlert";

export default function EditProfilesPhotos(props) {
  const [photos, setPhotos] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const serviceProviderId = props.serviceProviderId;
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    getPhotos(serviceProviderId);
  }, [showSuccessModal]);

  function getPhotos(id) {
    PhotoService.getPhotos(id)
      .then((res) => setPhotos(res.data))
      .catch((error) => {
        console.log(error);
      });
  }

  const onFileChangeHandler = (e) => {
    const formData = new FormData();
    const image = e.target.files[0];
    formData.append("image", image);
    PhotoService.uploadPhoto(formData, serviceProviderId)
      .then((res) => {
        setPhotos([...photos, res.data]);
        setModalMessage("Nova slika je uspešno sačuvana");
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const deletePhoto = (id) => () => {
    PhotoService.deletePhoto(id)
      .then(() => {
        setModalMessage("Slika je uspešno obrisana");
        setShowSuccessModal(true);
      })
      .catch((error) => {
        alert("Greska!");
        console.log(error);
      });
  };

  if (photos !== []) {
    return (
      <>
        {photos.map((photo, index) => {
          return (
            <div className="center" key={index}>
              <img
                alt="profile photo"
                className="edit-photos"
                src={`data:image;base64,${photo.data}`}
              />
              <Button
                variant="danger"
                onClick={deletePhoto(photo.id)}
                className="delete-photo-btn"
              >
                X
              </Button>
            </div>
          );
        })}
        {photos.length < 6 ? (
          <div className="form-group files color upload-form">
            <input
              type="file"
              className="form-control"
              name="file"
              multiple
              onChange={onFileChangeHandler}
            />
          </div>
        ) : (
          <Alert variant="info">Imate maksimalan broj slika</Alert>
        )}
        <SuccessUploadPhotoAlert
          setShowSuccessModal={setShowSuccessModal}
          modalMessage={modalMessage}
          showSuccessModal={showSuccessModal}
        />
      </>
    );
  } else {
    return <></>;
  }
}
