import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import DataContext from '../context/DataContext';
import { loginUser } from '../services/loginUser';
import {Loading} from 'notiflix/build/notiflix-loading-aio'
import {Report} from 'notiflix/build/notiflix-report-aio'
const Login = () => {
    //reference field username and password
    const refUserName=useRef(null)
    const refPassword=useRef(null)

    const { user, setUser } = useContext(DataContext)
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const onChangeUser = (e) => {

        setEmail(e.target.value)

        // console.log(e.target.value)
    }
    const validateUser=()=>{
        Loading.hourglass();
        loginUser(refUserName.current.value,refPassword.current.value)
        .then(res=>{
            console.log(res)
            Loading.remove()
            if(res.message=="Ok"){
                setUser(email); 
                navigate(import.meta.env.VITE_HOST)
            }
            else{
                Report.failure(
                    'Error',
                    'El usuario o la contraseña es incorrecta',
                    'Ok',
                );;
            }
            
        })
        .catch(err=>{
            Report.failure('Error','Ha pasado un error en el servidor','Ok')
            Loading.remove()
        })
    }
    return (
        <>
            <Header title="Login"></Header>
            <div className="form-signin w-100 m-auto pt-4">
                <div className="form-floating mb-2">
                    <input ref={refUserName} type="email" className="form-control" id="floatingInput" placeholder="NameUser@hayduk.com.pe" onChange={onChangeUser} />
                    <label htmlFor="floatingInput">User</label>
                </div>
                <div className="form-floating">
                    <input ref={refPassword} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-flex gap-2 mt-4 justify-content-center">
                    <button className="btn btn-primary" onClick={validateUser}>Login</button>
                    <button className="btn btn-danger" type="submit">Cancel</button>
                </div>
            </div>
        </>
    )
}

export default Login

// () => { setUser(email); navigate(import.meta.env.VITE_HOST) }