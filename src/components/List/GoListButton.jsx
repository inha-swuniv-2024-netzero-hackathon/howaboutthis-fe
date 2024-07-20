import React from 'react';

import { useNavigate } from 'react-router-dom';
import './List.css'
import './GoListButton.css';

function GoListButton(props) {

    const navigateList = useNavigate();
    function handleClick_List() {
        navigateList('/');
    }


    return (
        <button className='goListButton'
            onClick={handleClick_List}
        >
            &lt;
        </button>
    );
}

export default GoListButton;