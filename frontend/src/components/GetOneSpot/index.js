import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, isAfter, isBefore, isValid, parse, startOfMonth, differenceInCalendarDays } from 'date-fns';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';

import { useModal } from '../../context/Modal';
import { findOneSpot, clearSingleSpot } from '../../store/spots';
import { createBooking, getSpotsBookings } from '../../store/bookings';
import IndividualSpotReviews from './IndividualSpotReviews';
import SignupFormModal from '../SignupFormModal';
import "./GetOneSpot.css"

export default function GetOneSpot() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [selectedRange, setSelectedRange] = useState()
    const [calenderOpen, setCalendarOpen] = useState(false)
    const [errors, setErrors] = useState({})
    const { setModalContent } = useModal()

    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    let num = Object.values(reviews).length
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(findOneSpot(id))
        dispatch(getSpotsBookings(id))
        return (() => dispatch(clearSingleSpot()))
    }, [dispatch, num])

    useEffect(() => {
        if (!selectedRange) {
            setStartDate("")
            setEndDate("")
            return
        }

        if (selectedRange && selectedRange.from && selectedRange.to) {
            if (new Date(startDate) < selectedRange.to && new Date(endDate) > selectedRange.to) {
                setStartDate(selectedRange.to.toString())
                setSelectedRange({ from: new Date(selectedRange.to), to: new Date(endDate) })
            } else {
                setEndDate(selectedRange.to.toString())
            }
        } else {
            if (selectedRange?.from) {
                setStartDate(selectedRange.from.toString())
            } else {
                setStartDate("")
            }

            if (selectedRange?.to) {
                setEndDate(selectedRange.to.toString())
            } else {
                setEndDate("")
            }
        }

    }, [selectedRange])

    const spotBookings = useSelector(state => state.bookings.spot)
    if (!Object.values(spot).length) return null

    let testClick = () => {
        console.log("hello")
    }

    let makeReservation = async (e) => {
        e.preventDefault()
        if (!user) return setModalContent(<SignupFormModal />)

        let valErrors = {}
        if (!startDate) {
            valErrors.startDate = "Must select start date."
        }
        if (!endDate) {
            valErrors.startDate = "Must select start date."
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
            valErrors.dates = "Start Date must come before end date."
        }

        if (Object.values(valErrors).length) {
            setErrors(valErrors)
            return
        }
        let booking = { startDate, endDate }

        let newBooking = await dispatch(createBooking(spot.id, booking))
    }

    let hidePrevMonths = (day) => {
        let today = new Date()
        return differenceInCalendarDays(day, startOfMonth(today)) < 0
    }

    let disabledDays = () => {
        let days = [{ before: new Date() }]
        for (let booking of Object.values(spotBookings)) {
            days.push(new Date(booking.startDate))

            let startTime = new Date(booking.startDate).getTime()
            let endTime = new Date(booking.endDate).getTime()

            while (startTime + 86400000 < endTime) {
                days.push(new Date(startTime + 86400000))
                startTime = startTime + 86400000
            }
            days.push(new Date(booking.endDate))
        }
        return days
    }

    return (
        <div className='singleSpotPage'>
            <div className='single-spot-name-location'>
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            </div>
            <div className='getOneSpotImages' onClick={testClick}>
                <div className='preview-image-wrapper'>
                    <img src={spot.SpotImages[0].url} alt={spot.SpotImages[0].name} className='preview-image images' />
                </div>
                <div className='optional-images'>
                    {spot.SpotImages[1] ?
                        <img src={spot.SpotImages[1].url} alt={spot.SpotImages[1].name} className='spotImage1 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage1 images' />
                    }
                    {spot.SpotImages[2] ?
                        <img src={spot.SpotImages[2].url} alt={spot.SpotImages[2].name} className='spotImage2 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage2 images' />
                    }
                    {spot.SpotImages[3] ?
                        <img src={spot.SpotImages[3].url} alt={spot.SpotImages[3].name} className='spotImage3 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage3 images' />
                    }
                    {spot.SpotImages[4] ?
                        <img src={spot.SpotImages[4].url} alt={spot.SpotImages[4].name} className='spotImage4 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage4 images' />
                    }
                </div>
                <button className='view-single-spot-photos-button'>
                    <div className='view-single-spot-photos-icons'>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    <p className='view-single-spot-photos-text'>Show all photos</p>
                </button>
            </div>
            <div className='individual-spot-info'>
                <div className='host-info'>
                    <h3 className='host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div className='booking-info-wrapper'>
                    <div className='booking-info'>
                        <div>
                            ${spot.price} night
                        </div>
                        {num ? (
                            <div className='rating-star-info-single-spot'>
                                <div className='star-rating'>
                                    <i className="fa-solid fa-star booking-star-rating"></i>
                                    {spot?.avgStarRating?.toFixed(1)}
                                </div>
                                <i className="fa-solid fa-circle"></i>
                                <div>
                                    {num} {num === 1 ? <span>review</span> : <span>reviews</span>}
                                </div>
                            </div>
                        ) : (
                            <div className='rating-star-info-single-spot'>
                                <i className="fa-solid fa-star booking-star-rating"></i> New
                            </div>
                        )}
                    </div>
                    <div className='booking-input-wrapper'>
                        <div className='booking-input-captions-wrapper' onClick={() => setCalendarOpen(true)}>
                            <p>CHECK-IN</p>
                            <p>{startDate ? startDate : "Add date"}</p>
                        </div>
                        <div className='booking-input-captions-wrapper' onClick={() => setCalendarOpen(true)}>
                            <p>CHECKOUT</p>
                            <p>{endDate ? endDate : "Add date"}</p>
                        </div>
                        {calenderOpen &&
                            <div>
                                {/* <i onClick={handleRangeClick} class="fa-solid fa-x"></i> */}
                                <div>
                                    {/* <div>
                                        <p>{startDate && endDate ? `${differenceInCalendarDays(new Date(endDate), new Date(startDate))} nights` : "Select Dates"}</p>
                                        <p>{startDate && endDate ? "" : "Add your travel dates for exact pricing"}</p>
                                    </div>
                                    <div>
                                        <div>
                                            <p>CHECK-IN:</p>
                                            <p>{startDate ? startDate : "Add date"}</p>
                                        </div>
                                        <div>
                                            <p>CHECKOUT:</p>
                                            <p>{endDate ? endDate : "Add date"}</p>
                                        </div>
                                    </div> */}
                                </div>
                                <div>
                                    <DayPicker
                                        mode="range"
                                        selected={selectedRange}
                                        onSelect={setSelectedRange}
                                        hidden={hidePrevMonths}
                                        disabled={disabledDays()}
                                    />
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <div className='rating-info'>
                <IndividualSpotReviews />
            </div>
        </div>
    )
}