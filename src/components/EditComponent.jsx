export default function EditComponent({saveEditChanges,editValues}) {
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center" id="exampleModalLabel"> Edit message </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="card  mx-auto mt-5 mb-1">
                            <form className="mt-4 text-center"
                                onSubmit={saveEditChanges}>
                                <div className="mb-3 mx-auto  w-75">
                                    <label className="form-label">Email
                                    </label>

                                    <input type="email" name="email" className="form-control " placeholder="name@example.com"
                                        value={
                                            editValues.email
                                        }
                                    />


                                    <label className="form-label mt-2">Message</label>
                                    <textarea className="form-control mx-auto w-75" rows="3"
                                        value={
                                            editValues.message
                                        }></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">
                                    Edit
                                </button>
                            </form>
                        </div>

                    </div>
                    {/* <div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div> */}
                </div>
            </div>
        </div>

    )
}
