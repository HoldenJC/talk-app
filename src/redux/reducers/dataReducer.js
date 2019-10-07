import { SET_TALKS, LIKE_TALK, UNLIKE_TALK, LOADING_DATA, DELETE_TALK, POST_TALK } from '../types'

const initialState = {
	talks   : [],
	talk    : {},
	loading : false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading : true
			}
		case SET_TALKS:
			return {
				...state,
				talks   : action.payload,
				loading : false
			}
		case LIKE_TALK:
		case UNLIKE_TALK:
			let index = state.talks.findIndex((talk) => talk.talkId === action.payload.talkId)
			state.talks[index] = action.payload
			return {
				...state
			}
		case DELETE_TALK:
			index = state.talks.findIndex((talk) => talk.talkId === action.payload)
			state.talks.splice(index, 1)
			return {
				...state
			}
		case POST_TALK:
			return {
				...state,
				talks : [
					action.payload,
					...state.talks
				]
			}
		default:
			return state
	}
}
