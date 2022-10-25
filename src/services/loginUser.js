const  loginUser = (userName,password) => {
    
    
    const options={
        method:'POST',
        body:JSON.stringify({
            userName:userName,
            password:password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return fetch(import.meta.env.VITE_API_USER,options)
    .then(res=>res.json())
    .then(res=>{return res})
    .catch(err=>{ throw err})
}
export {loginUser}