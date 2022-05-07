import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import DeletePopup from '../components/deletePopup';
import UpdatePopup from '../components/updatePopup';
import {subjectGET, subjectPOST, subjectPATCH, subjectDELETE} from '../actions/subjectAction';

const Subject = () => {
    const data = useSelector(state => state.SubjectReducer.arrayObj);
    const dispatch = useDispatch();
    const [deletePopup, setDeletePopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [updateStdObj, setUpdateStdObj] = useState({});
    const [deleteStdObj, setDeleteStdObj] = useState({});
    const [id, setId] = useState(0);
    let subjectName = undefined;
    
    useEffect(() => {
        dispatch(subjectGET());
    }, [id, deletePopup, updatePopup]);

    const showSubjects = () => {
        return data.map(obj => (
            <tr className='tr' key={obj._id}>
                <td className='td'>{obj.subjectName}</td>
                <td className='td'>{obj.isActive ? 'Yes' : 'No'}</td>
                <td className='td'>{obj.createdBy}</td>
                <td className='td'>{obj.updatedBy}</td>
                <td className='td'>
                    <div className='editAndDeleteIconDiv'>
                        <button title='Edit' className='button__tableAction' onClick={() => updateSubject(obj, false, true)}>
                            <img src='./edit.png' alt='Edit Icon' className='table__action--icons' />
                        </button>
                        <button title='Delete' className='button__tableAction' onClick={() => deleteSubject(obj, false, true)}>
                            <img src='./delete.png' alt='Delete Icon' className='table__action--icons' />
                        </button>
                    </div>
                </td>
            </tr>));
    };

    const onSubjectNameInput = e => {
        subjectName = e.target.value;
    }

    const onhandleSubmit = e => {
        e.preventDefault();

        if(subjectName){
            dispatch(subjectPOST({
                subjectName,
                isActive: true,
                createdBy: 'Admin',
                createdAt: Date.now()
            }));
        }
    };

    const updateSubject = (stdObj, sureUpdateIt, openUpdatePopup=false) => {
        const obj = {
            _id: stdObj._id,
            Subject: stdObj.subjectName,
            "Is Active": stdObj.isActive
        };

        setUpdatePopup(openUpdatePopup);
        setUpdateStdObj(obj);

        if(sureUpdateIt && stdObj){
            dispatch(subjectPATCH(stdObj._id, {
                subjectName: stdObj.Subject,
                isActive: stdObj['Is Active'],
                updatedBy: 'annonymouse',
                updatedAt: Date.now()
            }));
        }
    };

    const deleteSubject = (obj, sureDeleteIt, openDeletePopup=false) => {
        setId(obj._id);

        setDeleteStdObj({
            _id: obj._id,
            Subject: obj.subjectName,
            "Created By": obj.createdBy,
            "Updated By": obj.updatedBy
        });
        setDeletePopup(openDeletePopup);
        if(sureDeleteIt && obj._id !== 0) dispatch(subjectDELETE(id));
    };

    return (
        <div className={'subject'}>
        { updatePopup && <UpdatePopup update={updateSubject} obj={updateStdObj}/> }
        { deletePopup && <DeletePopup delete={deleteSubject} obj={deleteStdObj}/> }
            <div className={'subject__entry'}>
                <div><h2>ADD SUBJECT</h2></div>
                    <div className={'subject__entry--inputArea'}>
                <form onSubmit={e => onhandleSubmit(e)}>
                        <label className='labels'>Subject</label>
                        <div><input placeholder="Enter subject name" requried='true' onChange={e => onSubjectNameInput(e)} className={'textField'}/></div>
                        <div><input type='submit' value="Add" className={'button'} /></div>
                </form>
                    </div>
            </div>
            {
                (!data || data.length === 0) ? 'No Data' :
                <div className={'subject__table'}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='th'>Subject</th>
                                <th className='th'>Active</th>
                                <th className='th'>Created By</th>
                                <th className='th'>Updated By</th>
                                <th className='th'>Action</th>
                            </tr>
                        </thead>
                        <tbody>{showSubjects()}</tbody>
                    </table>
                </div>
            }
        </div>
    )
};

export default Subject;