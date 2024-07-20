import React from 'react';
import './TimeDisplay.css';

function TimeDisplay({ dateString }) {
    function formatDateTime(dateString) {
        const date = new Date(dateString * 1000);
        const now = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const isToday = date.toDateString() === now.toDateString();

        let formattedDate = isToday ? `${hours}:${minutes}` : `${year}.${month}.${day}`;

        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = Math.floor(diffDays / 31);
        const diffYears = Math.floor(diffMonths / 12);

        let timeAgo = '';
        if (diffMin < 1) {
            timeAgo = `${diffSec}초 전`;
        } else if (diffHours < 1) {
            timeAgo = `${diffMin}분 전`;
        } else if (diffDays < 1) {
            timeAgo = `${diffHours}시간 전`;
        } else if (diffMonths < 1) {
            timeAgo = `${diffDays}일 전`;
        }
        else if (diffYears < 1) {
            timeAgo = `${diffMonths}달 전`;
        }
        else {
            timeAgo = `${diffYears}년 전`;
        }

        return `${formattedDate} · (${timeAgo})`;
    }


    const formattedDateTime = formatDateTime(dateString);
    return <span className='time-display'>{formattedDateTime}</span>;
}

export default TimeDisplay;