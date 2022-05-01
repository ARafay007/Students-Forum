import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Subjects from '../containers/subject';
import Student from '../containers/student';
import Teacher from '../containers/teacher';

const ScreensDisplayer = () => {
    return(
        <div className={'screensDisplayer'}>
            <Routes>
                <Route exact path='/' element={<Student/>} />
                <Route path='/subject' element={<Subjects/>}/>
                <Route path='/teacher' element={<Teacher/>}/>
                <Route path='*' element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </div>
    );
};

export default ScreensDisplayer;