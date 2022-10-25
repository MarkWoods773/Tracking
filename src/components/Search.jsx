import React, { useRef } from 'react'
import { getPedidoReference } from '../services/getPedidoReference'
import {Loading} from 'notiflix/build/notiflix-loading-aio'
const Search = ({data,setData}) => {
    const referenceType=useRef(null)
    const codigoRef = useRef(null)
    const onSearchPedido=()=>{
        Loading.hourglass();
        console.log(codigoRef.current.value,referenceType.current.value)
        getPedidoReference(codigoRef.current.value,referenceType.current.value)
        .then(res=>{
            setData(res)
            console.log(res)
            Loading.remove()
        })
        .catch(err=>{
            console.error(err) 
            Loading.remove()
        })
    }
    return (
        <div className='d-flex justify-content-center gap-2'>
            <div className="col-auto">
                <select ref={referenceType} className="form-select" name="referenceType" id="referenceType">
                    <option value="hdk_ref">Hayduk Reference</option>
                    <option value="cli_ref">Client Reference</option>
                </select>
            </div>
            <div className="col-auto">
                <input ref={codigoRef} className='form-control' type="text" name="reference" id="reference" />
            </div>
            <button onClick={onSearchPedido} className="btn btn-success">
                Search
            </button>
        </div>
    )
}

export default Search