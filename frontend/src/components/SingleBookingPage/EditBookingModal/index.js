import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startOfMonth, differenceInCalendarDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useModal } from "../../../context/Modal"
import { editBooking, getSpotsBookings } from "../../../store/bookings"

export default function EditBookingModal() {
    const { closeModal } = useModal()
    const booking = useSelector(state => state.bookings.singleBooking)
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(booking.startDate)
    const [endDate, setEndDate] = useState(booking.endDate)
    const [selectedRange, setSelectedRange] = useState({ from: new Date(booking.startDate), to: new Date(booking.endDate) })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getSpotsBookings(booking.Spot.id))
    }, [dispatch])

    const spotBookings = useSelector(state => state.bookings.spot)

    useEffect(() => {
        if (!selectedRange) {
            setStartDate("")
            setEndDate("")
            return
        }

        if (selectedRange && selectedRange.from !== undefined && selectedRange.to !== undefined) {
            let disabledDates = disabledDays()
            let includesDisable = false

            for (let day of disabledDates) {
                if (day instanceof Date) {
                    let startTime = new Date(selectedRange.from).getTime()
                    let endTime = new Date(selectedRange.to).getTime()
                    while (startTime < endTime) {
                        let checkedDate = new Date(startTime)
                        if (day.getDate() === checkedDate.getDate() && day.getMonth() === checkedDate.getMonth() && day.getFullYear() === checkedDate.getFullYear()) {
                            includesDisable = true
                        }
                        startTime = startTime + 86400000
                    }
                }
            }
            if (includesDisable) {
                setSelectedRange({ from: new Date(selectedRange.from), to: undefined })
                setStartDate(selectedRange.from.toString())
                setEndDate("")
                return
            }
            if (new Date(startDate) < selectedRange.to && new Date(endDate) > selectedRange.to) {
                setStartDate(selectedRange.to.toString())
                setSelectedRange({ from: new Date(selectedRange.to), to: new Date(endDate) })
            } else {
                setStartDate(selectedRange.from.toString())
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

    let editReservation = async (e) => {
        e.preventDefault()

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
        let editedBooking = { startDate, endDate }

        let newBooking = await dispatch(editBooking(booking.id, editedBooking))

        if (newBooking.errors) {
            setErrors(newBooking)
        } else {
            closeModal()
        }
    }

    let disabledDays = () => {
        let days = [{ before: new Date() }]
        for (let bookings of Object.values(spotBookings)) {
            if (bookings.id != booking.id) {
                days.push(new Date(bookings.startDate))

                let startTime = new Date(bookings.startDate).getTime()
                let endTime = new Date(bookings.endDate).getTime()

                while (startTime + 86400000 < endTime) {
                    days.push(new Date(startTime + 86400000))
                    startTime = startTime + 86400000
                }
                days.push(new Date(bookings.endDate))
            }
        }
        return days
    }

    let handleClearClick = () => {
        setSelectedRange({ from: undefined, to: undefined })
        setStartDate("")
        setEndDate("")
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


    let startRes
    let endRes

    if (startDate) {
        startRes = new Date(startDate)
    }
    if (endDate) {
        endRes = new Date(endDate)
    }

    return (
        <div className="edit-booking-modal-wrapper">
            {Object.values(errors).length ? Object.values(errors).map(error => (<p>{error}</p>)) : null}
            <div className='booking-calender-caption-wrapper'>
                <div>
                    <p className='booking-calender-caption'>{startDate && endDate ? `${differenceInCalendarDays(new Date(endDate), new Date(startDate))} nights` : "Select Dates"}</p>
                    <p className='booking-calender-dates'>{startDate && endDate ?
                        `${months[startRes.getMonth()]} ${startRes.getDate()}, ${startRes.getFullYear()} 
                - 
                ${months[endRes.getMonth()]} ${endRes.getDate()}, ${endRes.getFullYear()}`
                        : "Add your travel dates for exact pricing"}</p>
                </div>
                <div className='calendar-input-wrapper'>
                    <div className='calendar-input-captions-wrapper'>
                        <p>CHECK-IN</p>
                        <p>{startDate ? `${startRes.getMonth() + 1}/${startRes.getDate()}/${startRes.getFullYear()}` : "Add date"}</p>
                    </div>
                    <div className='calendar-input-captions-wrapper'>
                        <p>CHECKOUT</p>
                        <p>{endDate ? `${endRes.getMonth() + 1}/${endRes.getDate()}/${endRes.getFullYear()}` : "Add date"}</p>
                    </div>
                </div>
            </div>
            <div className='booking-calendar-wrapper'>
                <DayPicker
                    mode="range"
                    selected={selectedRange}
                    onSelect={setSelectedRange}
                    disabled={disabledDays()}
                    fromMonth={new Date()}
                    numberOfMonths={2}
                    min={2}
                />
            </div>
            <div className='booking-calender-footer-wrapper'>
                <p onClick={handleClearClick}>Clear Dates</p>
                <button onClick={closeModal}>Cancel</button>
                <button disabled={!startDate || !endDate} onClick={editReservation}>Change reservation</button>
            </div>
        </div>
    )
}