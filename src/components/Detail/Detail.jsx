import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import './Detail.css';
import ObjectImage from '../ObjectImage/ObjectImage';
import GoMainButton from '../List/GoListButton';
import ExchangingStatus from '../ExchangingStatus/ExchangingStatus';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

function Detail() {
    const { author_slack_id, unixTime } = useParams(); // URL 파라미터 읽기
    const [user, setUser] = useState({});

    useEffect(() => {
        if (author_slack_id && unixTime) {
            axios.get(`http://13.124.230.43:8000/api/items?author-slack-id=${author_slack_id}&unixtime=${unixTime}`)
                .then(response => {
                    if (response.status === 200) {
                        console.log('응답 데이터:', response.data);
                        setUser(response.data);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            console.error('유효성 검사 오류:', error.response.data);
                        } else {
                            console.error('에러 발생:', error.response.data);
                        }
                    } else {
                        console.error('요청 중 에러 발생:', error.message);
                    }
                });
        }
    }, [author_slack_id, unixTime]);

    const [userIds, setUserIds] = useState({
        user_a_id: 'U07CS18JABH',
        user_b_id: 'U07D3N3HRPF',
        text: '정연님과 효대님의 물물교환을 시작해주세요!'
    });

    const navigateList = useNavigate();
    function handleClick_List() {
        navigateList('/');
    }

    return (
        <div className='detail-container'>
            <div className='image-box'>
                <GoMainButton />
                <ObjectImage className='objImg' s3_img_url={user.s3_img_url} />
            </div>
            <ExchangingStatus status={user.status} />
            <p className='title'>{user.title}</p>
            <TimeDisplay dateString={user.unixtime} />
            <p className='explain'>{user.description}</p>
            <p className='bottom-explain'>
                버튼을 누르면 슬랙으로 이동합니다.
                <br />
                작성자와 DM을 통해 물물교환을 진행해주세요 :)
            </p>
            <button className='bottom-button' onClick={function () {
                axios.post('http://13.124.230.43:8000/api/slack', userIds, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            handleClick_List();
                            alert('정상적으로 작성되었습니다.');
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 422) {
                                console.error('유효성 검사 오류:', error.response.data);
                            } else {
                                console.error('에러 발생:', error.response.data);
                            }
                        } else {
                            console.error('요청 중 에러 발생:', error.message);
                        }
                    });
            }}>
                Slack으로 연락하기
            </button>
        </div>
    );
}

export default Detail;
