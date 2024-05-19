import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { authContext } from '../hooks/authContext';
import { API_URL } from "./env";
import rectangle from '../images/land.jpg';

const Home = () => {
    const navigate = useNavigate();
    const [landData, setLandData] = useState([]);
    const [filteredLandData, setFilteredLandData] = useState([]);
    const [priceFilter, setPriceFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState('');
    const [likeData, setLikeData] = useState([]);
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
                setLandData(prevLandData => prevLandData.map(item => {
                    if (item._id === land._id) {
                        return { ...item, liked: true };
                    }
                    return item;
                }));
                setFilteredLandData(prevFilteredLandData => prevFilteredLandData.map(item => {
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

    const applyFilters = () => {
        let filteredData = [...landData];

        if (priceFilter !== '') {
            filteredData = filteredData.filter(land => land.price <= parseInt(priceFilter));
        }

        if (areaFilter !== '') {
            filteredData = filteredData.filter(land => land.area.toLowerCase().includes(areaFilter.toLowerCase()));
        }

        setFilteredLandData(filteredData);
    };

    const clearFilters = () => {
        setPriceFilter('');
        setAreaFilter('');
        setFilteredLandData(landData);
    };

    useEffect(() => {
        const getLandData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get_land`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    const fetchedData = response.data;
                    setLandData(fetchedData);
                    setFilteredLandData(fetchedData);
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

        getLandData();
    }, [usertoken]);

    useEffect(() => {
        applyFilters();
    }, [priceFilter, areaFilter]);

    useEffect(() => {
        const getUserLikedLands = async () => {
            try {
                const response = await axios.get(`${API_URL}/likes/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    const likedLands = response.data;
                    setLandData(prevLandData => prevLandData.map(land => {
                        if (likedLands.some(likedLand => likedLand.landId === land._id)) {
                            return { ...land, liked: true };
                        }
                        return land;
                    }));
                    setFilteredLandData(prevFilteredLandData => prevFilteredLandData.map(land => {
                        if (likedLands.some(likedLand => likedLand.landId === land._id)) {
                            return { ...land, liked: true };
                        }
                        return land;
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

        getUserLikedLands();
    }, [usertoken]);

    useEffect(() => {
        const getAllLiked = async () => {
            try {
                const response = await axios.get(`${API_URL}/likes`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    const likefetchedData = response.data;
                    setLikeData(likefetchedData);
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

        getAllLiked();
    }, [usertoken]);

    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-3 d-flex justify-content-center">
                    <div
className="mb-3">
<label htmlFor="areaFilter" className="form-label">Filter by Area:</label>
<input
    type="text"
    className="form-control"
    id="areaFilter"
    value={areaFilter}
    onChange={(e) => setAreaFilter(e.target.value)}
/>
</div>
</div>
<div className="col-3 d-flex flex-column align-items-center">
<div className="mb-3">
<label htmlFor="priceFilter" className="form-label">Filter by Less Than Price:</label>
<input
    type="number"
    className="form-control"
    id="priceFilter"
    value={priceFilter}
    onChange={(e) => setPriceFilter(e.target.value)}
/>
</div>
</div>
<div className="d-flex justify-content-center">
<button className="btn btn-primary mb-2 me-2" onClick={applyFilters}>Apply Filters</button>
<button className="btn btn-secondary mb-2" onClick={clearFilters}>Clear Filters</button>
</div>
</div>

<div className="row mb-3">
{filteredLandData.map((land) => {
// Filter likeData to get likes count for the current land
const likesCount = likeData.filter(like => like.landId === land._id).length;

return (
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
            <p className="card-text">Likes: {likesCount}</p> {/* Display likes count */}
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
);
})}
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
