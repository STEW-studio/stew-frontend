import React from 'react'
import HeaderForPages from '../components/HeaderForPages'
import styled from 'styled-components'
import PostContainer from '../components/postManagement/PostContainer'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const BASE_URL=import.meta.env.VITE_BASE_URL;
const PostManagementContainer=styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 216rem;
`
const PostManagement = () => {
    //상태관리
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const userId = 1; // 우린 로그인 기능이 없으니 1번 유저가 로그인했다고 가정함

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${userId}/tutors`, {
                params: { page }
            });
            setData(response.data.data.tutorList); // 데이터 설정
            setTotalPages(response.data.data.totalPage); // 총 페이지 수 설정
        } catch (error) {
            setError('Failed to load data');
            console.error("데이터 불러오기 실패: ", error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return(
        <>
         <PostManagementContainer>
         <HeaderForPages forPostManagement={true}  userId={userId}/>
         <PostContainer userId={userId} data={data} isMyData={true} onPageChange={handlePageChange} currentPage={page} totalPages={totalPages} />
         </PostManagementContainer>
        </>
    )
}

export default PostManagement