import { useContext, useState, useEffect, useRef } from 'react'
import DataContext from '../context/DataContext'
import { MdModeEditOutline } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import ObservationModal from './ObservationModal'
import { AddPhaseModal } from './AddPhaseModal'
import { editPhase } from '../services/editPhase'
import { dateFormat,dateFormatInputDate} from '../utils/dateFormat'
const TableResponse = ({ data, setData }) => {
    const { user, setuser } = useContext(DataContext)
    const [datos, setDatos] = useState({})
    const [phase, setPhase] = useState({})
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('')
    const [tons, setTons] = useState('')
    const [obs, setObs] = useState('')
    const refDate=useRef(null)
    const refStatus=useRef(null)
    const refTons=useRef(null)
    const refObs=useRef(null)
    // const [status,setStatus ]= useState('')
    // const [date,setDate ]= useState('')
    // const [datos,setDatos ]= useState(Data)
    const savePhase = (pedidoId,id, Date,
        ) => {
        editPhase(pedidoId,id, refDate.current.value,
            refStatus.current.value,
            refTons.current.value,
            refObs.current.value)
            .then(res => {
                setData(res)
                console.log(res)
            })
            .catch(err => { console.error(err) })
        
        // setDatos(newState)
        // console.log(Data)
    }
    return (
        <div className='container'>
            {data.trackerPedidosFases &&
                <div className='mt-4'>
                    {(data.trackerPedidosFases.length != 4 && user != "Login") ?
                        <div className="mt-5 text-end">
                            <span className='addPhase' data-bs-toggle="modal"
                                data-bs-target="#addPhase">+ Add Phase</span>
                        </div>
                        : null
                    }
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Phase</th>
                                <th scope="col">Tons</th>
                                <th scope="col">Obs</th>
                                {user != 'Login' &&
                                    <th className='text-center' scope="col">
                                        Options
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.trackerPedidosFases.map((row, key) => {
                                const { id, fechaProgramada,
                                    statusTracker,
                                    fase,
                                    toneladas,
                                    observaciones } = row
                                    
                                return (
                                    <tr key={key}>
                                        <td>{dateFormat(fechaProgramada)}</td>
                                        <td>{statusTracker}</td>
                                        <td>{fase}</td>
                                        <td>{toneladas===0?'':toneladas}</td>
                                        <td>
                                            <AiOutlineEye
                                                className='iconEye iconClick'
                                                data-bs-toggle="modal"
                                                data-bs-target={`#viewObs${key}`}
                                            >
                                            </AiOutlineEye>
                                            <ObservationModal Id={key} Obs={observaciones} fase={fase}></ObservationModal>
                                        </td>
                                        {user != 'Login' &&
                                            <td className='text-center' scope="col">
                                                <MdModeEditOutline
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#editPhase${key}`}
                                                    className='iconEdit'>
                                                </MdModeEditOutline>
                                                <div className="modal fade" id={`editPhase${key}`} tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="exampleModalCenterTitle">Edition of {fase}</h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="form-floating mb-2">
                                                                    <input type="date" className="form-control" id="floatingInput" ref={refDate}  value={date||dateFormatInputDate(fechaProgramada)}  onChange={(e) => { setDate(e.target.value) }} />
                                                                    <label htmlFor="floatingInput">Date</label>
                                                                </div>
                                                                <div className="form-floating mb-2">
                                                                    <select className="form-select" name="referenceType" id="status" ref={refStatus} onChange={(e) => { setStatus(e.target.value) }} value={status||statusTracker}>
                                                                        <option value="Programmed">Programed</option>
                                                                        <option value="Executed">Executed</option>
                                                                    </select>
                                                                    <label htmlFor="status">Status</label>
                                                                </div>
                                                                <div className="form-floating mb-2">
                                                                    <input onChange={(e) => { setTons(e.target.value) }} type="number" ref={refTons} className="form-control" id="tons" value={tons||toneladas} />
                                                                    <label htmlFor="floatingInput">Tons</label>
                                                                </div>
                                                                <div className="form-floating">
                                                                    <textarea onChange={(e) => { setObs(e.target.value) }} ref={refObs} className="form-control textObs" id="Motivo" defaultValue={obs||observaciones}></textarea>
                                                                    <label htmlFor="floatingTextarea">Observation</label>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => {
                                                                    savePhase(data.id,id)
                                                                }}>Save</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            }
            {data.status == 500 &&
                <h1 className='text-center mt-5 text-warning'>{data.message}</h1>
            }
            <AddPhaseModal pedido={data} setPedido={setData} data={data.trackerPedidosFases} phase={phase} setPhase={setPhase}></AddPhaseModal>
        </div>
    )
}

export default TableResponse