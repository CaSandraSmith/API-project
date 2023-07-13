import { csrfFetch } from "./csrf";

const CREATE_BOOKING = "bookings/create"
const GET_CURRENT_USER_BOOKINGS = "bookings/currentUser"

const createNewBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

const allCurrentUserBookings = (bookings) => ({
    type: GET_CURRENT_USER_BOOKINGS,
    bookings: bookings.Bookings
})

export const createBooking = (spotId, booking) => async (dispatch) => {
    let res = await csrfFetch(`/api/spots/${spotId}/bookings`,  {
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

export const getCurrentUserBookings = () => async(dispatch) => {
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

const initialState = {user: {}, spot: {}}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_BOOKINGS:
            let userBookings = {}
            for (let booking in action.bookings) {
                userBookings[booking.id] = booking
            }
            return {
                ...state,
                user: {...userBookings},
                spot: {...state.spot}
            }
        case CREATE_BOOKING:
            return {...state, 
                user: {
                        ...state.user,
                        [action.booking.id]: action.booking
                },
                spot: {...state.spot,
                    [action.booking.id]: action.booking
                }
            }
        default:
            return state
    }
};

export default bookingsReducer;