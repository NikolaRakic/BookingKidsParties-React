import { Button } from "react-bootstrap";
import Timepicker from "./TimePicker";
import Datepicker from "./DatePicker";
import Inputs from "./Inputs";

export default function Form(props) {

  let formData = props.formData;

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    props.setFormData({ ...formData, [name]: val });
  };

  const handleDateOrTimeInputChange = (name, time) => {
    props.setFormData({...formData, [name]:time})
  };

  return (
    <div className={props.visible ? "fadeIn" : "fadeOut"} style={!props.visible ? {pointerEvents: "none"} : {}}>
      <h2 className="title">Zakažite dečiju zabavu</h2>
      <Inputs handleFormInputChange={handleFormInputChange} formData={formData}/>
      <Datepicker handleDateOrTimeInputChange={handleDateOrTimeInputChange}  date={formData.date}/>
      <Timepicker handleDateOrTimeInputChange={handleDateOrTimeInputChange} startTime={formData.startTime} endTime={formData.endTime}/>
      <Button
        onClick={props.onSubmitHandler}
        id="form-submit"
        variant="outline-dark"
      >
        Pretraži ponude
      </Button>
    </div>
  );
}
