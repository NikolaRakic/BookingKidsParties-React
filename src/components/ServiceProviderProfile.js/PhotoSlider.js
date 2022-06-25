import { Carousel } from "react-bootstrap";

export default function PhotoSlider(props) {
  let propsPhotos = props.photos;
  let srcPhotos = [];

  if (propsPhotos.length > 0) {
    for (let i = 0; i < propsPhotos?.length; i++) {
      srcPhotos.push(`data:image;base64,${propsPhotos[i].data}`);
    }
  } else {
    srcPhotos.push(require("../../assets/photos/no_image.jpg"));
  }
  
 
  return (
    <div className="photos-slider">
      <Carousel className="slider">
        {srcPhotos?.map((photo, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={photo}
                  alt="First slide"
                />
              </Carousel.Item>
            );
        })}
      </Carousel>
    </div>
  );
}
