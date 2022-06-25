import { TimePicker } from "react-rainbow-components";
import moment from "moment";

export default function Timepicker(props) {

  const onChangeTime = (value, time) => {
    let hours = moment(value, "HH:mm").format("HH");
    let minutes = moment(value, "HH:mm").format("mm");
    let diff = minutes % 30;
    if (diff !== 0) {
      value =
        String(hours) + ":" + String(moment(minutes - diff, "m").format("mm"));
    }
    props.handleDateOrTimeInputChange(time, value);
  };

  return (
    <div className="timepickers">
      <TimePicker
        hour24={true}
        value={props.startTime}
        placeholder="Početak proslave..."
        onChange={(value) => onChangeTime(value, "startTime")}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto input-timepicker"
      />
      <TimePicker
        value={props.endTime}
        hour24={true}
        // error
        placeholder="Kraj proslave..."
        onChange={(value) => onChangeTime(value, "endTime")}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto input-timepicker"
      />
    </div>
  );
}
