
const getPedidoReference = (codigo,reference) => {
    const option={method:'GET'}
    return fetch(`${import.meta.env.VITE_API}/${codigo}/${reference}`,option)
    .then(res=>res.json())
    .then(res=>{return res})
    .catch(err=>{
        throw err
    })
}

export {getPedidoReference}
