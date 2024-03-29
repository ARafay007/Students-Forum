import React, { useState, useEffect } from "react";
import Select from 'react-select';
import CitiesList from '../actions/cityAction';
import ErrorPopup from '../components/errorPopup';
import CheckValidation from '../errorValidation/checkValidation';

const UpdatePopup = props => {
    const [state, setState] = useState(props.obj);
    const [citiesList, setCitiesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    let fieldsArray = [];

    useEffect(() => {
        fetchCities();
    }, []);

    const salaryTypeOptions = [
        {value: 'fixed', label: 'Fixed'},
        {value: 'percentage', label: 'Percentage'},
        {value: 'perStudent', label: 'Per Student'}
    ]
    
    const onStateChange = (key, e) => {
        if(key === 'Is Active') 
            setState(prevState => ({...prevState, [key]: e.target.checked}));
        else if(key === 'Salary Type' || key === 'City')
            setState(prevState => ({...prevState, [key]: e.value}));
        else 
            setState(prevState => ({...prevState, [key]: e.target.value}));
    };

    const fetchCities = async () => {
        const list = await CitiesList();
        if(list)
            setCitiesList(list.map(el => ({value: el, label: el})));
    };

    const createFields = () => {
        fieldsArray = [];
        for(let obj in state){

            if(obj === 'City'){
                fieldsArray.push(
                    <div key={obj}>
                        <label>{obj}</label><br />
                        <Select options={citiesList} 
                                className="selectFields" 
                                onChange={e => onStateChange(obj, e)} 
                                value={citiesList.value} 
                                defaultValue={{label: state[obj], value: state[obj]}} />
                    </div>
                );
            }
            else if(obj === "Salary Type"){
                fieldsArray.push(
                    <div key={obj}>
                        <label>{obj}</label><br />
                        <Select options={salaryTypeOptions} 
                                className="selectFields" 
                                onChange={e => onStateChange(obj, e)}
                                value={salaryTypeOptions.value} 
                                defaultValue={{label: state[obj], value: state[obj]}} />
                    </div>
                );
            }
            else if(obj === 'Is Active'){
                fieldsArray.push(
                    <div key={obj}>
                        <label>Is Active:</label>
                        <input type='checkbox' checked={state[obj]} onChange={e => onStateChange(obj, e)} className="checkBoxField" />
                    </div>);
            }
            else if(obj === 'Gender'){
                fieldsArray.push(
                    <div key={obj}>
                        <label>Gender</label><br />
                            <label htmlFor="male" >Male</label> 
                            <input type='radio' id="male" value='male' checked={state[obj] === 'male' ? true : false} className="radioButtonField" onChange={e => onStateChange(obj, e)} name='gender'/>

                            <label htmlFor="female" className="labelFemale">Female</label> 
                            <input type='radio' id="female" value='female' checked={state[obj] === 'female' ? true : false} className="radioButtonField" onChange={e => onStateChange(obj, e)} name='gender' />
                    </div>
                )
            }
            else if(obj !== '_id'){
                fieldsArray.push(
                    <div key={obj}>
                        <label>{obj}</label><br />
                        <input placeholder="Enter your name" value={state[obj]} onChange={e => onStateChange(obj, e)} className="textField updateTextFields" />
                    </div>
                );
            }
        }
        return fieldsArray;
    };

    const checkValidation = (openErrorPopup = false, backendError = false, errorMsg) => {
        const {returnValue, openPopup, msg} = CheckValidation(openErrorPopup, backendError, state, errorMsg);
        setShowErrorPopup(openPopup);
        setErrorMsg(msg);
        return returnValue;
    };

    const confirmUpdate = (obj={}, confirm=false) => {
        if(checkValidation(true, false, 'Please fill the required fields!!'))
            props.update(obj, confirm);
        else if(!confirm)
            props.update(obj, confirm);
    };

    const removeUpdatePopup = () => {
        confirmUpdate();
    };

    return (
        <div className="updatePopup" onClick={removeUpdatePopup}>
            {showErrorPopup && <ErrorPopup errorMsg={errorMsg} errorFunction={checkValidation} />}
            <div className="updatePopup__container">
                <div>
                    <h3>Update Subject</h3>
                </div>
                {createFields()}
                <div className='updatePopup__container--lastDiv'>
                    <button className='button button__yes' onClick={() => confirmUpdate(state, true)}>Yes</button>
                    <button className='button button__delete' onClick={confirmUpdate}>No</button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePopup;