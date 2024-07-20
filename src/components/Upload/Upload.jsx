import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Upload.css';
import ObjectImage from '../ObjectImage/ObjectImage';
import GoListButton from '../List/GoListButton';

function Upload() {
    const [form, setForm] = useState({
        author_slack_id: '',
        upload_unixtime: '',
        title: '',
        description: '',
        password: '',
        exchange_status: '',
        s3_img_url: ''
    });

    const [checkPW, setCheckPW] = useState('');
    const [uploadImg, setUploadImg] = useState(null);
    const [uploadImgUrl, setUploadImgUrl] = useState(null);
    const navigateList = useNavigate();

    function handleClick_List() {
        navigateList('/');
    }

    const onchangeImageUpload = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];

        console.log('present', uploadFile);

        setUploadImg(uploadFile);
        setUploadImgUrl(URL.createObjectURL(uploadFile));
    };

    const handleUpload = () => {
        const unixTimeSecond = Math.floor(new Date().getTime() / 1000).toString();
        const updatedForm = { ...form, upload_unixtime: unixTimeSecond };

        const formData = new FormData();
        console.log('upload', uploadImg);
        if (uploadImg) {
            formData.append('file', uploadImg);
        }

        // 이미지 업로드
        axios.post('http://13.124.230.43:8000/api/s3-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(imageUploadResponse => {
            const s3ImageUrl = imageUploadResponse.data.s3_url;
            console.log('s3 url', s3ImageUrl);

            // 새로운 상태를 로컬 변수로 저장
            const updatedFormWithUrl = { ...updatedForm, s3_img_url: s3ImageUrl };

            // 이미지 업로드 후 아이템 업로드
            axios.post('http://13.124.230.43:8000/api/items', updatedFormWithUrl, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(itemUploadResponse => {
                if (itemUploadResponse.status === 200) {
                    handleClick_List();
                    alert('정상적으로 작성되었습니다.');
                    console.log('itemuploadres', itemUploadResponse);
                }
            }).catch(error => {
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
        }).catch(error => {
            if (error.response) {
                console.error('이미지 업로드 중 에러 발생:', error.response.data);
            } else {
                console.error('이미지 업로드 중 에러 발생:', error.message);
            }
        });
    };

    return (
        <div className='upload-container'>
            <GoListButton />
            <div className='image-box'>
                <ObjectImage id='upload_img' src={uploadImgUrl} />
            </div>

            <form>
                <label htmlFor='profile-upload' />
                <input type="file" accept="image/*" onChange={onchangeImageUpload} />
            </form>

            <div className="form-group">
                <p className='title'>제목</p>
                <input
                    type='text'
                    placeholder='제목을 입력해주세요.'
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <p className='explain'>자세한 설명</p>
                <input
                    type='text'
                    placeholder='물물교환하고 싶은 상품에 대한 설명을 적어주세요.'
                    onChange={e => setForm({ ...form, description: e.target.value })}
                />
                <p className='PW'>비밀번호</p>
                <input
                    type='password'
                    placeholder='비밀번호 입력해주세요.'
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <p className='PW'>비밀번호 확인</p>
                <input
                    type='password'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'
                    onChange={e => setCheckPW(e.target.value)}
                />
                <p className='SlackId'>Slack ID</p>
                <input
                    type='text'
                    placeholder='Slack ID'
                    onChange={e => setForm({ ...form, author_slack_id: e.target.value })}
                />
                <p>게시글 수정과 삭제를 위해 사용돼요.</p>
                <button
                    className='bottom-button'
                    type='button'
                    onClick={handleUpload}
                >
                    물물교환 아이템 업로드하기
                </button>
            </div>
        </div>
    );
}

export default Upload;
