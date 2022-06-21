import React, {useState, useEffect} from "react";
import CryptoJS from 'crypto-js';
import ErrorPopup from "../components/errorPopup";
import CheckValidation from "../errorValidation/checkValidation";
import LoginAction from '../actions/loginAction';


const Login = (props) => {
    const [loginProp, setLoginProp] = useState({
        username: {value:'', required: true},
        password: {value:'', required: true}
    });
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {}, [errorMsg]);

    const onFieldsChange = (e, fieldName) => {
      setLoginProp(prevStats => ({...prevStats, [fieldName]: {value: e.target.value, required: true}}));
    };

    const checkValidation = (openErrorPopup = false, backendError = false, errorMsg = '') => {
        const {returnValue, openPopup, msg} = CheckValidation(openErrorPopup, backendError, loginProp, errorMsg);

        if(returnValue){
            return returnValue;
        }

        setShowErrorPopup(openPopup);
        setErrorMsg(msg);
        return returnValue;
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        if(checkValidation(true, false, 'Please fill the required fields!')){
            let cipherkey = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', charactersLength = characters.length;

            for(let i=0; i<5; i++){
                cipherkey += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            const cipherText = CryptoJS.AES.encrypt(loginProp.password.value, cipherkey).toString();
            const cipherTextWithKey = cipherkey.concat('', cipherText);
        
            const returnObj = await LoginAction({email: loginProp.username.value, password: cipherTextWithKey});

            if(returnObj.correctCredentials){
                props.isLoginSuccessful();
            }
            else if(!returnObj.returnValue){
                setErrorMsg(returnObj.msg);
                setShowErrorPopup(returnObj.openPopup);
            }
        }
    };

    return (
        <div className='formLogin'>
            {showErrorPopup && <ErrorPopup errorMsg={errorMsg} errorFunction={checkValidation} />}
            <form className='formLogin__body' onSubmit={onHandleSubmit}>
                <h2>Please Login</h2>
                <div className='formLogin__container'>
                    <div className="formLogin__control">
                        <input type='email' value={loginProp.username.value}  onChange={e => onFieldsChange(e, 'username')} />
                        <label className={`${!loginProp.username.value ? '' : 'formLogin__control--filled'}`}>Username <span style={{color: "black", fontSize: '15px'}}>*</span></label>
                    </div>
                    <div className="formLogin__control">
                        <input type='password' value={loginProp.password.value}  onChange={e => onFieldsChange(e, 'password')} />
                        <label className={`${!loginProp.password.value ? '' : 'formLogin__control--filled'}`}>Password <span style={{color: "black", fontSize: '15px'}}>*</span></label>
                    </div>
                    <div>
                        <input type='submit' className='button button__login' value='Login' />
                        {/* <p>Don't have an account? <a href='#'>Registery</a> </p> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;