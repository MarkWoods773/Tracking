const addPhase = (id,Date,
    Status,
    Phase,
    Tons,
    Obs) => {
    const phase = {       
        id: 0,
        pedidoId: id,
        fase: Phase,
        fechaProgramada: Date,
        fechaEjecutada: "1900-01-01",
        toneladas: Tons,
        observaciones: Obs,
        statusTracker: Status,
        pedido: {
        }
    }
    const options = {
        method: 'PUT',
        body: JSON.stringify(phase),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(import.meta.env.VITE_API, options)
        .then(res => res.json())
        .then(res => { return res })
        .catch(err => { throw err })
}

export { addPhase }