import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiStar, FiClock, FiFilter } from 'react-icons/fi';
import { FaCar, FaGasPump, FaRegSnowflake, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import './Dashboard.css'
const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // Sample vehicle data
  const [availableVehicles] = useState([
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'Electric Sedan',
      price: 129,
      seats: 5,
      transmission: 'Automatic',
      mileage: 'Unlimited',
      location: 'Downtown Hub',
      image: 'https://images.unsplash.com/photo-1551836022-d5d44eef8b70',
      rating: 4.8,
      reviews: 142,
      features: ['Free charging', 'Autopilot', 'Premium sound']
    },
    {
      id: 2,
      name: 'BMW X5',
      type: 'Luxury SUV',
      price: 189,
      seats: 7,
      transmission: 'Automatic',
      mileage: '300 mi/day',
      location: 'Airport Terminal',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
      rating: 4.6,
      reviews: 89,
      features: ['Panoramic roof', 'Heated seats', 'Premium package']
    },
    {
      id: 3,
      name: 'Jeep Wrangler',
      type: 'Off-Road SUV',
      price: 149,
      seats: 4,
      transmission: 'Manual',
      mileage: 'Unlimited',
      location: 'Mountain Outpost',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7',
      rating: 4.7,
      reviews: 67,
      features: ['4x4', 'Convertible', 'Off-road package']
    },
    {
      id: 4,
      name: 'Porsche 911',
      type: 'Sports Car',
      price: 299,
      seats: 2,
      transmission: 'Automatic',
      mileage: '200 mi/day',
      location: 'City Center',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
      rating: 4.9,
      reviews: 215,
      features: ['Premium interior', 'Sport exhaust', 'Track mode']
    }
  ]);

  const [recommendedVehicles] = useState([
    // Similar structure with different vehicles
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      setShowResults(true);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="user-dashboard">
 
      
      <main className="dashboard-container">
        {/* Hero Search Section */}
        <section className="hero-search">
          <div className="search-overlay">
            <h1>Find Your Perfect Ride</h1>
            <p>Search thousands of vehicles across hundreds of locations</p>
            
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-row">
                <div className="input-group">
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="City, Airport, or Address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <FiCalendar className="input-icon" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="search-button">
                  <FiSearch className="button-icon" />
                  Search Vehicles
                </button>
              </div>
              
              <div className="advanced-options">
                <button type="button" className="filter-button">
                  <FiFilter /> More Filters
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Recommended Section */}
          {!showResults && (
            <section className="recommended-section">
              <h2 className="section-title">Recommended For You</h2>
              <p className="section-subtitle">Based on your preferences and past rentals</p>
              
              <div className="vehicle-grid">
                {recommendedVehicles.slice(0, 4).map(vehicle => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    isFavorite={favorites.includes(vehicle.id)}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Search Results */}
          {showResults && (
            <section className="search-results">
              <div className="results-header">
                <h2>{availableVehicles.length} Vehicles Available in {location}</h2>
                <div className="results-controls">
                  <div className="sort-filter">
                    <select className="sort-select">
                      <option>Sort: Recommended</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Rating</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="vehicle-grid">
                {availableVehicles.map(vehicle => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    isFavorite={favorites.includes(vehicle.id)}
                    onFavoriteToggle={toggleFavorite}
                    showLocation={true}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Features Section */}
          <section className="features-section">
            <h2 className="section-title">Why Rent With Us?</h2>
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
                  <FaRegSnowflake />
                </div>
                <h3>Climate Commitment</h3>
                <p>We offset 150% of carbon emissions from every rental</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FiClock />
                </div>
                <h3>Instant Approval</h3>
                <p>Get approved in minutes with our automated verification system</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="activity-section">
            <h2 className="section-title">Your Rental Activity</h2>
            <div className="activity-cards">
              <div className="activity-card upcoming">
                <h3>Upcoming Trips</h3>
                <div className="activity-count">2</div>
                <button className="view-button">View Details</button>
              </div>
              
              <div className="activity-card past">
                <h3>Past Rentals</h3>
                <div className="activity-count">7</div>
                <button className="view-button">View History</button>
              </div>
              
              <div className="activity-card favorites">
                <h3>Favorites</h3>
                <div className="activity-count">{favorites.length}</div>
                <button className="view-button">View Favorites</button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
    </div>
  );
};

// Reusable Vehicle Card Component
const VehicleCard = ({ vehicle, isFavorite, onFavoriteToggle, showLocation = false }) => {
  return (
    <div className="vehicle-card">
      <div className="card-header">
        <div className="vehicle-image" style={{ backgroundImage: `url(${vehicle.image})` }}>
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={() => onFavoriteToggle(vehicle.id)}
          >
            <FaHeart />
          </button>
          <div className="vehicle-rating">
            <FiStar /> {vehicle.rating} <span>({vehicle.reviews})</span>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="vehicle-name">{vehicle.name}</h3>
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
            <span>{vehicle.mileage}</span>
          </div>
        </div>
        
        {showLocation && (
          <div className="vehicle-location">
            <FiMapPin /> {vehicle.location}
          </div>
        )}
        
        <div className="vehicle-features">
          {vehicle.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
      </div>
      
      <div className="card-footer">
        <div className="vehicle-price">
          <span>FROM</span>
          <h4>${vehicle.price}<small>/day</small></h4>
        </div>
        <button className="book-button">Book Now</button>
      </div>
    </div>
  );
};

export default Dashboard;