import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiStar, FiClock, FiShield, FiBattery } from 'react-icons/fi';
import { FaCarSide, FaRegSnowflake } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import './Home.css'
const Home = () => {
    const navigate= useNavigate()
    const onBtnClick=()=>{
    navigate('/login')

  }




  const [activeTab, setActiveTab] = useState('sport');

  const cars = {
    sport: [
      {
        id: 1,
        name: 'Tesla Roadster',
        price: 299,
        speed: '2.1s 0-60',
        range: '620mi',
        image: 'https://static0.carbuzzimages.com/wordpress/wp-content/uploads/gallery-images/original/847000/700/847781.jpg'
      },
      {
        id: 2,
        name: 'Porsche 911',
        price: 349,
        speed: '3.2s 0-60',
        range: '450mi',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888'
      },
      {
        id: 3,
        name: 'Audi R8',
        price: 379,
        speed: '3.5s 0-60',
        range: '400mi',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8'
      }
    ],
    luxury: [
      {
        id: 4,
        name: 'Rolls Royce Phantom',
        price: 599,
        speed: '5.3s 0-60',
        range: '500mi',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26t_O28asciD0v6y6ckyw48Ds8LkpJnpQ5w&s'
      },
      {
        id: 5,
        name: 'Bentley Continental',
        price: 499,
        speed: '3.6s 0-60',
        range: '550mi',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2'
      },
      {
        id: 6,
        name: 'Mercedes-Maybach S-Class ',
        price: 699,
        speed: '3.6s 0-60',
        range: '550mi',
        image: 'https://static.toiimg.com/thumb/msid-79305644,width-1280,height-720,resizemode-4/79305644.jpg'
      }
    ]
  };

  return (
    <div className="futuristic-home">
  
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>
                <span className="hero-gradient">REDEFINE</span>
                <span className="hero-gradient">YOUR</span>
                <span className="hero-gradient">DRIVE</span>
              </h1>
              <p className="hero-subtitle">Experience the future of mobility with our premium fleet</p>
              <button onClick={onBtnClick} className="cta-button">
                EXPLORE FLEET <FiArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* Car Showcase Section */}
        <section className="car-showcase">
          <div className="container">
            <div className="section-header">
              <h2>OUR PREMIUM FLEET</h2>
              <p>Choose from our curated selection of high-performance vehicles</p>
            </div>
            
            <div className="category-tabs">
              <button 
                className={`tab-btn ${activeTab === 'sport' ? 'active' : ''}`}
                onClick={() => setActiveTab('sport')}
              >
                <IoMdSpeedometer /> Sport
              </button>
              <button 
                className={`tab-btn ${activeTab === 'luxury' ? 'active' : ''}`}
                onClick={() => setActiveTab('luxury')}
              >
                <FiStar /> Luxury
              </button>
            </div>
            
            <div className="cars-grid">
              {cars[activeTab].map(car => (
                <div key={car.id} className="car-card">
                  <div className="card-glass">
                    <div className="car-image" style={{ backgroundImage: `url(${car.image})` }}>
                      <div className="car-badge">NEW</div>
                    </div>
                    <div className="car-info">
                      <h3>{car.name}</h3>
                      <div className="car-specs">
                        <span><IoMdSpeedometer /> {car.speed}</span>
                        <span><FiBattery /> {car.range}</span>
                      </div>
                      <div className="price-tag">
                        <span>FROM</span>
                        <h4>${car.price}<small>/day</small></h4>
                      </div>
                      <button onClick={onBtnClick} className="rent-now">
                        RENT NOW <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>WHY CHOOSE LETRIDE</h2>
              <p>We're redefining the car rental experience</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FiShield />
                </div>
                <h3>Blockchain Security</h3>
                <p>Smart contract powered rentals with encrypted transactions</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaRegSnowflake />
                </div>
                <h3>Climate Neutral</h3>
                <p>Carbon offset included with every rental</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FiClock />
                </div>
                <h3>Instant Booking</h3>
                <p>Get approved and driving in under 5 minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Home;