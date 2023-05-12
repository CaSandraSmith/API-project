import { csrfFetch } from "./csrf";
//set type in constant variable to avoid typing errors
const GET_SPOTS = "spots/getAllSpots";
const GET_SPOT = "spot/getOneSpot"
const CREATE_SPOT = "spot/postSpot"
const USERS_SPOTS = "spots/currentUser"
const UPDATE_SPOT = "spots/updateSpot"
const DELETE_SPOT = "spot/delete"
const CLEAR_SPOT = "spot/clearSingleSpotState"
const CLEAR_USER_SPOTS = "spot/clearUserSpots"

//action creators
const loadAllSpots = (spots) => ({
    type: GET_SPOTS,
    spots: spots.Spots
})

const findSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

const makeNewSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const findUsersSpots = (spots) => ({
    type: USERS_SPOTS,
    spots: spots.Spots
})

const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const clearSingleSpot = () => ({
    type: CLEAR_SPOT
})

export const clearUserSpots = () => ({
    type: CLEAR_USER_SPOTS
})

//thunk action creators
export const loadSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    const spots = await response.json()
    return dispatch(loadAllSpots(spots))
}

export const findOneSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await res.json();
    dispatch(findSpot(spot))
}

export const createSpot = (spot, images) => async (dispatch) => {
    if (!spot.lat) spot.lat = 1
    if (!spot.lng) spot.lng = 1

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    }).catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let newSpot = await res.json()

        for (let i = 0; i < images.length; i++) {
            let pic = images[i]
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                body: JSON.stringify(pic)
            })
        }

        dispatch(makeNewSpot(newSpot))
        return newSpot
    } else {
        return res
    }
}
export const getUsersSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    const spots = await res.json()
    dispatch(findUsersSpots(spots))
}

export const deleteASpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteSpot(spotId))
    }
}

export const updateASpot = (spot) => async (dispatch) => {
    if (!spot.lat) spot.lat = 1
    if (!spot.lng) spot.lng = 1

    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    }).catch(async (errs) => {
        const err = await errs.json();
        return err
    })

    if (res.ok) {
        let updatedSpot = await res.json()
        dispatch(updateSpot(updatedSpot))
        return updatedSpot
    }else {
        return res
    }
}

const initialState = { allSpots: {}, singleSpot: {}, currentUserSpots: {} };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_USER_SPOTS:
            return {...state, allSpots: {...state.allSpots}, singleSpot: {}, currentUserSpots:{}}
        case CLEAR_SPOT:
            let newState7 = {...state, allSpots: {...state.allSpots}, singleSpot: {}}
            return newState7
        case UPDATE_SPOT:
            let newState5 = {...state}
            newState5.allSpots[action.spot.id] = action.spot;
            return newState5
        case DELETE_SPOT:
            let newState = { ...state, singleSpot: {...state.singleSpot}, allSpots: {...state.allSpots}, currentUserSpots: {...state.currentUserSpots} }
            delete newState.currentUserSpots[action.spotId]
            return newState;
        case USERS_SPOTS:
            let newState1 = {}
            action.spots.forEach(spot => {
                newState1[spot.id] = spot
            });
            return { ...state, currentUserSpots: { ...newState1 } }
        case CREATE_SPOT:
            let newState3 = { ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot } }
            return newState3
        case GET_SPOTS:
            let newState4 = {}
            action.spots.forEach(spot => {
                newState4[spot.id] = spot
            });
            return { ...state, allSpots: { ...newState4 } };
        case GET_SPOT:
            let newState6 = { ...state, allSpots: { ...state.allSpots }, currentUserSpots: {...state.currentUserSpots}, singleSpot: { ...action.spot } }
            return newState6
        default:
            return state;
    }
};

export default spotReducer;