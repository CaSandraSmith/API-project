import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import { deleteBooking } from "../../../store/bookings"
import "./CancelBookingModal.css"

export default function CancelBookingModal() {
    const { closeModal } = useModal()
    const history = useHistory()
    const dispatch = useDispatch()

    const booking = useSelector(state => state.bookings.singleBooking)

    let deleteClick = async() => {
        let message = await dispatch(deleteBooking(booking.id))
            .then(() => history.push("/myBookings"))
            .then(() => closeModal())
    }

    return  (
        <div>
            <h3>Are you sure you want to cancel this booking?</h3>
            <h3>This action can't be undone.</h3>
            <div>
                <button onClick={deleteClick} >Cancel Booking</button>
                <button onClick={closeModal}>Keep Booking</button>
            </div>
        </div>
    )
}