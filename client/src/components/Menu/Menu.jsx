import reactLogo from '../../assets/react.svg'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useLocation } from 'wouter';
import './Menu.css';

function Menu () {
    const [location, setLocation] = useLocation();

    const handleLogOut = () => {
        signOut(auth);
    }

    return (
        <div className="menu">
            <div className="logoContainer" onClick={()=>(setLocation('/'))}>
                <img src={reactLogo} className="logo react" alt="React logo" />
            </div>
            <button onClick={handleLogOut} className="logOutButton">Logout</button>
        </div>
    );
}

export default Menu;