import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiStar, FiClock, FiFilter ,FiArrowRight} from 'react-icons/fi';
import { FaCar, FaGasPump, FaHeart, FaShieldAlt, FaBolt, FaLeaf } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import Header from  '../components/Header'
import './Dashboard.css';
import { MdAirlineSeatReclineExtra } from 'react-icons/md';
import { getAllAvailableVehicle } from '../services/allApi';
import VehicleBookings from '../components/VehicleBookings';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
const navigate=useNavigate()
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState([1, 3]);
  const [activeFilter, setActiveFilter] = useState('all');
    // const [searchkey,setSearchKey]=useState("")

  const [vehicles,setVehicle] =useState( [])
const [showAddVehicleForm, setShowAddVehicleForm] = useState(null); // holds the vehicle to book
const [showModal, setShowModal] = useState(false); // modal visibility
const handleBookClick = () => {
    navigate(`/book-vehicle/${vehicles._id}`, { state: { vehicles } });
  };


  const handleSearch = async(e) => {
    e.preventDefault();
     console.log("reached");
    if(sessionStorage.getItem("token")){
      try {
        let requestHeader={
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        }
        let ApiResponce=await getAllAvailableVehicle(location,requestHeader)
        if(ApiResponce.status==200){
          setVehicle(ApiResponce.data.vehicles)
          console.log(ApiResponce);
          
        }else{
          console.log(ApiResponce)
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      alert("Please login!")
    }
  
  };
  const filteredVehicles = activeFilter === 'all'
  ? vehicles
  : vehicles.filter(vehicle => vehicle.type.toLowerCase() === activeFilter.toLowerCase());
console.log(filteredVehicles)

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <>
    < Header/>
    <div className="dashboard">
 
      {/* Hero Search Section */}
     <section className="hero-search-v2">
  <div className="search-container">
    <div className="hero-content">
      <div className="tagline">PREMIUM SELECTION</div>
      <h1>Drive Your <span className="highlight">Aspirations</span></h1>
      <p className="subtitle">Curated luxury vehicles for every occasion</p>
    </div>
    
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-inputs">
        <div className="input-group" style={{marginBottom:'0px'}}>
          <div style={{backgroundColor:"black"}} className="input-icon-container">
            <FiMapPin className="input-icon" />
          </div>
          <input
          style={{backgroundColor:"black",marginLeft:"20px" }}
            type="text"
            placeholder="Destination"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <div className="input-underline"></div>
        </div>
        
        <button type="submit" className="search-button">
          Find Vehicles
          <div className="arrow-icon">
            <FiArrowRight />
          </div>
        </button>
      </div>
    </form>
    
    <div className="vehicle-types">
      {['Luxury', 'SUV', 'Convertible', 'Sports'].map((type) => (
        <div key={type} className="vehicle-type-pill">
          {type}
        </div>
      ))}
    </div>
  </div>
  
  <div className="hero-image-container">
    <img 
      src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1583&q=80" 
      alt="Luxury Vehicle"
      className="hero-image"
    />
    <div className="image-overlay"></div>
  </div>
</section>
      {/* Main Content */}
      <main className="main-content" style={{marginLeft:'0px',marginRight:'0px'}}>
        {/* Vehicle Filters */}
        <div className="vehicle-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Vehicles
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'electric' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Sedan')}
          >
            Electric
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'suv' ? 'active' : ''}`}
            onClick={() => setActiveFilter('SUV')}
          >
            SUVs
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'sports' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Luxury')}
          >
            Sports
          </button>
          
        </div>

        {/* Vehicle Grid - 3 columns */}
        <div className="vehicle-grid">
  {filteredVehicles.map(vehicle => (
    <div key={vehicle._id} className="vehicle-card">
      <div className="card-image" style={{ backgroundImage: `url(${vehicle.image})` }}>
        <button 
          className={`favorite-btn ${favorites.includes(vehicle.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(vehicle.id)}
        >
          <FaHeart />
        </button>
        <div className="vehicle-rating">
          <FiStar /> {vehicle.rating}
        </div>
      </div>

      <div className="card-content">
        <h3>{vehicle.make} {vehicle.model}</h3>
        
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
          <div className="spec-item">
            <span>Year: {vehicle.year}</span>
          </div>
        </div>

        <div className="vehicle-location">
          <FiMapPin /> {vehicle.location}
        </div>

        <div className="status-row">
          <span className={`status-badge ${vehicle.isAvailable ? 'available' : 'unavailable'}`}>
            {vehicle.isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>

        <div className="card-footer">
          <div className="price">
            <span>From</span>
            <h4>${vehicle.pricePerDay
}<small>/day</small></h4>
          </div>
         <button
  className="book-btn"
  onClick={() => setShowAddVehicleForm(true)
  }
>
  Book Now
</button>


      {showAddVehicleForm && (
                  <VehicleBookings
                    onClose={() => setShowAddVehicleForm(false)}
                    vehicle={vehicle}
                  />
                )}
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Why Choose Us Section - 3 columns */}
        <section className="features-section" style={{backgroundColor:'white'}}>
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Premium Protection</h3>
              <p>All rentals include comprehensive insurance with $0 deductible options</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaBolt />
              </div>
              <h3>Instant Booking</h3>
              <p>Get approved and driving in under 5 minutes with our quick verification</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaLeaf />
              </div>
              <h3>Eco-Friendly</h3>
              <p>We offset 150% of carbon emissions for every rental you make</p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
    </>
  );
};

export default Dashboard;