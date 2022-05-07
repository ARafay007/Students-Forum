import React, {useState, useEffect} from "react";

const ErrorPopup = props => {
    const [errorClass, setErrorClass] = useState('errorPopup');

    useEffect(() => {
        errorTimer();
    }, []);

    const errorTimer = () => {
        new Promise(resolve => setTimeout(() => {
                    const time = setTimeout(()=>{}, 10);
                    resolve(time);
            }, 5000))
            .then(resp => {const timer = resp; removePopup(timer);});
    }

    const removePopup = (timer) => {
        clearTimeout(timer);
        setErrorClass('hideErrorPopup');
        props.errorFunction();
    };

    return (
        <div className={errorClass}>
            <p>Error</p>
            {props.errorMsg}
        </div>
    );
};

export default ErrorPopup;