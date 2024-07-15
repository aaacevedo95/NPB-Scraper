import { ChangeEventHandler } from "react";

const DateInput = ({
  formattedDate,
  handleDateChange,
}: {
  formattedDate: string;
  handleDateChange: ChangeEventHandler<HTMLInputElement>;
}) => (
  <div style={{ padding: 20 }}>
    <input
      className="input has-background-dark is-primary"
      type="date"
      placeholder="Dark mode input"
      id="dateInput"
      value={formattedDate}
      onChange={handleDateChange}
    />
  </div>
);

export default DateInput;
