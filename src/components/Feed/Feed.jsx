import React from 'react';
import './Feed.css';
import ObjectImage from '../ObjectImage/ObjectImage';
import { useNavigate } from 'react-router-dom';
import ExchangingStatus from '../ExchangingStatus/ExchangingStatus';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

function Feed(props) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/detail/${props.author_slack_id}/${props.unixTime}`, { state: { ...props } });
    }

    console.log('detail:', props);

    return (
        <div
            className='feed-container'
            onClick={function () {
                handleClick();
            }}
        >
            <ObjectImage s3_img_url={props.s3_img_url} />
            <div className="text-container">
                <div className="title-row">
                    <span className='title'>{props.title}</span>
                    <ExchangingStatus status={props.status} />
                </div>
                <TimeDisplay dateString={props.unixTime} className="time-display" />
            </div>
        </div>
    );
}

export default Feed;
