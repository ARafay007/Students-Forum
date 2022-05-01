import React from "react";

const DeletePopup = props => {
    const {obj} = props;

    const confirmDelete = (id = 0, confirm = false) => {
        props.delete(id, confirm);
    }

    const showData = (Switch) => {
        const data = [];
        if(Switch){
            for(const el in obj){
                if(el !== '_id'){
                    data.push(<th key={el}>{el}</th>);
                }
            }
        }
        else{
            for(const el in obj){
                if(el !== '_id'){
                    data.push(<td key={el}>{obj[el]}</td>);
                }
            }
        }
        
        // console.log(data);
        return data;
    };

    return (
        <div className='deletePopup'>
            <div className='deletePopup__container'>
                <div><p>Are you sure delete this?</p></div>
                <div>
                    <table>
                        <thead>
                            <tr>{showData(true)}</tr>
                        </thead>
                        <tbody>
                            <tr>{showData(false)}</tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='button button__yes' onClick={() => confirmDelete(0, true)}>Yes</button>
                    <button className='button button__delete' onClick={confirmDelete}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;