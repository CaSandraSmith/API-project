import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateASpot } from '../../store/spots';

export default function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
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
        <div>
            <h1>Update your Spot</h1>
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
                <button>Create Spot</button>
            </form>
        </div>
    )
}