//set type in constant variable to avoid typing errors
const GET_SPOTS = "spots/getAllSpots";
const GET_SPOT = "spot/getOneSpot"

//action creators
const loadAllSpots = (spots) => ({
    type: GET_SPOTS,
    spots: spots.Spots
})

const findSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

//thunk action creators
export const loadSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    const spots = await response.json()
    return dispatch(loadAllSpots(spots))
}

export const findOneSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)
    const spot = await res.json();
    dispatch(findSpot(spot))
}


const initialState = { allSpots: {}, singleSpot: {} };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
        let newState = {}
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