import React, {useState, useEffect} from 'react';
import { Routes ,Route, Link, useNavigate } from "react-router-dom";
import jsCookie from 'js-cookie';
import Login from "./containers/login";
import SideMenu from "./components/sideMenu";
import ScreensDisplayer from "./components/screensDisplayer";
import SideMenuToggler from './components/sideMenuToggle';

const App = () => {
    const [openAndCloseSideMenu, setOpenAndCloseSideMenu] = useState({
        mainDiv: 'mainDiv',
        sideMenu: 'sideMenu'
    });
    const  [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setOpenAndCloseSideMenu(prevState => ({...prevState, mainDiv: `${toggle ? 'mainDiv' : 'mainDiv__sideMenu--collapse'}`,
                                                             sideMenu: `${toggle ? 'sideMenu' : 'sideMenu__collapse'}`}));
    }, [toggle]);

    const toggleSideMenu = checkToggle => {setToggle(checkToggle);}

    const isLoginSuccessful = () => {
        navigate('/student');
    };

    return(
        <>
            <Routes>
                <Route exact path='/' element={<Login isLoginSuccessful={isLoginSuccessful} />}/>
            </Routes> 
            {jsCookie.get('jwt') ? 
            <div className={openAndCloseSideMenu.mainDiv}>
                    <SideMenu sideMenu={openAndCloseSideMenu.sideMenu}/>
                <div className="mainDiv__screensHolder">
                    <SideMenuToggler toggleSideMenu={toggleSideMenu}/>
                    <ScreensDisplayer />
                </div>
            </div> :
            <h3 style={{margin: '10px'}}>You are not logged in! <Link to='/'>Please Login to continue</Link></h3>
            }
        </>
    );
}

export default App;