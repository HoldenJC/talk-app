import {
	SET_TALKS,
	LOADING_DATA,
	LIKE_TALK,
	UNLIKE_TALK,
	DELETE_TALK,
	SET_ERRORS,
	POST_TALK,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_TALK,
	STOP_LOADING_UI,
	SUBMIT_COMMENT
} from '../types'
import axios from 'axios'

export const getTalks = () => (dispatch) => {
	dispatch({ type: LOADING_DATA })
	axios
		.get('/talks')
		.then((res) => {
			dispatch({
				type    : SET_TALKS,
				payload : res.data
			})
		})
		.catch((err) => {
			dispatch({
				type    : SET_TALKS,
				payload : []
			})
		})
}

export const getTalk = (talkId) => (dispatch) => {
	dispatch({ type: LOADING_UI })
	axios
		.get(`/talk/${talkId}`)
		.then((res) => {
			dispatch({
				type    : SET_TALK,
				payload : res.data
			})
			dispatch({
				type : STOP_LOADING_UI
			})
		})
		.catch((err) => console.log(err))
}

export const postTalk = (newTalk) => (dispatch) => {
	dispatch({ type: LOADING_UI })
	axios
		.post('/talk', newTalk)
		.then((res) => {
			dispatch({
				type    : POST_TALK,
				payload : res.data
			})
			dispatch(clearErrors())
		})
		.catch((err) => {
			dispatch({
				type    : SET_ERRORS,
				payload : err.response.data
			})
		})
}

export const likeTalk = (talkId) => (dispatch) => {
	axios
		.get(`/talk/${talkId}/like`)
		.then((res) => {
			dispatch({
				type    : LIKE_TALK,
				payload : res.data
			})
		})
		.catch((err) => console.log(err))
}

export const unlikeTalk = (talkId) => (dispatch) => {
	axios
		.get(`/talk/${talkId}/unlike`)
		.then((res) => {
			dispatch({
				type    : UNLIKE_TALK,
				payload : res.data
			})
		})
		.catch((err) => console.log(err))
}

export const submitComment = (talkId, commentData) => (dispatch) => {
	axios
		.post(`/talk/${talkId}/comment`, commentData)
		.then((res) => {
			dispatch({
				type    : SUBMIT_COMMENT,
				payload : res.data
			})
			dispatch(clearErrors())
		})
		.catch((err) => {
			dispatch({
				type    : SET_ERRORS,
				payload : err.response.data
			})
		})
}

export const deleteTalk = (talkId) => (dispatch) => {
	axios
		.delete(`/talk/${talkId}`)
		.then(() => {
			dispatch({
				type    : DELETE_TALK,
				payload : talkId
			})
		})
		.catch((err) => console.log(err))
}

export const getUserData = (userHandle) => (dispatch) => {
	dispatch({ type: LOADING_DATA })
	axios
		.get(`/user/${userHandle}`)
		.then((res) => {
			dispatch({
				type    : SET_TALKS,
				payload : res.data.talks
			})
		})
		.catch(() => {
			dispatch({
				type    : SET_TALKS,
				payload : null
			})
		})
}

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS })
}
