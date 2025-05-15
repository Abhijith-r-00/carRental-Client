import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiPlus,
  FiSettings,
  FiBell,
} from "react-icons/fi";
import {
  FaCarAlt,
  FaChartLine,
  FaSearch,
  FaUserCircle,
  FaCar,
  FaGasPump,
} from "react-icons/fa";
import { IoLocationSharp } from 'react-icons/io5';
import { BsGraphUp } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import "./CarOwnerDashboard.css";
import { useNavigate } from "react-router-dom";
import AddVehicle from "../components/AddVehicle.jsx";
import { deleteVehicleByOwner, getVehiclesList } from "../services/allApi.js";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
const CarOwnerDashboard = () => {
  const navigate = useNavigate();
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const handleSaveVehicle = (vehicleData) => {
    console.log("Saving vehicle:", vehicleData);
    // Add API call or state update here
  };

  const [availableCars, setavailableCars] = useState([]);
  // let  availableCars = [];
  useEffect(() => {
    getAllvehicle();
  }, []);
  const getAllvehicle = async () => {
    try {
      // const token=sessionStorage.getItem("token")
      // console.log(token);
      let requestHeader = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      const apiResponse = await getVehiclesList(requestHeader);
      setavailableCars(apiResponse.data);
      // console.log(availableCars);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = async () => {};

  const onClickDelete = async (id) => {
    let requestHeader = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    
    try {
      const apiResponse = await deleteVehicleByOwner(id, requestHeader);
      // console.log(apiResponse);
      getAllvehicle()
    } catch (error) {
      console.log(error);
    }
  };

  // Sample dat
const len=availableCars.length
  const dashboardStats = [
    {
      icon: <FiDollarSign />,
      title: "Total Rentals",
      value: "$1,850",
      change: "+5.2%",
    },
    { icon: <FaCarAlt />, title: "Available Cars", value: `${len}`, change: "+2" },
    {
      icon: <FiCalendar />,
      title: "Active Bookings",
      value: "18",
      change: "+3",
    },
    {
      icon: <BsGraphUp />,
      title: "Monthly Growth",
      value: "+22%",
      change: "up",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      car: "Tesla Model S",
      customer: "Alex Johnson",
      date: "Today, 09:30 AM",
      duration: "3 days",
      price: "$450",
      status: "active",
    },
    {
      id: 2,
      car: "BMW X5",
      customer: "Sarah Miller",
      date: "Tomorrow, 02:00 PM",
      duration: "2 days",
      price: "$320",
      status: "upcoming",
    },
    {
      id: 3,
      car: "Audi A4",
      customer: "Michael Chen",
      date: "Jun 12, 10:00 AM",
      duration: "5 days",
      price: "$625",
      status: "completed",
    },
  ];

  return (
    <div className="pro-dashboard">
      {/* Top Navigation Bar */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <FaCarAlt className="logo-icon" />
            <h1>LET RIDE</h1>
          </div>

          <nav className="main-nav">
            <button
              className={`nav-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <RiDashboardLine className="nav-icon" />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${activeTab === "vehicles" ? "active" : ""}`}
              onClick={() => setActiveTab("vehicles")}
            >
              <FaCarAlt className="nav-icon" />
              <span>Vehicles</span>
            </button>
            <button
              className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              <FiCalendar className="nav-icon" />
              <span>Bookings</span>
            </button>
          </nav>
        </div>

        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search vehicles, bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* <button className="notification-btn">
            <FiBell />
            <span className="notification-badge">3</span>
          </button> */}

          {/* <button className="user-profile">
            <FaUserCircle className="user-avatar" />
            <span>Admin</span>
          </button> */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-view">
            <div className="content-header">
              <h2>Dashboard Overview</h2>
              <div className="header-actions">
                <button
                  onClick={() => setShowAddVehicleForm(true)}
                  className="add-vehicle-btn"
                >
                  Add New Vehicle
                </button>

                {/* Modal Conditionally Rendered */}
                {showAddVehicleForm && (
                  <AddVehicle
                    onClose={() => setShowAddVehicleForm(false)}
                    onSave={handleSaveVehicle}
                  />
                )}
              </div>
            </div>

            <div className="stats-grid">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div
                    className={`stat-icon ${
                      stat.change.includes("+") ? "positive" : "negative"
                    }`}
                  >
                    {stat.icon}
                  </div>
                  <div className="stat-info">
                    <h3>{stat.title}</h3>
                    <p>{stat.value}</p>
                    <span
                      className={`stat-change ${
                        stat.change.includes("+") ? "positive" : "negative"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-sections">
              <div className="recent-bookings">
                <div className="section-header">
                  <h3>Recent Bookings</h3>
                  <button className="text-btn">View All</button>
                </div>
                <div className="bookings-table">
                  <div className="table-header">
                    <div>Car</div>
                    <div>Customer</div>
                    <div>Date</div>
                    <div>Duration</div>
                    <div>Price</div>
                    <div>Status</div>
                  </div>
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="table-row">
                      <div className="car-info">
                        <FaCarAlt />
                        <span>{booking.car}</span>
                      </div>
                      <div>{booking.customer}</div>
                      <div>{booking.date}</div>
                      <div>{booking.duration}</div>
                      <div className="price">{booking.price}</div>
                      <div className={`status ${booking.status}`}>
                        {booking.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-actions">
                <div className="section-header">
                  <h3>Quick Actions</h3>
                </div>
                <div className="action-buttons">
                  <button className="action-btn">
                    <FiPlus /> Add New Vehicle
                  </button>
                  <button className="action-btn">
                    <FiCalendar /> View Calendar
                  </button>
                  <button className="action-btn">
                    <FiDollarSign /> Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vehicles" && (
          <div className="vehicles-view">
            <div className="content-header">
              <h2>Vehicle Fleet</h2>
              <button className="add-vehicle-btn">
                <FiPlus /> Add New Vehicle
              </button>
            </div>
            {console.log(availableCars)}
            <div className="vehicle-grid">
              {availableCars.map((car) => (
                <div key={car._id} className="vehicle-card">
                  <div className="card-header">
                    <h3>
                      {car.make} {car.model}
                    </h3>
                    {car.location?(<h5 style={{color:"black"}}>
                      <IoLocationSharp className="icon" />{car.location}
                    </h5>):""}
                    <span
                      className={`status-badge ${
                        car.isAvailable ? "available" : "unavailable"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Booked"}
                    </span>
                  </div>

                  <div className="card-image">
                    {car.image ? (
                      <img src={car.image} alt={`${car.make} ${car.model}`} />
                    ) : (
                      <div className="image-placeholder">
                        <FaCar size={48} />
                      </div>
                    )}
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">Type:</span>
                      <span style={{ color: "blue" }}>{car.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Year:</span>
                      <span style={{ color: "blue" }}>{car.year}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Fuel:</span>
                      <span style={{ color: "blue" }}>
                        <FaGasPump className="icon" /> {car.fuelType}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Transmission:</span>
                      <span style={{ color: "blue" }}>{car.transmission}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Seats:</span>
                      <span style={{ color: "blue" }}>
                        <MdAirlineSeatReclineExtra className="icon" />{" "}
                        {car.seats}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Mileage:</span>
                      <span style={{ color: "blue" }}>
                        <IoMdSpeedometer className="icon" /> {car.mileage} km
                      </span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="price">
                      ${car.pricePerDay}
                      <span>/day</span>
                    </div>
                    <div className="card-actions">
                      <button
                        onClick={() => onClickEdit(car._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onClickDelete(car._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "bookings" && (
          <div className="bookings-view">
            <div className="content-header">
              <h2>Booking Management</h2>
              <div className="header-actions">
                <button className="primary-btn">
                  <FiPlus /> New Booking
                </button>
              </div>
            </div>
            {/* Booking calendar and list would go here */}
          </div>
        )}
      </main>
    </div>
  );
};

export default CarOwnerDashboard;
