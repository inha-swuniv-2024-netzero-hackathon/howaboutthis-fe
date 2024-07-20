import React from 'react';
import avartar from '../../assets/avartar.png';

function ObjectImage(props) {
    return (
        <img
            style={{ backgroundColor: 'white' }}
            className='objImage'
            src={props.s3_img_url || avartar}
            alt="텍스트"
        />
    );
}

export default ObjectImage;