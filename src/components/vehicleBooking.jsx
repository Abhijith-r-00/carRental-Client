import React, { useState } from 'react';
import {
  FiCalendar, FiCreditCard, FiUser, FiCheck
} from 'react-icons/fi';
import { FaCar, FaGasPump, FaMoneyBillWave } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import { MdAirlineSeatReclineExtra } from 'react-icons/md';
import './VehicleBookings.css';

const VehicleBookings = ({ vehicle, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickupDate: '',
    returnDate: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Booking submitted:', { vehicle, bookingDetails });
      onClose();
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
              <div className="image-placeholder">
                <FaCar size={48} />
              </div>
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
        <form onSubmit={handleSubmit} className="booking-form">
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
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <label className={`payment-option ${bookingDetails.paymentMethod === 'credit' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={bookingDetails.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                  />
                  <FiCreditCard className="payment-icon" />
                  Credit Card
                </label>
                <label className={`payment-option ${bookingDetails.paymentMethod === 'debit' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit"
                    checked={bookingDetails.paymentMethod === 'debit'}
                    onChange={handleInputChange}
                  />
                  <FaMoneyBillWave className="payment-icon" />
                  Debit Card
                </label>
              </div>

              <div className="card-details">
                <div className="input-group">
                  <label>
                    <FiCreditCard className="input-icon" />
                    Card Number
                    <input
                      type="text"
                      name="cardNumber"
                      value={bookingDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </label>
                </div>
                <div className="card-row">
                  <div className="input-group">
                    <label>
                      Expiry Date
                      <input
                        type="text"
                        name="cardExpiry"
                        value={bookingDetails.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </label>
                  </div>
                  <div className="input-group">
                    <label>
                      CVC
                      <input
                        type="text"
                        name="cardCvc"
                        value={bookingDetails.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="input-group">
                  <label>
                    <FiUser className="input-icon" />
                    Cardholder Name
                    <input
                      type="text"
                      name="name"
                      value={bookingDetails.name}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step confirmation">
              <div className="confirmation-icon">
                <FiCheck />
              </div>
              <h3>Confirm Booking</h3>
              <div className="booking-summary">
                <div className="summary-item"><span>Vehicle:</span><span>{vehicle.make} {vehicle.model}</span></div>
                <div className="summary-item"><span>Pickup:</span><span>{bookingDetails.pickupDate}</span></div>
                <div className="summary-item"><span>Return:</span><span>{bookingDetails.returnDate}</span></div>
                <div className="summary-item"><span>Payment:</span><span>{bookingDetails.paymentMethod === 'credit' ? 'Credit' : 'Debit'} Card</span></div>
                <div className="summary-item total"><span>Total:</span><span>${vehicle.pricePerDay * 3} (3 days)</span></div>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="secondary-btn" onClick={() => setStep(step - 1)}>Back</button>
            )}
            <button type="submit" className="primary-btn">
              {step < 3 ? 'Continue' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleBookings;
