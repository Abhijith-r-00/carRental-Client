import React, { useState } from "react";
import { FiSearch, FiMapPin, FiArrowRight, FiStar } from "react-icons/fi";
import {
  FaCar,
  FaGasPump,
  FaHeart,
  FaShieldAlt,
  FaBolt,
  FaLeaf,
} from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import Header from "../components/Header";
import "./Dashboard.css";
import { getAllAvailableVehicle } from "../services/allApi";
import VehicleBookings from "../components/VehicleBookings";
import { useNavigate } from "react-router-dom";
// import '../components/VehicleBookings.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const Dashboard = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (sessionStorage.getItem("token")) {
      try {
        const requestHeader = {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        };
        const apiResponse = await getAllAvailableVehicle(
          location,
          requestHeader
        );
        if (apiResponse.status === 200) {
          setVehicles(apiResponse.data.vehicles);
        } else {
          console.log(apiResponse);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please login!");
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredVehicles =
    activeFilter === "all"
      ? vehicles
      : vehicles.filter(
          (vehicle) => vehicle.type.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <>
      <Header />
      <div className="dashboard">
        {/* Hero Search Section */}
        <section className="hero-search-v2">
          <div className="search-container">
            <div className="hero-content">
              <div className="tagline">PREMIUM SELECTION</div>
              <h1>
                Drive Your <span className="highlight">Aspirations</span>
              </h1>
              <p className="subtitle">
                Curated luxury vehicles for every occasion
              </p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
              <div className="search-inputs">
                <div className="input-group" style={{ marginBottom: "0PX" }}>
                  <div className="input-icon-container">
                    <FiMapPin className="input-icon" />
                  </div>
                  <input
                    style={{ backgroundColor: "black" }}
                    type="text"
                    placeholder="Location....."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <div className="input-underline"></div>
                </div>

                <button type="submit" className="search-button">
                  Find Vehicles <FiArrowRight className="arrow-icon" />
                </button>
              </div>
            </form>

            <div className="vehicle-types">
              {["Luxury", "SUV", "Convertible", "Sports"].map((type) => (
                <div key={type} className="vehicle-type-pill">
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1583&q=80"
              alt="Luxury Vehicle"
              className="hero-image"
            />
            <div className="image-overlay"></div>
          </div>
        </section>

        {/* Filters */}
        <div className="vehicle-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Vehicles
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "electric" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("Electric")}
          >
            Electric
          </button>
          <button
            className={`filter-btn ${activeFilter === "suv" ? "active" : ""}`}
            onClick={() => setActiveFilter("SUV")}
          >
            SUVs
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "sports" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("Sports")}
          >
            Sports
          </button>
        </div>

        {/* Vehicle Grid */}
        <div className="vehicle-grid">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="vehicle-card">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${vehicle.image})` }}
              >
                <button
                  className={`favorite-btn ${
                    favorites.includes(vehicle._id) ? "active" : ""
                  }`}
                  onClick={() => toggleFavorite(vehicle._id)}
                >
                  <FaHeart />
                </button>
                <div className="vehicle-rating">
                  <FiStar /> {vehicle.rating}
                </div>
              </div>

              <div className="card-content">
                <h3>
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="vehicle-type">{vehicle.type}</p>
                <div className="vehicle-specs">
                  <div className="spec-item">
                    <IoMdSpeedometer />
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="spec-item">
                    <FaCar />
                    <span>{vehicle.seats} seats</span>
                  </div>
                  <div className="spec-item">
                    <FaGasPump />
                    <span>{vehicle.fuelType}</span>
                  </div>
                  <div className="spec-item">
                    <MdAirlineSeatReclineExtra />
                    <span>{vehicle.mileage} km</span>
                  </div>
                  <div className="spec-item">Year: {vehicle.year}</div>
                </div>

                <div className="vehicle-location">
                  <FiMapPin /> {vehicle.location}
                </div>

                <div className="status-row">
                  <span
                    className={`status-badge ${
                      vehicle.isAvailable ? "available" : "unavailable"
                    }`}
                  >
                    {vehicle.isAvailable ? "Available" : "Booked"}
                  </span>
                </div>

                <div className="card-footer">
                  <div className="price">
                    <span>From</span>
                    <h4>
                      ${vehicle.pricePerDay}
                      <small>/day</small>
                    </h4>
                  </div>
                  <button
                    className="book-btn"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        {/* <section className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaShieldAlt /></div>
              <h3>Premium Protection</h3>
              <p>All rentals include comprehensive insurance with $0 deductible options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaBolt /></div>
              <h3>Instant Booking</h3>
              <p>Get approved and driving in under 5 minutes with our quick verification.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaLeaf /></div>
              <h3>Eco-Friendly</h3>
              <p>We offset 150% of carbon emissions for every rental you make.</p>
            </div>
          </div>
        </section> */}
      </div>

      {/* Booking Modal */}
      {selectedVehicle && (
       

  <VehicleBookings
    vehicle={selectedVehicle}
    onClose={() => setSelectedVehicle(null)}
  />

      )}
    </>
  );
};

export default Dashboard;
