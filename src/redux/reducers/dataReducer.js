import {
	SET_TALKS,
	LIKE_TALK,
	UNLIKE_TALK,
	LOADING_DATA,
	DELETE_TALK,
	POST_TALK,
	SET_TALK,
	SUBMIT_COMMENT
} from '../types'

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
		case SET_TALK:
			return {
				...state,
				talk : action.payload
			}
		case LIKE_TALK:
		case UNLIKE_TALK:
			let index = state.talks.findIndex((talk) => talk.talkId === action.payload.talkId)
			state.talks[index] = action.payload
			if (state.talk.talkId === action.payload.talkId) {
				let commentSnapshot = state.talk.comments
				state.talk = {
					comments : commentSnapshot,
					...action.payload
				}
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
		case SUBMIT_COMMENT:
			return {
				...state,
				talk : {
					...state.talk,
					comments : [
						action.payload,
						...state.talk.comments
					]
				}
			}
		default:
			return state
	}
}
