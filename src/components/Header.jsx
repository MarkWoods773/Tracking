import { useContext } from 'react'
import UserIcon from '../assets/user-login-icon.svg'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
const Header = ({ title }) => {
    const { user, setUser } = useContext(DataContext);
    return (
        <div className='container '>
            <div className='p-4 d-flex justify-content-between align-items-center'>
                <img className='iconLogo ' src={import.meta.env.VITE_SUBDOMAIN+Logo} alt="Hayduk" />
                {user=="Login"?
                <Link to='/Login' className="login align-items-center d-flex gap-2 text-decoration-none">
                    <img className='iconLogin ' src={import.meta.env.VITE_SUBDOMAIN+UserIcon} alt="Hayduk" />
                    <span className='userName'>{user}</span>
                </Link>
                :
                <div class="nav-item dropdown align-items-center d-flex gap-2">
                        <img className='iconLogin ' src={import.meta.env.VITE_SUBDOMAIN+UserIcon} alt="Hayduk" />
                        <div className="userName">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
                                {user}
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" onClick={(e)=>{setUser("Login")}}>Logout</a></li>
                            </ul>
                        </div>
                </div>
                }
            </div>
            <h1 className=" text-center textoPrimary py-2">
                {title || 'Tracking'}
            </h1>
        </div>
    )
}

export default Header