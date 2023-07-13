import { csrfFetch } from "./csrf";

const CREATE_BOOKING = "bookings/create"

const createNewBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
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

const initialState = {user: {}, spot: {}}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
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