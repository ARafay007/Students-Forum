import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import SideMenu from "./components/sideMenu";
import ScreensDisplayer from "./components/screensDisplayer";
import SideMenuToggler from './components/sideMenuToggle';

const App = () => {
    const [openAndCloseSideMenu, setOpenAndCloseSideMenu] = useState({
        mainDiv: 'mainDiv',
        sideMenu: 'sideMenu'
    });
    const  [toggle, setToggle] = useState(true);

    useEffect(() => {
        setOpenAndCloseSideMenu(prevState => ({...prevState, mainDiv: `${toggle ? 'mainDiv' : 'mainDiv__sideMenu--collapse'}`,
                                                             sideMenu: `${toggle ? 'sideMenu' : 'sideMenu__collapse'}`}));
    }, [toggle]);

    const toggleSideMenu = checkToggle => {setToggle(checkToggle);}

    return(
        <Router>
            <div className={openAndCloseSideMenu.mainDiv}>
                    <SideMenu sideMenu={openAndCloseSideMenu.sideMenu}/>
                <div className="mainDiv__screensHolder">
                    <SideMenuToggler toggleSideMenu={toggleSideMenu}/>
                    <ScreensDisplayer />
                </div>
            </div>
        </Router>
    );
}

export default App;