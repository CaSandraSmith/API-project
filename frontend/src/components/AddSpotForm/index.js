import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createSpot } from '../../store/spots';

export default function AddSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
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
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true)
        setErrors({})

        let spot = { address, city, state, country, lat, lng, name, description, price };
        let images = [];
        if (previewImage) images.push({ img: 0, preview: true, url: previewImage })
        if (spotImage1) images.push({ img: 1, preview: false, url: spotImage1 });
        if (spotImage2) images.push({ img: 2, preview: false, url: spotImage2 });
        if (spotImage3) images.push({ img: 3, preview: false, url: spotImage3 });
        if (spotImage4) images.push({ img: 4, preview: false, url: spotImage4 });

        let validationErrors = {}
        if (!country) validationErrors.country = "Country is required"
        if (!address) validationErrors.address = "Address is required"
        if (!city) validationErrors.city = "City is required"
        if (!state) validationErrors.state = "State is required"
        if (description.length < 30) validationErrors.description = "Description needs a minimum of 30 characters"
        if (!name) validationErrors.name = "Name is required"
        if (!price) validationErrors.price = "Price is required"
        if (!previewImage) validationErrors.previewImage = "Preview image is required."

        for (let i = 0; i < images.length; i++) {
            let pics = images[i]
            if (!pics.url.endsWith(".png") && !pics.url.endsWith(".jpg") && !pics.url.endsWith(".jpeg") && pics.img !== 0) {
                validationErrors[`image${pics.img}`] = `Image URL must end in .png, .jpg, or .jpeg`
            } else if (!pics.url.endsWith(".png") && !pics.url.endsWith(".jpg") && !pics.url.endsWith(".jpeg") && pics.img === 0 && !validationErrors.previewImage) {
                validationErrors.previewImage = `Image URL must end in .png, .jpg, or .jpeg`
            }
        }

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors)
            return
        }

        let newSpot = await dispatch(createSpot(spot, images))

        if (newSpot.errors) {
            return setErrors(newSpot.errors)
        } else {
            history.push(`/spots/${newSpot.id}`)
        }
    }

    return (
        <div>
            <h1>Create a new Spot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Where's your place located?</h2>
                <h3>Guests will only get your exact address once they booked a reservation.</h3>
                <label>
                    Country
                    {submit && Object.values(errors).length && errors.country ? <p>{errors.country}</p> : null}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                    />

                </label>
                <label>
                    Street Address
                    {submit && Object.values(errors).length && errors.address ? <p>{errors.address}</p> : null}
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                </label>
                <label>
                    City
                    {submit && Object.values(errors).length && errors.city ? <p>{errors.city}</p> : null}
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                    />
                </label>
                <label>
                    State
                    {submit && Object.values(errors).length && errors.state ? <p>{errors.state}</p> : null}
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
                        type="number"
                        value={lat}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder='Latitude'
                        max={90}
                        min={-90}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder='Longitude'
                        max={180}
                        min={-180}
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
                    {submit && Object.values(errors).length && errors.description ? <p>{errors.description}</p> : null}
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
                    {submit && Object.values(errors).length && errors.name ? <p>{errors.name}</p> : null}
                </label>
                <h2>Set a base price for your spot</h2>
                <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                <label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price per night (USD)'
                        min={0}
                    />
                    {submit && Object.values(errors).length && errors.price ? <p>{errors.price}</p> : null}
                </label>
                <h2>Liven up your spot with photos</h2>
                <h3>Submit a link to at least one photo to publish your spot.</h3>
                <label>
                    <input
                        type='url'
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        placeholder='Preview Image URL'
                    />
                    {submit && Object.values(errors).length && errors.previewImage ? <p>{errors.previewImage}</p> : null}
                </label>
                <label>
                    <input
                        type='url'
                        value={spotImage1}
                        onChange={(e) => setSpotImage1(e.target.value)}
                        placeholder='Image URL'
                    />
                    {submit && Object.values(errors).length && errors.image1 ? <p>{errors.image1}</p> : null}
                </label>
                <label>
                    <input
                        type='url'
                        value={spotImage2}
                        onChange={(e) => setSpotImage2(e.target.value)}
                        placeholder='Image URL'
                    />
                    {submit && Object.values(errors).length && errors.image2 ? <p>{errors.image2}</p> : null}
                </label>
                <label>
                    <input
                        type='url'
                        value={spotImage3}
                        onChange={(e) => setSpotImage3(e.target.value)}
                        placeholder='Image URL'
                    />
                    {submit && Object.values(errors).length && errors.image3 ? <p>{errors.image3}</p> : null}
                </label>
                <label>
                    <input
                        type='url'
                        value={spotImage4}
                        onChange={(e) => setSpotImage4(e.target.value)}
                        placeholder='Image URL'
                    />
                    {submit && Object.values(errors).length && errors.image3 ? <p>{errors.image3}</p> : null}
                </label>
                <button>Create Spot</button>
            </form>
        </div>
    )
}