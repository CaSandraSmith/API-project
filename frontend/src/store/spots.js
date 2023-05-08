//set type in constant variable to avoid typing errors
const GET_SPOTS = "spots/getAllSpots";

//action creators
const loadAllSpots = (spots) => ({
    type: GET_SPOTS,
    spots: spots.Spots
})


//thunk action creators
export const loadSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    const spots = await response.json()
    return dispatch(loadAllSpots(spots))
}


const initialState = { allSpots: {} };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
        newState = {}
        action.spots.forEach(spot => {
            newState[spot.id] = spot
        });
        return {...state, allSpots: {...newState}}
    default:
      return state;
  }
};

export default spotReducer;