import { useEffect, useState } from "react";
import axios from "axios";
import MessageList from "./components/MessageList";

export default function App() {
	const [formValues, setFormValues] = useState({ email: "", message: "" });
	const [message, setMessage] = useState([]);
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [formError, setFormError] = useState(false)


	async function handleSubmit(event) {
		try {
			event.preventDefault();
			if ((formValues.email && formValues.message) == "") {
				setError(true)
				setFormError(true)
				setErrorMessage("Please fill all inputs")
				return
			}

			let response = await axios.post('http://localhost:3000/messages', formValues)

			if (response.data.code == 1) {
				setSuccessMessage(response.data.message)
				setFormValues({ email: "", message: "" });
				return setSuccess(true)
			}

			if (response.data.code == 3) {
				setErrorMessage(response.data.message)
				return setError(true)
			}

		} catch (error) {
			return setErrorMessage(error.message)
		}

	}


	async function fetchMessages() {
		try {
			let response = await axios.get('http://localhost:3000/messages')
			setMessage(response.data)

		} catch (error) {
			console.log(error)
		}

	}


	async function deleteMessage(id) {
		try {
			if (confirm("Do you want to delete this ?")) {
				const response = await axios.delete(`http://localhost:3000/messages/${id}`);

				if (response.data.code === 1) {
					setSuccessMessage(response.data.message);
					return setSuccess(true)
				} else if (response.data.code === 3) {
					setError(response.data.message);
				}
			}
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	}


	async function getSingleMessage(id) {
		try {
			let response = await axios.get(`http://localhost:3000/messages/${id}`)

			console.log(response.data)
		} catch (error) { }
	}

	useEffect(() => {
		fetchMessages()
	}, [])


	return (
		<>

			<div className="card w-50 mx-auto mt-5 mb-1">

				{
					success && (
						<span className="alert alert-success mt-2 w-75 text-center mx-auto" role="alert">
							{successMessage} </span>
					)
				}

				{
					error && (
						<span className="alert alert-danger mt-2 w-75 text-center mx-auto" role="alert">
							{errorMessage}.
						</span>
					)
				}


				<h2 className="text-center mt-2">
					Testing
				</h2>
				<form className="mt-4 text-center"
					onSubmit={handleSubmit}>
					<div className="mb-3 mx-auto  w-75">
						<label className="form-label">Email
						</label>
						<br /> {
							formError && formValues.email === '' && (
								<small className="text-danger mb-2">Phonenumber is required!</small>
							)
						}
						<input type="email" name="email" className="form-control " placeholder="name@example.com"
							value={
								formValues.email
							}
							onChange={
								(event) => setFormValues({
									...formValues,
									email: event.target.value
								})
							} />


						<label className="form-label mt-2">Message</label>
						<textarea className="form-control mx-auto w-75" rows="3"
							value={
								formValues.message
							}
							onChange={
								(event) => setFormValues({
									...formValues,
									message: event.target.value
								})
							}></textarea>
						{
							formError && formValues.message == '' && (
								<small className="text-danger">
									Message is required</small>
							)
						} </div>
					<button type="submit" className="btn btn-primary mb-2">
						Submit
					</button>
				</form>


			</div>


			<MessageList message={message}
				deleteMessage={deleteMessage} setError={setError} setSuccess={setSuccess} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
		</>
	)
}
