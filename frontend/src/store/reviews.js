import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "reviews/getSpotReviews"

const getReviews = (reviews) => ({
    type: SPOT_REVIEWS,
    reviews: reviews.Reviews
})

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviews = await res.json()
    return dispatch(getReviews(reviews))
}
const initialState = {spot: {}, user: {}}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOT_REVIEWS:
            let newState = {};
            action.reviews.forEach(rev => {
                newState[rev.id] = rev
            });
            return {...state, user: {...state.user}, spot: {...newState}}
        default:
            return state
    }
};

export default reviewReducer;