import React from 'react';
import './ExchangingStatus.css'
function ExchangingStatus(props) {

    return (
        <div className='status'>
            {
                props.status === "in_exchanging" && (
                    <span className='status-tag' id='in-progress'>교환 중</span>
                )
            }
            {
                props.status === "exchanged" && (
                    <span className='status-tag' id='completed'>교환 완료</span>
                )
            }
        </div>
    );
}

export default ExchangingStatus;