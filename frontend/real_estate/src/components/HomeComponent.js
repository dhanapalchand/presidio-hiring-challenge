import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { authContext } from '../hooks/authContext';
import { API_URL } from "./env";
import rectangle from '../images/land.jpg';

const Home = () => {
    const navigate = useNavigate();
    const [landData, setLandData] = useState([]);
    const [likeData, setLikeData] = useState([]);
    const [filter, setFilter] = useState('');
    const { user } = useContext(authContext);
    const usertoken = user.token;

    const buttonStyle = {
        position: 'fixed',
        top: '90%',
        left: '90%',
    };

    const handlePostJobClick = () => {
        navigate('/dashboard/landdetails');
    };

    const handleInterestedClick = async (land) => {
        try {
            const response = await axios.post(`${API_URL}/interest_land`, {
                userId: user.id,
                landId: land._id,
                landDetails: land,
            }, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Interest registered successfully');
                // Navigate to the profile component with the user ID
                navigate(`/dashboard/userdetails/${land.user}`);
            } else {
                console.log('Request failed with status code:', response.status);
                navigate(`/dashboard/userdetails/${land.user}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
            navigate(`/dashboard/userdetails/${land.user}`);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Status Code:', error.response.status);
                console.error('Error Headers:', error.response.headers);
                navigate(`/dashboard/userdetails/${land.user}`);
            }
        }
    };

    const handleLikeClick = async (land) => {
        console.log(land);
        try {
            const response = await axios.post(`${API_URL}/like_land`, {
                userId: user.id,
                landId: land._id,
                landDetails: land,
            }, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Land liked successfully');
                // Update the liked status of the land
                setLandData(prevLandData => prevLandData.map(item => {
                    if (item._id === land._id) {
                        return { ...item, liked: true };
                    }
                    return item;
                }));
            } else {
                console.log('Request failed with status code:', response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Status Code:', error.response.status);
                console.error('Error Headers:', error.response.headers);
            }
        }
    };

    const getLandData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_land`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                const fetchedData = response.data;
                // Map land data and set liked status based on likeData
                const updatedLandData = fetchedData.map(land => ({
                    ...land,
                    liked: likeData.some(like => like.landId === land._id)
                }));
                setLandData(updatedLandData);
            } else {
                console.log('Request failed with status code:', response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Status Code:', error.response.status);
                console.error('Error Headers:', error.response.headers);
            }
        }
    };

    useEffect(() => {
        getLandData();
    }, [likeData]); // Trigger re-render when likeData changes

    useEffect(() => {
        // Fetch like data
        const fetchLikeData = async () => {
            try {
                const response = await axios.get(`${API_URL}/likes/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    setLikeData(response.data);
                } else {
                    console.log("Request failed with status code:", response.status);
                }
            } catch (error) {
                console.error("Error:", error.message);
                if (error.response)
                    {
                        console.error("Error Response Data:", error.response.data);
                        console.error("Error Status Code:", error.response.status);
                        console.error("Error Headers:", error.response.headers);
                    }
                }
            };
            fetchLikeData();
        }, [user.id, usertoken]);
    
        const handleFilterChange = (event) => {
            setFilter(event.target.value);
        };
    
        const filteredLandData = landData.filter(land => land.place.toLowerCase().includes(filter.toLowerCase()));
    
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter area name to filter"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <div className="row">
                    {filteredLandData.map((land) => (
                        <div key={land._id} className="col-md-4 mb-3">
                            <div className="card">
                                <img
                                    src={rectangle}
                                    className="card-img-top"
                                    alt={land.place}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{land.place}</h5>
                                    <p className="card-text">Area: {land.area}</p>
                                    <p className="card-text">Bedrooms: {land.numberOfBedrooms}</p>
                                    <p className="card-text">Bathrooms: {land.numberOfBathrooms}</p>
                                    <p className="card-text">Price: ${land.price}</p>
                                    <p className="card-text">Nearby Hospitals: {land.nearbyHospitals ? 'Yes' : 'No'}</p>
                                    <p className="card-text">Nearby Colleges: {land.nearbyColleges ? 'Yes' : 'No'}</p>
                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-success me-2"
                                            onClick={() => handleInterestedClick(land)}
                                        >
                                            Interested
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${land.liked ? 'btn-danger' : 'btn-info'}`}
                                            onClick={() => handleLikeClick(land)}
                                        >
                                            {land.liked ? 'Liked' : 'Like'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-end" style={{ paddingTop: '3%' }}>
                    <button
                        type="button"
                        className="btn btn-primary rounded-1 p-2 px-4 mb-4"
                        onClick={handlePostJobClick}
                        style={buttonStyle}
                    >
                        <span>Add Land</span>
                    </button>
                </div>
            </div>
        );
    };
    
    export default Home;
    