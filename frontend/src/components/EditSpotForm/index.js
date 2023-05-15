import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateASpot } from '../../store/spots';
import './EditSpotForm.css'

export default function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const foundSpot = useSelector(state => state.spots.currentUserSpots[id]);
    const [country, setCountry] = useState(foundSpot?.country);
    const [address, setAddress] = useState(foundSpot?.address);
    const [city, setCity] = useState(foundSpot?.city);
    const [state, setState] = useState(foundSpot?.state);
    const [description, setDescription] = useState(foundSpot?.description);
    const [name, setName] = useState(foundSpot?.name);
    const [price, setPrice] = useState(foundSpot?.price);
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true)
        setErrors({})

        let validationErrors = {}
        if (!country) validationErrors.country = "Country is required"
        if (!address) validationErrors.address = "Address is required"
        if (!city) validationErrors.city = "City is required"
        if (!state) validationErrors.state = "State is required"
        if (description.length < 30) validationErrors.description = "Description needs a minimum of 30 characters"
        if (!name) validationErrors.name = "Name is required"
        if (!price) validationErrors.price = "Price is required"

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors)
            return
        }

        let spot = { id, address, city, state, country, name, description, price };
        let updatedSpot = await dispatch(updateASpot(spot))

        if (updatedSpot.errors) {
            return setErrors(updatedSpot.errors)
        } else {
            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    return (
        <div className='create-spots-form-wrapper'>
            <div className='create-spots-form'>
                <form onSubmit={handleSubmit}>
                    <h1>Update your Spot</h1>
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
                    <h2>Create a title for your spot</h2>
                    <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
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
                    <div className='create-new-spot-button'>
                        <button>Update your Spot</button>
                    </div>
                </form>
            </div>
        </div>
    )
}