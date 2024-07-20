import React, { useEffect } from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Feed from '../Feed/Feed';
import './List.css';

function List(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://13.124.230.43:8000/api/items')
            .then(response => {
                if (response.status === 200) {
                    // 성공적인 응답 처리
                    console.log('응답 데이터:', response.data.items);
                    setUsers(prevUsers => [...prevUsers, ...response.data.items]);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 422) {
                        // 유효성 검사 오류 처리
                        console.error('유효성 검사 오류:', error.response.data);
                    } else {
                        // 다른 오류 처리
                        console.error('에러 발생:', error.response.data);
                    }
                } else {
                    console.error('요청 중 에러 발생:', error.message);
                }
            });
    }, []);

    const navigateDetail = useNavigate();
    function handleClick_Detail() {
        navigateDetail('/detail/:id');
    }


    const navigateUpload = useNavigate();
    function handleClick_Upload() {
        navigateUpload('/upload');
    }



    return (
        <div className='list-container'>
            {users.map(function (user) {
                console.log('unixTime - list : ', user.upload_unixtime);
                return (
                    <Feed
                        author_slack_id={user.author_slack_id}
                        unixTime={user.upload_unixtime}
                        title={user.title}
                        s3_img_url={user.s3_img_url}
                        status={user.status}
                        description={user.description}
                    />
                )
            })}
            <button className='upload-button' onClick={handleClick_Upload}>
                교환글 작성하기
            </button>
        </div>

    );
}

export default List;
