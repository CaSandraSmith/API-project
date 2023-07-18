import { useEffect } from "react"
import { getCurrentUserBookings } from "../../store/bookings"
import "./UserBookingsPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

export default function UserBookingsPage() {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUserBookings())
    }, [dispatch])

    const bookings = useSelector(state => state.bookings.user)
    const bookingsArr = Object.values(bookings)
    let upcomingTrips
    let pastTrips
    let currentTrips

    if (bookingsArr.length) {
        let today = new Date()
        upcomingTrips = bookingsArr.filter(trip => new Date(trip.startDate).getTime() > today.getTime())
        pastTrips = bookingsArr.filter(trip => new Date(trip.endDate).getTime() < today.getTime())
        currentTrips = bookingsArr.filter(trip => new Date(trip.startDate).getTime() < today.getTime() && new Date(trip.endDate).getTime() > today.getTime())
    }

    let months = {
        0: "Jan",
        1: "Feb",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "Aug",
        8: "Sept",
        9: "Oct",
        10: "Nov",
        11: "Dec"
    }

    let formatDates = (start, end, place) => {
        let startDate = new Date(start)
        let endDate = new Date(end)
        let startMonth = startDate.getMonth()
        let endMonth = endDate.getMonth()
        let startDay = startDate.getDate()
        let endDay = endDate.getDate()
        let startYear = startDate.getFullYear()
        let endYear = endDate.getFullYear()

        if (startYear != endYear) {
            if (place === "current/upcoming") {
                return `${months[startMonth]} ${startDay} ${startYear} - ${months[endMonth]} ${endDay} ${endYear}`
            } else {
                return `${months[startMonth]} ${startDay}, ${startYear} - ${months[endMonth]} ${endDay}, ${endYear}`
            }
        }
        if (startMonth === endMonth) {
            if (place === "current/upcoming") {
                return `${months[startMonth]} ${startDay} - ${endDay} ${startYear}`
            } else {
                return `${months[startMonth]} ${startDay} - ${endDay}, ${startYear}`
            }
        }
        if (startMonth != endMonth) {
            if (place === "current/upcoming") {
                return `${months[startMonth]} ${startDay} - ${months[endMonth]} ${endDay} ${startYear}`
            } else {
                return `${months[startMonth]} ${startDay} - ${months[endMonth]} ${endDay}, ${startYear}`
            }
        }
    }

    return (
        <div className="trip-page-wrapper">
            <h1>Trips</h1>
            {bookingsArr.length ?
                <div className="all-bookings-wrapper">
                    {currentTrips.length ?
                        <div>
                            <h3>Your current stays</h3>
                            <div className="full-details-section-trips-wrapper">
                                {currentTrips.map(trip => (
                                    <div className="full-details-trips-wrapper">
                                        <div className="full-details-trips-info-wrapper">
                                            <div className="full-details-trips-owner-city">
                                                <h3>{trip.Spot.city}</h3>
                                                <p>Hosted by {trip.Spot.Owner.firstName}</p>
                                            </div>
                                            <div className="full-details-trips-dates">
                                                <p>{formatDates(trip.startDate, trip.endDate, "current/upcoming")}</p>
                                            </div>
                                            <div className="full-details-trips-owner-address">
                                                <p>{trip.Spot.address}</p>
                                                <p>{trip.Spot.city}, {trip.Spot.state}</p>
                                                <p>{trip.Spot.country}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                src={trip.Spot.previewImage}
                                                alt={`Spot ${trip.Spot.name} preivew image`}
                                                className="full-trip-image"
                                            />
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        : null}
                    <div>
                        <h3>Upcoming reservations</h3>
                        <div className="full-details-section-trips-wrapper">
                            {upcomingTrips.length ?
                                upcomingTrips.map(trip => (
                                    <div className="full-details-trips-wrapper">
                                        <div className="full-details-trips-info-wrapper">
                                            <div className="full-details-trips-owner-city">
                                                <h3>{trip.Spot.city}</h3>
                                                <p>Hosted by {trip.Spot.Owner.firstName}</p>
                                            </div>
                                            <div className="full-details-trips-dates">
                                                <p>{formatDates(trip.startDate, trip.endDate, "current/upcoming")}</p>
                                            </div>
                                            <div className="full-details-trips-owner-address">
                                                <p>{trip.Spot.address}</p>
                                                <p>{trip.Spot.city}, {trip.Spot.state}</p>
                                                <p>{trip.Spot.country}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                src={trip.Spot.previewImage}
                                                alt={`Spot ${trip.Spot.name} preivew image`}
                                                className="full-trip-image"
                                            />
                                        </div>
                                    </div>
                                ))
                                :
                                <div>
                                    <h2>No future trips booked...yet!</h2>
                                    <h3>Time to dust off your bags and start planning your next adventure</h3>
                                    <button onClick={() => history.push("/")}>Start searching</button>
                                </div>
                            }
                        </div>
                    </div>
                    {pastTrips.length ?
                        <div>
                            <h3>Where you’ve been</h3>
                            <div>
                                {pastTrips.map(trip => (
                                    <div>
                                        <div>
                                            <img
                                                src={trip.Spot.previewImage}
                                                alt={`Spot ${trip.Spot.name} preivew image`}
                                                className="temp-image-class"
                                            />
                                        </div>
                                        <div>
                                            <p>{trip.Spot.city}</p>
                                            <p>{formatDates(trip.startDate, trip.endDate, "past")}</p>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        : null}
                </div>
                :
                <div>
                    <h2>No trips booked...yet!</h2>
                    <h3>Time to dust off your bags and start planning your next adventure</h3>
                    <button onClick={() => history.push("/")}>Start searching</button>
                </div>
            }
        </div>
    )
}