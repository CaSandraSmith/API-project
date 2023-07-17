import { csrfFetch } from "./csrf";

const CREATE_BOOKING = "bookings/create"
const GET_CURRENT_USER_BOOKINGS = "bookings/currentUser"
const GET_SPOT_BOOKINGS = "bookings/spot"
const EDIT_BOOKING = "bookings/edit"
const DELETE_BOOKING = "bookings/edit"

const createNewBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

const allCurrentUserBookings = (bookings) => ({
    type: GET_CURRENT_USER_BOOKINGS,
    bookings: bookings.Bookings
})

const getSpotBookings = (bookings) => ({
    type: GET_SPOT_BOOKINGS,
    bookings: bookings.Bookings
})

const editUserBooking = (booking) => ({
    type: EDIT_BOOKING,
    booking
})

const deleteUserBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
})

export const createBooking = (spotId, booking) => async (dispatch) => {
    let res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(booking)
    }).catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let newBooking = await res.json()
        dispatch(createNewBooking(newBooking))
        return newBooking
    } else {
        return res
    }
}

export const getCurrentUserBookings = () => async (dispatch) => {
    let res = await csrfFetch("/api/bookings/current").catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let bookings = await res.json()
        dispatch(allCurrentUserBookings(bookings))
        return bookings
    } else {
        return res
    }
}

export const getSpotsBookings = (spotId) => async (dispatch) => {
    let res = await csrfFetch(`/api/spots/${spotId}/bookings`).catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let bookings = await res.json()
        dispatch(getSpotBookings(bookings))
        return bookings
    } else {
        return res
    }
}

export const editBooking = (bookingId, booking) => async (dispatch) => {
    let res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify(booking)
    }).catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let editedBooking = await res.json()
        dispatch(editUserBooking(editedBooking))
        return editedBooking
    } else {
        return res
    }
}

export const deleteBooking = (bookingId) => async(dispatch) => {
    let res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    }).catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let message = await res.json()
        dispatch(deleteUserBooking(bookingId))
        return message
    } else {
        return res
    }
}

const initialState = { user: {}, spot: {} }

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BOOKING:
            let newState = {
                ...state,
                user: { ...state.user },
                spot: { ...state.spot }
            }
            delete newState[action.bookingId]
            return newState
        case EDIT_BOOKING:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.booking.id]: action.booking
                },
                spot: {
                    ...state.spot
                }
            }
        case GET_SPOT_BOOKINGS:
            let spotBookings = {}
            for (let booking of action.bookings) {
                console.log("bookingggg in reducer", booking)
                spotBookings[booking.id] = booking
            }
            return {
                ...state,
                user: { ...state.bookings },
                spot: { ...spotBookings }
            }
        case GET_CURRENT_USER_BOOKINGS:
            let userBookings = {}
            for (let booking of action.bookings) {
                userBookings[booking.id] = booking
            }
            return {
                ...state,
                user: { ...userBookings },
                spot: { ...state.spot }
            }
        case CREATE_BOOKING:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.booking.id]: action.booking
                },
                spot: {
                    ...state.spot,
                    [action.booking.id]: action.booking
                }
            }
        default:
            return state
    }
};

export default bookingsReducer;