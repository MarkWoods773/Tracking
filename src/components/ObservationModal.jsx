import React from 'react'

const ObservationModal = ({Obs,Id,fase}) => {
    return (
        <div className="modal fade" id={`viewObs${Id}`} tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalCenterTitle">Observaciones de {fase}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating">
                            <textarea value={Obs} readOnly className="textObs form-control" id="Motivo">
                            </textarea>
                            <label htmlFor="floatingTextarea">Observation</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObservationModal 