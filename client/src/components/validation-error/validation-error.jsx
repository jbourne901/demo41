import React from 'react';
import "./validation-error.css";

const ValidationError = ({name, error}) => {
        if(error && error.length>0) {
            console.log("validationError error="+error);
           return <div className="validation-error">{error}</div>;
        }
        return null;
}

export default ValidationError;

