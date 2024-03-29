import React from 'react';

import {Link} from 'react-router-dom';

const SideMenu = props => {
    const onClickDiv = e => {
        const element = e.target.firstElementChild;
        
        if(element && element.tagName === 'UL'){
            if(element.className === 'sideMenu__ul--expand'){
                element.classList.add('sideMenu__ul--collapse');
                element.classList.remove('sideMenu__ul--expand');
            }
            else{
                element.classList.remove('sideMenu__ul--collapse');
                element.classList.add('sideMenu__ul--expand');
            }
        }
    }

    return (
        <div className={props.sideMenu}>
            <div></div>
            <div className='sideMenu__LinksHolderDiv' onClick={onClickDiv}>
                <div><Link to='/'>Student</Link></div>
                <div><Link to='/teacher'>Teacher</Link></div>
                <div className='sideMenu__LinksHolderDiv'>
                    Subject
                    <ul className='sideMenu__ul--collapse'>
                        <li>
                            <Link to='/subject'>Add Subject</Link>
                        </li>
                        <li>Assign Course</li>
                    </ul>
                </div>
                <div><Link to='/employee'>Employee</Link></div>
                <div><Link to='/admin'>Admin</Link></div>
            </div>
        </div>
    );
};

export default SideMenu;
