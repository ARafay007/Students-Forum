import { useState, useEffect } from "react";

const SideMenuToggle = props => {
    const [toggle, setToggle] = useState(true);
    const [pic, setPic] = useState('./left-arrow.png');

    useEffect(() => {
        setPic (toggle ? `./left-arrow.png` : `./right-arrow.png`);
    }, [toggle]);

    const triggerToggle = () => {
        setToggle(toggle ? false : true);
        props.toggleSideMenu(toggle ? false : true);
    };

    return (
        <div className="sideMenu__toggler" onClick={triggerToggle}>
            <img src={pic} alt='left-arrow'/>
        </div>
    );
};

export default SideMenuToggle;