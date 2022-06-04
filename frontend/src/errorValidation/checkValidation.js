const CheckValidation = (openErrorPopup = false, backendError = false, obj = null, errorMsg = '') => {
    let returnValue = true;

    if(openErrorPopup){
        for(let key in obj){
            if(key === 'enrolledCourse'){
                if(obj[key].length === 0){
                    openErrorPopup = true; 
                    returnValue = false; 
                    break;
                }
                
                for(let i=0; i<obj[key].length; i++){
                    if(obj[key][i].subject.trim() === '' || obj[key][i].teacher.trim() === ''){
                        openErrorPopup = true; 
                        returnValue = false; 
                        break;
                    }
                    else openErrorPopup = false
                }
            }
            else{
                if(obj[key].required){
                    if(obj[key].value !== '' || obj[key].value){
                        openErrorPopup = false;
                    }
                    else {
                        openErrorPopup = true;
                        returnValue = false;
                        break;
                    }
                }
            }
        }
    }
    else returnValue = false;

    if(backendError) openErrorPopup = true;

    return {returnValue, openPopup: openErrorPopup, msg: errorMsg};
};

export default CheckValidation;