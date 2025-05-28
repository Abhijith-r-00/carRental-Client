// VehicleBookings.js
import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { FaCar, FaGasPump } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import { MdAirlineSeatReclineExtra } from 'react-icons/md';
import { PayPalButtons } from '@paypal/react-paypal-js';
import './VehicleBookings.css';
import { addBooking } from '../services/allApi';

const VehicleBookings = ({ vehicle, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickupDate: '',
    returnDate: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (bookingDetails.pickupDate && bookingDetails.returnDate) {
      setStep(2);
    }
  };

  const getRentalDays = () => {
    const start = new Date(bookingDetails.pickupDate);
    const end = new Date(bookingDetails.returnDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  if (!vehicle) {
    return <div className="booking-modal"><p>No vehicle data.</p></div>;
  }

  const totalCost = vehicle.pricePerDay * getRentalDays();


const onbtnpay = async () => {
  const bookingData = {
    ...bookingDetails,
    ...vehicle,
  };
  console.log(bookingData)

  try {
    let requestHeader = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
    const apiResponse = await addBooking(bookingData,requestHeader);
    console.log("Booking successful", apiResponse);
    // Optionally close dialog or show success message
    onClose();
  } catch (error) {
    console.error("Booking failed", error);
  }
};



  return (
    <div className="booking-modal">
      <div className="booking-container">
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Vehicle Information */}
        <div className="vehicle-info">
          <div className="vehicle-image">
            {vehicle.image ? (
              <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
            ) : (
              <div className="image-placeholder"><FaCar size={48} /></div>
            )}
          </div>
          <div className="vehicle-details">
            <h3>{vehicle.make} {vehicle.model}</h3>
            <div className="detail-row">
              <span><FaGasPump /> {vehicle.fuelType}</span>
              <span><MdAirlineSeatReclineExtra /> {vehicle.seats} seats</span>
            </div>
            <div className="detail-row">
              <span><IoMdSpeedometer /> {vehicle.mileage} km</span>
              <span>{vehicle.transmission}</span>
            </div>
            <div className="price">${vehicle.pricePerDay}<span>/day</span></div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleContinue} className="booking-form">
          {step === 1 && (
            <div className="form-step">
              <h3>Select Dates</h3>
              <div className="input-group">
                <label>
                  <FiCalendar className="input-icon" />
                  Pickup Date
                  <input
                    type="date"
                    name="pickupDate"
                    value={bookingDetails.pickupDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  <FiCalendar className="input-icon" />
                  Return Date
                  <input
                    type="date"
                    name="returnDate"
                    value={bookingDetails.returnDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-actions">
                <button  type="submit" className="primary-btn">Continue to PayPal</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Payment via PayPal</h3>
              <div className="booking-summary">
                <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
                <p><strong>Pickup:</strong> {bookingDetails.pickupDate}</p>
                <p><strong>Return:</strong> {bookingDetails.returnDate}</p>
                <p><strong>Total:</strong> ${totalCost.toFixed(2)}</p>
              </div>

              {!bookingConfirmed ? (
                <PayPalButtons
                onClick={onbtnpay}
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: totalCost.toFixed(2),
                        },
                      }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(details => {
                      console.log('Payment successful:', details);
                      setBookingConfirmed(true);
                      onClose(); // Optional: Replace with success modal
                    });
                  }}
                  onCancel={() => {
                    console.log("Payment cancelled");
                  }}
                  onError={(err) => {
                    console.error("PayPal Checkout Error", err);
                  }}
                />
              ) : (
                <div className="confirmation-message">
                  <h4>Booking Confirmed!</h4>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VehicleBookings;
