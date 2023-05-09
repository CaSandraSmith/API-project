import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';

export default function AddSpotForm() {
    const dispatch = useDispatch()
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [spotImage1, setSpotImage1] = useState("");
    const [spotImage2, setSpotImage2] = useState("");
    const [spotImage3, setSpotImage3] = useState("");
    const [spotImage4, setSpotImage4] = useState("");
    const [lat, setLatitude] = useState("");
    const [lng, setLongitude] = useState("");
    // const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        let spot = {address, city, state, country, lat, lng, name, description, price};
        let images = []
        if(previewImage) images.push({preview: true, url: previewImage})
        if(spotImage1) images.push({preview: false, url: spotImage1});
        if(spotImage2) images.push({preview: false, url: spotImage2});
        if(spotImage3) images.push({preview: false, url: spotImage3});
        if(spotImage4) images.push({preview: false, url: spotImage4});

        let newSpot = await dispatch(createSpot(spot, images))
        console.log(newSpot)
    }

    return (
        <div>
            <h1>Create a new Spot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Where's your place located?</h2>
                <h3>Guests will only get your exact address once they booked a reservation.</h3>
                <label>
                    Country
                    <input 
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                    />
                </label>
                <label>
                    Street Address
                    <input 
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                </label>
                <label>
                    City
                    <input 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                    />
                </label>
                <label>
                    State
                    <input 
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='STATE'
                    />
                </label>
                <label>
                    Latitude
                    <input 
                        type="text"
                        value={lat}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder='Latitude'
                    />
                </label>
                <label>
                    Longitude
                    <input 
                        type="text"
                        value={lng}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder='Longitude'
                    />
                </label>
                <h2>Describe your place to guests</h2>
                <h3>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</h3>
                <label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                    />
                </label>
                <h2>Create a title for your spot</h2>
                <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                <label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name of your spot'
                    />
                </label>
                <h2>Set a base price for your spot</h2>
                <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                <label>
                    <input 
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price per night (USD)'
                    />
                </label>
                <h2>Liven up your spot with photos</h2>
                <h3>Submit a link to at least one photo to publish your spot.</h3>
                    <label>
                        <input 
                            type='text'
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            placeholder='Preview Image URL'
                        />
                    </label>
                    <label>
                        <input 
                            type='url'
                            value={spotImage1}
                            onChange={(e) => setSpotImage1(e.target.value)}
                            placeholder='Image URL'
                        />
                    </label>
                    <label>
                        <input 
                            type='url'
                            value={spotImage2}
                            onChange={(e) => setSpotImage2(e.target.value)}
                            placeholder='Image URL'
                        />
                    </label>
                    <label>
                        <input 
                            type='url'
                            value={spotImage3}
                            onChange={(e) => setSpotImage3(e.target.value)}
                            placeholder='Image URL'
                        />
                    </label>
                    <label>
                        <input 
                            type='url'
                            value={spotImage4}
                            onChange={(e) => setSpotImage4(e.target.value)}
                            placeholder='Image URL'
                        />
                    </label>
                    <button>Create Spot</button>
            </form>
        </div>
    )
}