import React, { useState } from 'react';
import { FiPlus, FiX, FiDollarSign, FiUpload } from 'react-icons/fi';
import { FaCar, FaGasPump, FaChair, FaCarAlt } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import { MdAirlineSeatReclineExtra } from 'react-icons/md';
import './AddVehicle.css'
import { toast } from 'react-toastify';
import { addNewVehicle } from '../services/allApi';
const AddVehicle= ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    pricePerDay: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: '',
    mileage: '',
    features: [],
    image: null,
    previewImage: '',
    vehicleNumber:'',
    location:''
  });

  const [featureInput, setFeatureInput] = useState('');
  const fileInputRef = React.useRef(null);

  const vehicleTypes = [
    'Sedan', 'SUV', 'Truck', 'Hatchback', 
    'Coupe', 'Convertible', 'Van', 'Luxury'
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissions = ['Automatic', 'Manual'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, previewImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // onSave(formData);
    // let token=sessionStorage.getItem("token")
    // console.log(token);
    
    try {
         if (sessionStorage.getItem("token")) {
        let requestHeader = {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
        // console.log(requestHeader)
        let apiReponse= await addNewVehicle(formData,requestHeader)
        console.log(apiReponse);
        if(apiReponse.status==201){
        toast.success('Successfully added New Vehicle')
        }else{
          toast.error('Something Went Wrong')
        }
        // console.log(formData)
        
      }
    } catch (error) {
      console.log(error);
      
    }
    
    // onClose();
  };

  return (
    <div className="form-overlay">
      <div className="vehicle-form-container">
        <div className="form-header">
          <h2>
            <FaCarAlt className="header-icon" />
            Register New Vehicle
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">Vehicle Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Make (Brand)</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Toyota"
                />
              </div>
              
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Camry"
                />
              </div>

           </div>
            <div className="form-row">
               <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. KL00 XXXX"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Kollam"
                />
              </div>
</div>

            
            
            <div className="form-row">
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  min="2000"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  placeholder="2023"
                />
              </div>
              
              <div className="form-group">
                <label>Vehicle Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  {vehicleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="section-title">Specifications</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Price per day ($)</label>
                <div className="input-with-icon">
                  <FiDollarSign className="input-icon" />
                  <input
                    type="number"
                    name="pricePerDay"
                    min="1"
                    step="0.01"
                    value={formData.pricePerDay}
                    onChange={handleInputChange}
                    required
                    placeholder="50.00"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Fuel Type</label>
                <div className="input-with-icon">
                  <FaGasPump className="input-icon" />
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    required
                  >
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  required
                >
                  {transmissions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Number of Seats</label>
                <div className="input-with-icon">
                  <MdAirlineSeatReclineExtra className="input-icon" />
                  <input
                    type="number"
                    name="seats"
                    min="1"
                    max="20"
                    value={formData.seats}
                    onChange={handleInputChange}
                    required
                    placeholder="5"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Mileage (km)</label>
              <div className="input-with-icon">
                <IoMdSpeedometer className="input-icon" />
                <input
                  type="number"
                  name="mileage"
                  min="0"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                  placeholder="15"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="section-title">Features & Image</h3>
            
            <div className="form-group">
              <label>Add Features (e.g., GPS, Air Conditioning)</label>
              <div className="features-input">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Enter a feature"
                  onKeyPress={(e) => e.key === 'Enter' && handleFeatureAdd()}
                />
                <button 
                  type="button" 
                  className="add-feature-btn"
                  onClick={handleFeatureAdd}
                >
                  <FiPlus />
                </button>
              </div>
              
              {formData.features.length > 0 && (
                <div className="features-list">
                  {formData.features.map(feature => (
                    <div key={feature} className="feature-tag">
                      {feature}
                      <button 
                        type="button"
                        onClick={() => handleFeatureRemove(feature)}
                        className="remove-feature-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Vehicle Image</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                {formData.previewImage ? (
                  <div className="image-preview-wrapper">
                    <img 
                      src={formData.previewImage} 
                      alt="Vehicle preview" 
                      className="image-preview"
                    />
                    <button 
                      type="button"
                      className="change-image-btn"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div 
                    className="upload-area"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FiUpload className="upload-icon" />
                    <p>Click to upload vehicle image</p>
                    <small>Recommended size: 800x600px</small>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
            >
              Register Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;