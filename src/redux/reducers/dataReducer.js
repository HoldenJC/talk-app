import { SET_TALKS, LIKE_TALK, UNLIKE_TALK, LOADING_DATA } from '../types'

const initialState = {
	talks: [],
	talk: {},
	loading: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			}
		case SET_TALKS:
			return {
				...state,
				talks: action.payload,
				loading: false
			}
		case LIKE_TALK:
		case UNLIKE_TALK:
			let index = state.talks.findIndex((talk) => talk.talkId === action.payload.talkId)
			state.talks[index] = action.payload
			return {
				...state
			}
		default:
			return state
	}
}
