const CheckValidation = (openErrorPopup = false, backendError = false, obj = null, errorMsg = '') => {
    let returnValue = true;

    if(openErrorPopup){
        for(let key in obj){
            if(key !== 'img' && key !== 'isActive' && key !== 'createdAt' && key !== 'createdBy' && key !== 'updatedBy' && key !== 'updatedAt'){
                if(obj[key] === '' || obj[key] === undefined || obj[key] === 0){
                    openErrorPopup = true;
                    returnValue = false;
                    break;
                }
                else openErrorPopup = false;
            }
        }
    }
    else returnValue = false;

    if(backendError) openErrorPopup = true;

    return {returnValue, openPopup: openErrorPopup, msg: errorMsg};
};

export default CheckValidation;