import React, { useEffect, useRef } from 'react'
import {getPedidoReference } from '../services/getPedidoReference'
import { addPhase } from '../services/addPhase'
import { Loading } from 'notiflix/build/notiflix-loading-aio'
import { Report} from 'notiflix/build/notiflix-report-aio'
const AddPhaseModal = ({ id, pedido, setPedido, phase, setPhase }) => {
    const refDate = useRef(null)
    const refStatus = useRef(null)
    const refPhase = useRef(null)
    const refTons = useRef(null)
    const refObs = useRef(null)
    const phases = ["Plan Dispatch",
        "Container Filing",
        "Ship Arrival",
        "Container Load"]
        const phasesEnd = ["Plan Dispatch",
        "Container Filing",
        "Ship Arrival",
        "Container Load"]
    console.log(pedido)
    if (pedido.trackerPedidosFases) {
        pedido.trackerPedidosFases.forEach((Phase) => {
            for (let index = 0; index < phases.length; index++) {
                if (Phase.fase == phases[index]) {
                    const indexTrue = phasesEnd.indexOf(phases[index]);
                    phasesEnd.splice(indexTrue, 1);
                }
            }
            
        })
    }
    const savePhase = (
    ) => {
        Loading.hourglass()
        let Date = refDate.current.value
        let Status = refStatus.current.value
        let Phase = refPhase.current.value
        let Tons = refTons.current.value
        let Obs = refObs.current.value

        addPhase(pedido.id, Date,
            Status,
            Phase,
            Tons,
            Obs)
            .then(res => {
                getPedidoReference(res.hdkReference,"hdk_ref")
                    .then(res => {
                        refDate.current.value=''
                        refStatus.current.value=''
                        refPhase.current.value=''
                        refTons.current.value=''
                        refObs.current.value=''
                        setPedido(res)
                        Loading.remove()
                        
                    })
                    .catch(err => {
                        console.error(err)
                        Loading.remove()
                    })
                console.log(res)
            })
            .catch(err=>{
                Report.failure('Error',"Ha pasado un error",'Ok')
                Loading.remove()
            })
    }
    return (
        <div className="modal fade" id="addPhase" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalCenterTitle">Add Phase</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-2">
                            <input ref={refDate} type="date" className="form-control" id="floatingInput" />
                            <label htmlFor="floatingInput">Date</label>
                        </div>
                        <div className="form-floating mb-2">
                            <select ref={refStatus} className="form-select" name="referenceType" id="status">
                                <option value="Programed">Programed</option>
                                <option value="Executed">Executed</option>
                            </select>
                            <label htmlFor="status">Status</label>
                        </div>
                        <div className="form-floating mb-2">
                            <select ref={refPhase} className="form-select" name="phase" id="phase">
                                {phasesEnd.map((fase, key) => {
                                    return <option key={key} value={fase}>{fase}</option>
                                })}
                            </select>
                            <label htmlFor="status">Phase</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input ref={refTons} type="number" className="form-control" id="floatingInput" />
                            <label htmlFor="floatingInput">Tons</label>
                        </div>
                        <div className="form-floating mb-2">
                            <textarea ref={refObs} cols="30" rows="10" type="text" className="form-control textObs" id="floatingInput"></textarea>
                            <label htmlFor="floatingInput">Obs</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={savePhase}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AddPhaseModal }