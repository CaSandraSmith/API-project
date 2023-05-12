import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "reviews/getSpotReviews"
const CREATE_REVIEWS = "reviews/createNewReview"
const DELETE_REVIEW = "reviews/deleteReview"

const getReviews = (reviews) => ({
    type: SPOT_REVIEWS,
    reviews: reviews.Reviews
})

const postNewReview = (review) => ({
    type: CREATE_REVIEWS,
    review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const reviewDeletions = (reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

export const createReview = (review, spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    }).catch(async(e) => {
        const errs = await e.json();
        return errs
    });

    if (res.ok) {
        let newReview = await res.json()
        dispatch(postNewReview(newReview))
        return newReview
    } else {
        return res
    }
}

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviews = await res.json()
    dispatch(getReviews(reviews))
}
const initialState = {spot: {}, user: {}}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_REVIEW:
            let newState2 = {...state, spot: {...state.spot}, user: {...state.user}}
            delete newState2.spot[action.reviewId]
            return newState2
        case CREATE_REVIEWS:
            let newState1 = {...state, spot: {...state.spot, [action.review.id]: action.review}, user: {...state.user}}
            return newState1
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