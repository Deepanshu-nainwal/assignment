import React from "react";
import { useState } from "react";
import "./Modal.css";
import axios from "axios";
function AppoinmentModal(props) {
  const [lawyerData, setLawyerData] = useState(props.lawyersInfo);
  // console.log("---------", lawyerData);
  const bookingTime = [
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "01:00PM",
    "02:00PM",
    "03:00PM",
    "04:00PM",
    "05:00PM",
    "06:00PM",
    "07:00PM",
  ];
  const bookingSlot = async function (time, id) {
    if (lawyerData.bookings && lawyerData.bookings.includes(time)) {
      return;
    }

    const Bookings = { bookings: [...lawyerData?.bookings, time] };

    const response = await axios.patch(
      `http://localhost:3000/lawyers/${id}`,
      Bookings
    );
    if (response.status === 200) {
      setLawyerData(response.data);
    }
  };

  return (
    <div className="modal_div inable">
      <h2 className="book_Appointment">Book Your Appointment with {}</h2>
      <div className="modal_time ">
        {bookingTime.length > 0 &&
          bookingTime.map((val, i) => {
            return (
              <span
                className={
                  lawyerData.bookings.includes(val) ? "active" : "time"
                }
                onClick={bookingSlot.bind(null, val, lawyerData?.id)}
                key={i}
              >
                {val}
              </span>
            );
          })}
      </div>
      <button className="modal_close_btn " onClick={props?.closeModal}>
        Close
      </button>
    </div>
  );
}
export default AppoinmentModal;
