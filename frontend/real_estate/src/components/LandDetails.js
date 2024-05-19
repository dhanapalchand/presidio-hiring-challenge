import React, { useState, useContext } from "react";
import { authContext } from '../hooks/authContext'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from "./env";


const LandDetails = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState(false);
  const [nearbyColleges, setNearbyColleges] = useState(false);
  const [price, setPrice] = useState('');
  const { user } = useContext(authContext);
  const usertoken = user.token;
  const userId = user.id;
  
  const handleSubmit = async (e) => {
 


    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/post_land`,
        {
          user: userId,
          place,
          area,
          numberOfBedrooms: bedrooms,
          numberOfBathrooms: bathrooms,
          nearbyHospitals,
          nearbyColleges,
          price,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usertoken}`,
          },
        }
      );
     // console.log(response.data); 
     navigate(`/dashboard/myland`);
     
      setPlace('');
      setArea('');
      setBedrooms('');
      setBathrooms('');
      setNearbyHospitals(false);
      setNearbyColleges(false);
      setPrice('');
    } catch (error) {
      console.error('Error submitting land details:', error);
      
    }
  };

  return (
    <div class="container-fluid primary-color">
       <section class="row">
       <div class=" col-md-12 d-flex justify-content-center">
          <div class="shadow px-4 rounded-3 w-75">
            <div class='text-left'>
      <h2>Enter Land Details for Selling</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="place">Place:</label>
          <input
           class="form-control mb-4"
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="area">Area:</label>
          <input
           class="form-control mb-4"
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Number of Bedrooms:</label>
          <input
           class="form-control mb-4"
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bathrooms">Number of Bathrooms:</label>
          <input
           class="form-control mb-4"
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nearbyHospitals">Hospitals Nearby:</label>
          <input
          className="form-check-input form-check-xl"
            type="checkbox"
            id="nearbyHospitals"
            checked={nearbyHospitals}
            onChange={(e) => setNearbyHospitals(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="nearbyColleges" >Colleges Nearby:</label>
          <input
          className="form-check-input form-check-xl"
            type="checkbox"
            id="nearbyColleges"
            checked={nearbyColleges}
            onChange={(e) => setNearbyColleges(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
           class="form-control mb-4"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button style={{"background-color":"#6F4DF5"}} class='button rounded-2 w-100 text-white p-1' type="submit">Submit</button>
      </form>
      </div>
      </div></div>
      </section>
      
    </div>
  );
};

export default LandDetails;
