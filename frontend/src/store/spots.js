import { csrfFetch } from "./csrf";
//set type in constant variable to avoid typing errors
const GET_SPOTS = "spots/getAllSpots";
const GET_SPOT = "spot/getOneSpot"
const CREATE_SPOT = "spot/postSpot"

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
    })
    console.log(res)
    if (res.ok) {
        let newSpot = await res.json()

        images.forEach(async(pic) => {
            await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                body: JSON.stringify(pic)
            })
        })

        dispatch(makeNewSpot(newSpot))
        return newSpot
    } else {
        let errs = await res.json()
        return errs
    }
}


const initialState = { allSpots: {}, singleSpot: {} };

const spotReducer = (state = initialState, action) => {
    let newState
  switch (action.type) {
    case CREATE_SPOT:
        newState = {...state, allSpots: {...state.allSpots, [action.spot.id]: action.spot}}
        return newState
    case GET_SPOTS:
        newState = {}
        action.spots.forEach(spot => {
            newState[spot.id] = spot
        });
        return {...state, allSpots: {...newState}};
    case GET_SPOT:
        return {...state, singleSpot: {...action.spot}}
    default:
      return state;
  }
};

export default spotReducer;