import { useEffect, useState } from "react";
import EditComponent from "./EditComponent";
import axios from "axios";

export default function MessageList({ message, deleteMessage, setError, setSuccess, setSuccessMessage, setErrorMessage, }) {
    const [val, setVal] = useState({});
    const [editId, setEditId] = useState(0)


    const editFunc = (e) => {
        const { id } = e.target;
        setEditId(+id)
        const data = message.find((item) => item.id === Number(id));
        setVal(data);
    }


    async function saveEditChanges(e) {

        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3000/messages/${editId
                }`, val);
            if (response.data.code === 1) {
                setSuccessMessage(response.data.message)
                return setSuccess(true);
            }

            if (response.data.code === 3) {
                setErrorMessage(response.data.message)
                return setError(true);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }
    return (
        <>
            <h1 className="text-center">
                list of Messages</h1>

            <ul className="list-group">
                {
                    message.length === 0 && (<span className="alert alert-primary mt-2 w-50 text-center mx-auto" role="alert">
                        No messages found </span>)
                }
                {
                    message.map((el) => (
                        <>
                            <li className="text-center mx-auto list-group-item w-50"
                                key={el.id}>
                                {
                                    el.email
                                }
                                | {
                                    el.message
                                }
                                <button id={el.id} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={
                                        (el) => editFunc(el)
                                    }>
                                    Edit
                                </button>

                                <button className="btn btn-danger"
                                    onClick={
                                        () => deleteMessage(el.id)
                                    }>
                                    Delete
                                </button>
                            </li>
                        </>
                    ))
                } </ul>

            <EditComponent saveEditChanges={saveEditChanges} editValues={val} setVal={setVal} />
        </>
    )
}
