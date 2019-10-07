import { SET_TALKS, LOADING_DATA, LIKE_TALK, UNLIKE_TALK } from '../types'
import axios from 'axios'

export const getTalks = () => (dispatch) => {
	dispatch({ type: LOADING_DATA })
	axios
		.get('/talks')
		.then((res) => {
			dispatch({
				type: SET_TALKS,
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: SET_TALKS,
				payload: []
			})
		})
}

export const likeTalk = (talkId) => (dispatch) => {
	axios
		.get(`/talk/${talkId}/like`)
		.then((res) => {
			dispatch({
				type: LIKE_TALK,
				payload: res.data
			})
		})
		.catch((err) => console.log(err))
}

export const unlikeTalk = (talkId) => (dispatch) => {
	axios
		.get(`/talk/${talkId}/unlike`)
		.then((res) => {
			dispatch({
				type: UNLIKE_TALK,
				payload: res.data
			})
		})
		.catch((err) => console.log(err))
}
