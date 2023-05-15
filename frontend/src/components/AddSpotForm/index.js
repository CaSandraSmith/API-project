import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createSpot } from '../../store/spots';
import './AddSpotForm.css'

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
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true)
        setErrors({})

        let spot = { address, city, state, country, name, description, price };
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
        <div className='create-spots-form-wrapper'>
            <div className='create-spots-form'>
                <form onSubmit={handleSubmit}>
                    <h1>Create a New Spot</h1>
                    <div className='create-spot-form-section'>
                        <p className='create-spot-form-heading'>Where's your place located?</p>
                        <p className='create-spot-form-caption'>Guests will only get your exact address once they booked a reservation.</p>
                    </div>
                    <label className='input-error-wrapper'>
                        <div className='error-message-on-top'>
                            <span>Country</span> {submit && Object.values(errors).length && errors.country ? <span className='create-spot-error-messages'>{errors.country}</span> : null}
                        </div>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder='Country'
                        />
                    </label>
                    <label className='input-error-wrapper'>
                        <div className='error-message-on-top'>
                            <span>Street Address</span> {submit && Object.values(errors).length && errors.address ? <span className='create-spot-error-messages'>{errors.address}</span> : null}
                        </div>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Address'
                        />
                    </label>
                    <div className='city-state-inputs'>
                        <label className='city-input input-error-wrapper'>
                            <div className='error-message-on-top'>
                                <span>City</span> {submit && Object.values(errors).length && errors.city ? <span className='create-spot-error-messages'>{errors.city}</span> : null}
                            </div>
                            <div className='city-input-box-wrapper'>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder='City'
                                />
                                <span>,</span>
                            </div>
                        </label>
                        <label className='state-input input-error-wrapper'>
                            <div className='error-message-on-top'>
                                <span>State</span> {submit && Object.values(errors).length && errors.state ? <span className='create-spot-error-messages'>{errors.state}</span> : null}
                            </div>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder='STATE'
                            />
                        </label>
                    </div>
                    <div className='create-spot-form-section'>
                        <p className='create-spot-form-heading'>Describe your place to guests</p>
                        <p className='create-spot-form-caption'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>
                    </div>
                    <label className='description-text-area'>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Please write at least 30 characters'
                        />
                        {submit && Object.values(errors).length && errors.description ? <span className='create-spot-error-messages'>{errors.description}</span> : null}
                    </label>
                    <div className='create-spot-form-section'>
                        <p className='create-spot-form-heading'>Create a title for your spot</p>
                        <p className='create-spot-form-caption'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    </div>
                    <label className='name-input-box'>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name of your spot'
                        />
                        {submit && Object.values(errors).length && errors.name ? <span className='create-spot-error-messages'>{errors.name}</span> : null}
                    </label>
                    <div className='create-spot-form-section'>
                        <p className='create-spot-form-heading'>Set a base price for your spot</p>
                        <p className='create-spot-form-caption'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    </div>
                    <label className='price-input-wrapper'>
                        <div className='price-input'>
                            <span>$</span><input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='Price per night (USD)'
                                min={0}
                            />
                        </div>
                        {submit && Object.values(errors).length && errors.price ? <span className='create-spot-error-messages'>{errors.price}</span> : null}
                    </label>
                    <div className='create-spot-form-section'>
                        <p className='create-spot-form-heading'>Liven up your spot with photos</p>
                        <p className='create-spot-form-caption'>Submit a link to at least one photo to publish your spot.</p>
                    </div>
                    <div className='upload-photos'>
                        <label>
                            <input
                                type='url'
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                placeholder='Preview Image URL'
                            />
                            {submit && Object.values(errors).length && errors.previewImage ? <span className='create-spot-error-messages'>{errors.previewImage}</span> : null}
                        </label>
                        <label>
                            <input
                                type='url'
                                value={spotImage1}
                                onChange={(e) => setSpotImage1(e.target.value)}
                                placeholder='Image URL'
                            />
                            {submit && Object.values(errors).length && errors.image1 ? <span className='create-spot-error-messages'>{errors.image1}</span> : null}
                        </label>
                        <label>
                            <input
                                type='url'
                                value={spotImage2}
                                onChange={(e) => setSpotImage2(e.target.value)}
                                placeholder='Image URL'
                            />
                            {submit && Object.values(errors).length && errors.image2 ? <span className='create-spot-error-messages'>{errors.image2}</span> : null}
                        </label>
                        <label>
                            <input
                                type='url'
                                value={spotImage3}
                                onChange={(e) => setSpotImage3(e.target.value)}
                                placeholder='Image URL'
                            />
                            {submit && Object.values(errors).length && errors.image3 ? <span className='create-spot-error-messages'>{errors.image3}</span> : null}
                        </label>
                        <label>
                            <input
                                type='url'
                                value={spotImage4}
                                onChange={(e) => setSpotImage4(e.target.value)}
                                placeholder='Image URL'
                            />
                            {submit && Object.values(errors).length && errors.image3 ? <span className='create-spot-error-messages'>{errors.image3}</span> : null}
                        </label>
                    </div>
                    <div className='create-new-spot-button'>
                        <button>Create Spot</button>
                    </div>
                </form>
            </div >
        </div >
    )
}