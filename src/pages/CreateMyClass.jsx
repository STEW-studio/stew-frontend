// CreateMyClass.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LeftForm from '../components/createmyclass/LeftForm';
import RightForm from '../components/createmyclass/RightForm';
import HeaderForPages from '../components/HeaderForPages';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateMyClassContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 216rem;
`;

const SignupBtn = styled.button`
  width: 18.7rem;
  height: 5.9453rem;
  border: 0.3rem solid #333e5e;
  border-radius: 4rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--Sub-Color, #333e5e);
  font-family: Pretendard;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  top: 166rem;
  right: 26.8rem;
  background: none;
  cursor: pointer;
`;

const CreateMyClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    type: '',
    price: '',
    experience: '',
    introduction: '',
    bio: '',
    sports_intro: '',
    profile: null,
    portfolio: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile' || name === 'portfolio') {
      setFormData({
        ...formData,
        [name]: files ? files : value, // 파일이 있을 경우 파일 배열로 설정
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //폼 제출 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit 함수가 실행되었습니다.');
  
    const requestData = new FormData();
  //서버 필요 객체
    const requestDto = JSON.stringify({
      gender: formData.gender,
      price: Number(formData.price),
      name: formData.name,
      sports_intro: formData.sports_intro,
      intro: formData.introduction,
      location: formData.location,
      self_intro: formData.bio,
      sports_id: Number(formData.type),
      career: formData.experience,
      age: Number(formData.age),
    });
  

    requestData.append('requestDto', requestDto);
  

    if (formData.profile) {
      requestData.append('profile', formData.profile[0]);
    }
  
 
    if (formData.portfolio.length > 0) {
      for (const file of formData.portfolio) {
        requestData.append('portfolio', file);
      }
    }
  
 
    for (let [key, value] of requestData.entries()) {
      console.log(key, value);
    }
  
    try {
      console.log('axios.post 요청 전');
      const userId = 1; // 임의로 설정
      const response = await axios.post(
        `${BASE_URL}/tutors/${userId}`,
        requestData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('보낼 데이터:', response.data);
      console.log('try문 실행 ');
    } catch (error) {
      console.error('튜터 등록하는데 실패했습니다:', error);
      console.log('catch문 실행 ');
    }
  };
  
  return (
    <CreateMyClassContainer>
      <HeaderForPages forPostManagement={true} />
      <form onSubmit={handleSubmit}>
        <LeftForm formData={formData} handleChange={handleChange} />
        <RightForm formData={formData} handleChange={handleChange} />
        <SignupBtn type="submit">등록하기</SignupBtn>
      </form>
    </CreateMyClassContainer>
  );
};

export default CreateMyClass;
