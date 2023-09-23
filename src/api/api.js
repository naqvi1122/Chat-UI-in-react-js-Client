import axios from 'axios'



export const LoginUser = async (email,password) => {
	let response = []

	// console.log(_token)
	// const config = {
	// 	headers: { authorization: `bearer ${_token}` }
	// }
	await axios
		.post('http://localhost:8080/chat_app/user/login',{email,password})
		.then((res) => {
			response = res?.data
		})
		.catch((error) => {
			console.error(error)
		})
	return response
}


export const CreteChatWithUser = async (other_user) => {
	let response = []

	const _token = localStorage.getItem('authorization')
	console.log(_token)
	const config = {
		headers: { authorization: `bearer ${_token}` }
	}
	await axios
		.post('http://localhost:8080/chat_app/user/create_chat',{other_user},config)
		.then((res) => {
			response = res?.data
		})
		.catch((error) => {
			console.error(error)
		})
	return response
}

export const getAllUSerList = async () => {
	let response = []

	const _token = localStorage.getItem('authorization')
	console.log(_token)
	const config = {
		headers: { authorization: `bearer ${_token}` }
	}
	await axios
		.get('http://localhost:8080/chat_app/user/list_of_all_user',config)
		.then((res) => {
			response = res?.data
		})
		.catch((error) => {
			console.error(error)
		})
	return response
}

export const joinRoomId = async () => {
	let response = []

	const _token = localStorage.getItem('authorization')
	console.log(_token)
	const config = {
		headers: { authorization: `bearer ${_token}` }
	}
	await axios
		.get('http://localhost:8080/chat_app/user/list_of_all_user',config)
		.then((res) => {
			response = res?.data
		})
		.catch((error) => {
			console.error(error)
		})
	return response
}


export const getAllMsgOfBothUser = async (room) => {
	let response = []

	const _token = localStorage.getItem('authorization')
	console.log(_token)
	const config = {
		headers: { authorization: `bearer ${_token}` }
	}
	await axios
		.post('http://localhost:8080/chat_app/user/get_all_msg_of_both_user',{chat_id:room},config)
		.then((res) => {
			response = res?.data
		})
		.catch((error) => {
			console.error(error)
		})
	return response
}
