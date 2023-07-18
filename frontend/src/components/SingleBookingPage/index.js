import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { differenceInCalendarDays } from 'date-fns';
import { getSingleBooking } from "../../store/bookings"
import { useModal } from "../../context/Modal";
import EditBookingModal from "./EditBookingModal";
import CancelBookingModal from "./CancelBookingModal";
import "./SingleBookingPage.css"

export default function SingleBookingPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { setModalContent } = useModal()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getSingleBooking(id))
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const booking = useSelector(state => state.bookings.singleBooking)

    if (!user) history.push("/")
    if (Object.values(booking).length && user.id != booking.userId) history.push("/")

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

    let days = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thur",
        5: "Fri",
        6: "Sat"
    }

    let today = new Date()

    let formatDay = (date) => {
        let day = new Date(date)
        return `${days[day.getDay()]}, ${months[day.getMonth()]} ${day.getDate()}`
    }

    let makeConfirmationCode = () => {
        let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
        let code = ""

        while (code.length < 10) {
            let i = Math.floor(Math.random() * char.length)
            code += char[i]
        }
        return code
    }

    let calculateNetCost = () => {
        let nightly = booking.Spot.price * differenceInCalendarDays(new Date(booking.endDate), new Date(booking.startDate))
        return Math.floor(0.13 * nightly) + nightly
    }

    if (!Object.values(booking).length) return <p>Loading</p>

    return (
        <div className="single-booking-page-wrapper">
            <div className="single-booking-image-wrapper">
                <div className="single-booking-image-caption">
                    <i onClick={() => history.goBack()} className="fa-solid fa-arrow-left"></i>
                    <h2>
                        {today < new Date(booking.startDate) ?
                            `You're all set for ${booking.Spot.city}`
                            :
                            `Your stay at ${booking.Spot.Owner.firstName}'s place`
                        }
                    </h2>
                </div>
                <img
                    src={booking.Spot.previewImage}
                    alt={`Spot, ${booking.Spot.name}, preview image`}
                />
            </div>
            <div className="single-booking-info">
                <div className="single-booking-dates-wrapper">
                    <div className="single-booking-dates">
                        <p>Check-in</p>
                        <p>{formatDay(booking.startDate)}</p>
                    </div>
                    <div className="single-booking-dates">
                        <p>Checkout</p>
                        <p>{formatDay(booking.endDate)}</p>
                    </div>
                </div>
                <div className="single-reservation-details-wrapper">
                    <div>
                        <h3>Reservation details</h3>
                    </div>
                    <div className="single-reservation-details-section">
                        <h4>Confirmation code</h4>
                        <p>{makeConfirmationCode()}</p>
                    </div>
                    {today < new Date(booking.startDate) ?
                        <>
                            <div onClick={() => setModalContent(<EditBookingModal />)} className="single-reservation-details-section change-booking-wrapper">
                                <div>
                                    <i className="fa-solid fa-pencil"></i>
                                    <p>Change reservation</p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                            <div onClick={() => setModalContent(<CancelBookingModal />)} className="single-reservation-details-section change-booking-wrapper">
                                <div>
                                    <i className="fa-solid fa-ban"></i>
                                    <p>Cancel reservation</p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
                <div className="single-booking-host">
                    <h3>Hosted by {booking.Spot.Owner.firstName}</h3>
                </div>
                <div>
                    <h3>Payment details</h3>
                    <div>
                        <p>Total cost: ${calculateNetCost()} USD</p>
                    </div>
                </div>
            </div>
        </div>
    )
}