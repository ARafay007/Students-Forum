import {Link} from 'react-router-dom';

const SideMenu = props => {
    return (
        <div className={props.sideMenu}>
            <div></div>
            <div><Link to='/'>Student</Link></div>
            <div><Link to='/teacher'>Teacher</Link></div>
            <div><Link to='/subject'>Subject</Link></div>
            <div><Link to='/employee'>Employee</Link></div>
            <div><Link to='/admin'>Admin</Link></div>
        </div>
    );
};

export default SideMenu;
