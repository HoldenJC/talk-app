import { SET_TALKS, SET_TALK, LIKE_TALK, UNLIKE_TALK, LOADING_DATA, DELETE_TALK, POST_TALK } from '../types'

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
			if (state.talk.talkId === action.payload.talkId) {
				state.talk = action.payload
			}
			return {
				...state
			}
		case DELETE_TALK:
			return {
				...state,
				talks : state.talks.filter((talk) => talk.talkId !== action.payload)
			}
		case POST_TALK:
			return {
				...state,
				talks : [
					action.payload,
					...state.talks
				]
			}
		case SET_TALK:
			return {
				...state,
				talk : action.payload
			}
		default:
			return state
	}
}
