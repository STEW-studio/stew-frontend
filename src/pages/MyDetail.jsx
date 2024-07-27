import React from 'react'
import HeaderForPages from '../components/HeaderForPages'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { mydata } from '../data/mydata'
import stars from '../assets/images/star-fill.png';
import LeftInfo from '../components/findTutor/LeftInfo'
import RightInfo from '../components/findTutor/RightInfo'
const TutorDetailContainer=styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 216rem;
`
const TutorThumbnail=styled.div`
    position: absolute;
    top: 35.5rem;
    display: flex;
    gap: 3.9rem;
    width: 92.7rem;
    height: 15.8rem;
    flex-shrink: 0;
    border-top: 0.3rem solid var(--Main-Color, #6BA6FF);
    border-bottom: 0.3rem solid var(--Main-Color, #6BA6FF);
    justify-content: center;
    align-items: center;
    div{
    color: var(--Sub-Color, #333E5E);
    font-family: Pretendard;
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    }
`
const TutorImg=styled.div`
    width: 9.7rem;
    height: 10.7rem;
    flex-shrink: 0;
    background: #D9D9D9;
`
const RatingImage = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
const Space = styled.span`
    margin-left: 2rem; 
`;
const UpdateBtn=styled.div`
width: 12.2086rem;
height: 5.9453rem;
border: 0.3rem solid #333E5E;
border-radius: 4rem;
flex-shrink: 0;
display: flex;
justify-content: center;
align-items: center;
color: var(--Sub-Color, #333E5E);
font-family: Pretendard;
font-size: 3.6rem;
font-style: normal;
font-weight: 700;
line-height: normal;
position: absolute;
top: 177.4rem;
right: 41.491rem;
`
const DeleteBtn=styled.div`
width: 12.2086rem;
height: 5.9453rem;
border: 0.3rem solid #333E5E;
border-radius: 4rem;
flex-shrink: 0;
display: flex;
justify-content: center;
align-items: center;
color: var(--Sub-Color, #333E5E);
font-family: Pretendard;
font-size: 3.6rem;
font-style: normal;
font-weight: 700;
line-height: normal;
position: absolute;
top: 177.4rem;
right: 26.798rem;
`

const MyDetail = () => {
  const {id}=useParams();
  const my=mydata.find(t=>t.id===parseInt(id));
  return (
    <TutorDetailContainer>
    <HeaderForPages/>
    <TutorThumbnail>
        <TutorImg/>
        <div>
            <div>{my.name} / {my.type}
            <Space />
                {Array.from({ length: my.rating }, (_, index) => (
                <RatingImage key={index} src={stars} alt="stars" />
                ))} ({my.reviewNum})
            </div>
            <div>{my.introduction}</div>
            <div>{my.price}</div>
        </div>
    </TutorThumbnail>
    <LeftInfo  data={mydata}/>
    <RightInfo data={mydata}/>
    <UpdateBtn>
        수정
    </UpdateBtn>
    <DeleteBtn>
        삭제
    </DeleteBtn>
    </TutorDetailContainer>
  )
}

export default MyDetail