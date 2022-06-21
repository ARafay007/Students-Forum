import CheckValidation from '../errorValidation/checkValidation';
import jsCookie from 'js-cookie';
const URL = "http://localhost:3001/api";

const LoginAction = async (obj) => {
    try{
        const resp = await fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj)
        });

        if(resp.status !== 200){
            const data = await resp.json();
            throw data.message;
        }

        const data = await resp.json();
        jsCookie.set('jwt', data.token);
        return {correctCredentials: true};
    }
    catch(err){
        const { returnValue, openPopup, msg } = CheckValidation(false, true, null, err);
        return { returnValue, openPopup, msg };
    }
}

export default LoginAction;