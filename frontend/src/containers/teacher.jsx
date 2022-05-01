import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import CitiesList from '../actions/cityAction';
import { teacherPOST, teacherGET, teacherDELETE, teacherPATCH } from '../actions/teacherAction';
import UpdatePopup from '../components/updatePopup';
import DeletePopup from '../components/deletePopup';
import ErrorPopup from '../components/errorPopup';
import CheckValidation from '../errorValidation/checkValidation';

const Teacher = () => {
    const [teacherObj, setTeacherObj] = useStateIfMounted({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        address: '',
        email: '',
        city: '',
        img: null,
        salary: 0,
        salaryType: '',
        isActive: false,
        createdBy: '',
        createdAt: Date.now(),
        updatedBy: '',
        updatedAt: Date.now()
    });
    const [id, setId] = useState(0);
    const [citiesList, setCitiesList] = useState([]);
    const [deleteTeacherObj, setDeleteTeacherObj] = useState({});
    const [updateTeacherObj, setUpdateTeacherObj] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const teachersList = useSelector(state => state.TeacherReducer.arrayObj);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(teacherGET());
        fetchCities();
    }, []);

    useEffect(() => { }, [showErrorPopup]);

    const fetchCities = async () => {
        const list = await CitiesList();
        if (list)
            setCitiesList(list.map(el => ({ value: el, label: el })));
    };

    const salaryTypeOptions = [
        { value: 'fixed', label: 'Fixed' },
        { value: 'percentage', label: 'Percentage' },
        { value: 'perStudent', label: 'Per Student' }
    ]

    const showTeacherList = () => {
        return teachersList.map(el => (
            <tr className="tr" key={el._id}>
                <td className='td'>{el.firstName}</td>
                <td className='td'>{el.lastName}</td>
                <td className='td'>{el.phone}</td>
                <td className='td'>{el.address}</td>
                <td className='td'>{el.email}</td>
                <td className='td'>{el.city}</td>
                <td className='td'>{el.salary}</td>
                <td className='td'>{el.salaryType}</td>
                <td className='td'>{el.gender}</td>
                <td className='td'>{el.isActive ? 'Yes' : 'No'}</td>
                <td className='td'>{el.createdBy}</td>
                <td className='td'>{el.uploadedBy}</td>
                <td className='td'>
                    <div>
                        <button title='Edit' className='button__tableAction' onClick={() => updateTeacher(el, false, true)}>
                            <img src='./edit.png' alt='Edit Icon' className='table__action--icons' />
                        </button>
                        <button title='Delete' className='button__tableAction' onClick={() => deleteTeacher(el, false, true)}>
                            <img src='./delete.png' alt='Delete Icon' className='table__action--icons' />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    const updateTeacher = async (obj, sureUpdateIt, openUpdatePopup = false) => {
        setUpdateTeacherObj({
            _id: obj._id,
            Teacher: obj.firstName,
            "Last Name": obj.lastName,
            Phone: obj.phone,
            Address: obj.address,
            Email: obj.email,
            City: obj.city,
            Salary: obj.salary,
            "Salary Type": obj.salaryType,
            "Is Active": obj.isActive,
            Gender: obj.gender,
        });

        if (sureUpdateIt && obj) {
            const errorMsg = await dispatch(teacherPATCH({
                _id: obj._id,
                firstName: obj.Teacher,
                lastName: obj['Last Name'],
                phone: obj.Phone,
                address: obj.Address,
                email: obj.Email,
                city: obj.City,
                salary: obj.Salary,
                salaryType: obj['Salary Type'],
                isActive: obj['Is Active'],
                gender: obj.Gender,
                updatedBy: 'annonymouse'
            }));

            if (errorMsg) {
                checkValidation(false, true, errorMsg);
                openUpdatePopup = true;
            }
        }

        setShowUpdatePopup(openUpdatePopup);
    };

    const deleteTeacher = (obj, sureDeleteIt, openDeletePopup) => {
        setId(obj._id);

        setDeleteTeacherObj({
            _id: obj._id,
            Teacher: obj.firstName,
            "Last Name": obj.lastName,
            Phone: obj.phone,
            Address: obj.Address,
            Email: obj.email,
            City: obj.city,
            Salary: obj.salary,
            "Salary Type": obj.salaryType,
            Gender: obj.gender,
            "Created By": obj.createdBy,
            "Updated By": obj.uploadedBy
        });

        setDeletePopup(openDeletePopup);
        if (sureDeleteIt && obj._id !== 0) dispatch(teacherDELETE(id));
    };

    const onFieldsChange = (fieldName, e) => {
        if (fieldName === 'salaryType' || fieldName === 'city')
            setTeacherObj(prevState => ({ ...prevState, [fieldName]: e.value }));
        else if (fieldName === 'isActive')
            setTeacherObj(prevState => ({ ...prevState, [fieldName]: e.target.checked }));
        else if (fieldName === 'img') {
            const extension = e.target.value.slice(-3);

            if (extension === 'jpg' || extension === 'png') {

                const size = Math.round((e.target.files[0].size / 1024) / 1024);

                if (size <= 2)
                    setTeacherObj(prevState => ({ ...prevState, [fieldName]: e.target.files[0] }));
                else
                    checkValidation(false, true, 'file size is larger than 2MB'); //console.log('file size is larger than 2MB');
            }
            else
            checkValidation(false, true, 'This file is not supported'); //console.log('this file is not supported.')
        }
        else
            setTeacherObj(prevState => ({ ...prevState, [fieldName]: e.target.value }));
    };

    const checkValidation = (openErrorPopup = false, backendError = false, errorMsg) => {
        const { returnValue, openPopup, msg } = CheckValidation(openErrorPopup, backendError, teacherObj, errorMsg);

        setErrorMsg(msg);
        setShowErrorPopup(openPopup);
        return returnValue;
    };

    const onHandleSubmit = e => {
        e.preventDefault();

        teacherObj.createdBy = 'Admin';
        const formData = new FormData();

        formData.append("myFile", teacherObj.img);
        delete teacherObj.img;
        formData.append('teacherInfo', JSON.stringify(teacherObj))

        dispatch(teacherPOST(formData));
    }

    return (
        <div className='teacher'>
            {showUpdatePopup && <UpdatePopup update={updateTeacher} obj={updateTeacherObj} />}
            {deletePopup && <DeletePopup delete={deleteTeacher} obj={deleteTeacherObj} />}
            {showErrorPopup && <ErrorPopup errorMsg={errorMsg} errorFunction={checkValidation} />}
            <div className="teacher__entry">
                <h2>ADD TEACHER</h2>
                <form onSubmit={e => onHandleSubmit(e)} className="teacher__entry--colContainer">
                    <div className='teacher__col'>
                        <div>
                            <label>Name *</label><br />
                            <input placeholder="Enter your name" value={teacherObj.firstName} onChange={e => onFieldsChange('firstName', e)} className="textField updateTextFields" />
                        </div>
                        <div>
                            <label>Last Name *</label><br />
                            <input placeholder="Enter your last name" value={teacherObj.lastName} onChange={e => onFieldsChange('lastName', e)} className="textField updateTextFields" />
                        </div>
                        <div>
                            <label>Phone *</label><br />
                            <input maxLength='11' placeholder="Enter your phone" value={teacherObj.phone} onChange={e => onFieldsChange('phone', e)} className="textField updateTextFields" />
                        </div>
                        <div>
                            <label>Is Active:</label>
                            <input type='checkbox' value={teacherObj.isActive} onChange={e => onFieldsChange('isActive', e)} className="checkBoxField" />
                        </div>
                        <div className='teacher__entry--addButton'>
                            <input type='submit' value='Add Teacher' className='button button__add' />
                        </div>
                    </div>
                    <div className='teacher__col'>
                        <div>
                            <label>Address *</label><br />
                            <input placeholder="Enter your address" value={teacherObj.address} onChange={e => onFieldsChange('address', e)} className="textField updateTextFields" />
                        </div>
                        <div>
                            <label>Email *</label><br />
                            <input type='email' placeholder="Enter your email" value={teacherObj.email} onChange={e => onFieldsChange('email', e)} className="textField updateTextFields" />
                        </div>
                        <div>
                            <label>City *</label><br />
                            <Select value={citiesList.value} options={citiesList} className="selectFields" onChange={e => onFieldsChange('city', e)} />
                        </div>
                        <div>
                            <label className="button button__upload">
                                <img src='./upload.png' alt='upload Icon' style={{ width: '15px' }} /> &nbsp;
                                Upload Image
                                <input type="file" onChange={e => onFieldsChange('img', e)} accept="image/png, image/jpeg" hidden />
                            </label>
                        </div>
                    </div>
                    <div className='teacher__col'>
                        <div>
                            <label>Salary *</label><br />
                            <input placeholder="Enter your salary" value={teacherObj.salary} onChange={e => onFieldsChange('salary', e)} className="textField updateTextFields" />
                        </div>
                        <div>
                            <label>Salary Type *</label><br />
                            <Select value={salaryTypeOptions.value} options={salaryTypeOptions} className="selectFields" onChange={e => onFieldsChange('salaryType', e)} />
                        </div>
                        <div>
                            <label>Gender *</label><br />
                            <label htmlFor="male" >Male</label>
                            <input type='radio' id="male" value='male' className="radioButtonField" onChange={e => onFieldsChange('gender', e)} name='gender' />

                            <label htmlFor="female" className="labelFemale">Female</label>
                            <input type='radio' id="female" value='female' className="radioButtonField" onChange={e => onFieldsChange('gender', e)} name='gender' />
                        </div>
                    </div>
                </form>
            </div>
            {!teachersList ? <p>No Data</p> :
                <div className='teacher__tableDiv'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='th'>Teacher</th>
                                <th className='th'>Last Name</th>
                                <th className='th'>Phone</th>
                                <th className='th'>Address</th>
                                <th className='th'>Email</th>
                                <th className='th'>City</th>
                                <th className='th'>Salary</th>
                                <th className='th'>Salary Type</th>
                                <th className='th'>Gender</th>
                                <th className='th'>Active</th>
                                <th className='th'>Created By</th>
                                <th className='th'>Updated By</th>
                                <th className='th'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showTeacherList()}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
};

export default Teacher;