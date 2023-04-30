import EditComponent from "./EditComponent";

export default function MessageList({ message, saveEditChanges, editValues,deleteMessage,handleEdit }) {
    return (
        <>
            <h1 className="text-center">
                list of Messages</h1>

            <ul className="list-group">
                {
                    message.length === 0 && "No messages found "
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
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={
                                        () => handleEdit(el)
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


            <EditComponent saveEditChanges={saveEditChanges} editValues={editValues}  />


        </>
    )
}
