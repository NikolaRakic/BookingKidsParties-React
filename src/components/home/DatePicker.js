import { DatePicker } from "react-rainbow-components";
import moment from "moment";

export default function Datepicker(props) {

  function onChange(date) {
    props.handleDateOrTimeInputChange("date", moment(date).format("YYYY-MM-DD"));
  }

  return (
    <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
      <DatePicker
        className="date-picker"
        placeholder="Izaberite datum..."
        id="datePicker-1"
        minDate={new Date()}
        value={props.date}
        onChange={(value) => onChange(value)}
        formatStyle="large"
      />
    </div>
  );
}
