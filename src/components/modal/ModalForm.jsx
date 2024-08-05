import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import stars from '../../assets/images/star-fill.png';
import ReactSlider from 'react-slider';
import axios from 'axios';

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  .signupformbtn{
    font-family: var(--font-family-pretendard);
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    border-radius: 3rem;
  }
`;

const ModalContent = styled.div`
  width: 118.9rem;
  height: 150.5rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #FFF;
  position: absolute;
  z-index: 1000000000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TutorThumbnail = styled.div`
  position: absolute;
  top: 19.3rem;
  display: flex;
  left: 13.1rem;
  gap: 3.9rem;
  width: 92.7rem;
  height: 15.8rem;
  flex-shrink: 0;
  border-top: 0.3rem solid var(--Main-Color, #6BA6FF);
  border-bottom: 0.3rem solid var(--Main-Color, #6BA6FF);
  justify-content: center;
  align-items: center;
  div {
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const TutorImg = styled.div`
  background-image: url(${(props) => props.$imgurl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 9.7rem;
  height: 10.7rem;
  flex-shrink: 0;
`;

const RatingImage = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const Space = styled.span`
  margin-left: 2rem;
`;

const TutorFirstLine = styled.div`
  display: flex;
  position: absolute;
  top: 50.5rem;
  left: 20.4rem;
  gap: 6.4rem;
  align-items: center;
  .infos {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
  & > div:first-child {
    color: #A6A6A6;
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  & > div:nth-child(2) {
    width: 0.2rem;
    height: 2.5rem;
    background: #A6A6A6;
  }
  & > div:nth-child(3) {
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const ModalTitle = styled.div`
input{
        color: #A6A6A6;
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    border: none;

  &:focus {
    outline: none;
  }
}
  display: flex;
  box-sizing: border-box;
  padding-left: 3.8rem;
  align-items: center;
  gap: 1.7rem;
  position: absolute;
  top: 40.2rem;
  left: 20.4rem;
  width: 78.1rem;
  height: 5.2rem;
  flex-shrink: 0;
  border-radius: 3rem;
  border: 0.2rem solid var(--Sub-Color, #333E5E);
  & > div:first-child {
    color: #A6A6A6;
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  & > div:nth-child(2) {
    width: 0.2rem;
    height: 2.5rem;
    background: #A6A6A6;
  }
  & > div:nth-child(3) {
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Purpose = styled.div`
display: flex;
justify-content: center;
align-items: center;
  position: absolute;
  top: 77.8rem;
  left: 16.1rem;
  width: 82rem;
  height: 10.7rem;
  border: 0.2rem solid #D9D9D9;
  textarea {
    width: 100%;
    height: 100%;
    padding: 3.7rem;
    box-sizing: border-box;
    resize: none;
    border: none;
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    pointer-events: none;
  }
  textarea:focus {
    outline: none;
  }
  h3 {
    position: absolute;
    top: -1.6rem;
    left: 2.7rem;
    background: white;
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    width: 12.1rem;
    height: 3.1rem;
    padding: 0px 0.7rem;
    justify-content: center;
    align-items: center;
  }
`;

const IntensityPreference = styled.div`
  position: absolute;
  top: 96.7rem;
  left: 16.1rem;
  width: 82rem;
  height: 14.1rem;
  border: 0.2rem solid #D9D9D9;
  textarea {
    width: 100%;
    height: 12rem;
    padding: 3.7rem;
    box-sizing: border-box;
    resize: none;
    border: none;
    color: var (--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    pointer-events: none;
  }
  textarea:focus {
    outline: none;
  }
  h3 {
    position: absolute;
    top: -1.6rem;
    left: 2.7rem;
    background: white;
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    width: 16rem;
    height: 3.1rem;
    padding: 0px 0.7rem;
    justify-content: center;
    align-items: center;
  }
`;

const MessageToTutor = styled.div`
  position: absolute;
  top: 119.2rem;
  left: 16.1rem;
  width: 82rem;
  height: 18.2rem;
  border: 0.2rem solid #D9D9D9;
  textarea {
    width: 100%;
    height: 15rem;
    padding: 3.7rem;
    box-sizing: border-box;
    resize: none;
    border: none;
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
  }
  textarea:focus {
    outline: none;
  }
  h3 {
    position: absolute;
    top: -1.6rem;
    left: 2.7rem;
    background: white;
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    width: 19rem;
    height: 3.1rem;
    padding: 0px 0.7rem;
    justify-content: center;
    align-items: center;
  }
`;

const Btns = styled.div`

  display: flex;
  gap: 2rem;
 
  cursor: pointer;
`;

const PurposeButton = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? '#DAE9FF' : 'white')};
  border: 0.2rem solid #6BA6FF;
  border-radius: 3rem;
  padding: 0.45rem 1.65rem;
  justify-content: center;
align-items: center;
  margin: 0.5rem;
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  color: ${({ isSelected }) => (isSelected ? '#333E5E' : '#6BA6FF')};
  &:hover {
    background-color: #DAE9FF;
    color: #333E5E;
  }
font-family: var(--font-family-pretendard);
font-size: 2.8rem;
font-style: normal;
font-weight: 500;
line-height: normal;

`;

const Diet = styled(PurposeButton)``;
const Muscle = styled(PurposeButton)``;
const Stress = styled(PurposeButton)``;
const Hobby = styled(PurposeButton)``;

const SliderContainer = styled.div`
  width: 60rem;
  position: relative;
  top: 6rem;
  left: 11rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 0.5rem;
  background: var(--Main-Color, #6BA6FF);
  position: relative;
  cursor: pointer;
`;

const StyledThumb = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: var(--Main-Color, #6BA6FF);
  border-radius: 50%;
  cursor: grab;
  transition: transform 0.2s ease-in-out; 
`;

const StyledTrack = styled.div`
  top: 3rem;
  bottom: 2rem;
  background: ${(props) => (props.index === 2 ? '#f00' : props.index === 1 ? '#ddd' : 'var(--Main-Color, #6BA6FF)')};
  border-radius: 999px;
  transition: background-color 0.2s ease-in-out; 
`;

const Label = styled.div`
  position: absolute;
  top: 4rem;
  color: #333e5e;
  font-family: var(--font-family-pretendard);
  font-size: 2.6rem;
  font-weight: 700;
  line-height: normal;
  transform: translate(-50%, -50%);
`;

const labels = ['병아리', '초급', '중급', '고급', '전문가'];

const SliderWithLabels = ({ value, onChange }) => {
  return (
    <SliderContainer>
      <StyledSlider
        value={value}
        onChange={onChange}
        min={1}
        max={5}
        renderThumb={(props, state) => <StyledThumb {...props} />}
        renderTrack={(props, state) => <StyledTrack {...props} index={state.index} />}
        step={1}
      />
      {labels.map((label, index) => (
        <Label key={index} style={{ left: `${(index / 4) * 100}%` }}>
          {label}
        </Label>
      ))}
    </SliderContainer>
  );
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ModalForm = ({ isOpen, onClose, data }) => {
  // 상단에 표시할 튜터 정보
  const tutordetail = data;

  // 튜터에게 보낼 신청서 정보
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState([]);
  const [intensity, setIntensity] = useState(1);
  const [memo, setMemo] = useState('');
  const [imgFile, setImgFile] = useState(null);

  // 유저 여기선 userid=1 정보
  const [userInfo, setUserInfo] = useState({
    name: '',
    gender: '',
    age: '',
    location: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/1`);
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('userid=1 정보 불러오는데 실패:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('purpose', purpose.join(','));
    formData.append('intensity', intensity);
    formData.append('memo', memo);
    if (imgFile) {
      formData.append('imgUrl', imgFile, imgFile.name);
    }

    try {
      const response = await axios.post(`${BASE_URL}/apps/1/${tutordetail.tutorId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('신청서가 접수되었습니다!');
      setTitle('');
      setPurpose([]);
      setIntensity(1);
      setMemo('');
      setImgFile(null);
      onClose(); // 폼 제출 후 모달 닫기
    } catch (error) {
      alert(`폼 제출에 실패했습니다: ${error.response.data.detail}`);
    }
  };

  const handlePurposeClick = (purposeType) => {
    setPurpose((prev) =>
      prev.includes(purposeType) ? prev.filter((p) => p !== purposeType) : [...prev, purposeType]
    );
  };

  const isSelected = (purposeType) => purpose.includes(purposeType);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Overlay isOpen={isOpen} onClick={onClose} />
        <ModalContainer isOpen={isOpen}>
          <ModalContent>
            <button onClick={onClose} style={{ position: 'absolute', top: '6.9rem', left: '7.1rem', background: 'white', border: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M1.46447 1.46447C3.41709 -0.488155 6.58291 -0.488155 8.53553 1.46447L20 12.9289L31.4645 1.46447C33.4171 -0.488155 36.5829 -0.488155 38.5355 1.46447C40.4882 3.41709 40.4882 6.58291 38.5355 8.53553L27.0711 20L38.5355 31.4645C40.4882 33.4171 40.4882 36.5829 38.5355 38.5355C36.5829 40.4882 33.4171 40.4882 31.4645 38.5355L20 27.0711L8.53553 38.5355C6.58291 40.4882 3.41709 40.4882 1.46447 38.5355C-0.488155 36.5829 -0.488155 33.4171 1.46447 31.4645L12.9289 20L1.46447 8.53553C-0.488155 6.58291 -0.488155 3.41709 1.46447 1.46447Z" fill="#D9D9D9" />
              </svg>
            </button>
            <button type="submit" className="signupformbtn" style={{ position: 'absolute', top: '6.9rem', right: '7.1rem', width: '14rem', height: '5.3rem', gap: '1rem', justifyContent: 'center', alignItems: 'center', background: '#6BA6FF', color: 'white' }}>
              신청하기
            </button>
            <TutorThumbnail>
              <TutorImg $imgurl={tutordetail.imgUrl} />
              <div>
                <div>{tutordetail.name} / {tutordetail.sportName}
                  <Space />
                  {Array.from({ length: tutordetail.total_review_score }, (_, index) => (
                    <RatingImage key={index} src={stars} alt="stars" />
                  ))} ({tutordetail.total_review_count})
                </div>
                <div>{tutordetail.intro}</div>
                <div>{tutordetail.price}</div>
              </div>
            </TutorThumbnail>
            <ModalTitle>
              <div>제목</div>
              <div></div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
            </ModalTitle>
            <TutorFirstLine>
              <svg xmlns="http://www.w3.org/2000/svg" width="191" height="191" viewBox="0 0 191 191" fill="none">
                <circle cx="95.5" cy="95.5" r="95.5" fill="#F2F3F5" />
                <g transform="translate(39 39)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="113" height="113" viewBox="0 0 113 113" fill="none">
                    <path d="M9.9375 112.375C9.9375 112.375 0.625 112.375 0.625 103.062C0.625 93.75 9.9375 65.8125 56.5 65.8125C103.062 65.8125 112.375 93.75 112.375 103.062C112.375 112.375 103.062 112.375 103.062 112.375H9.9375Z" fill="#A6A6A6" />
                    <path d="M56.5 56.5C71.9295 56.5 84.4375 43.992 84.4375 28.5625C84.4375 13.133 71.9295 0.625 56.5 0.625C41.0705 0.625 28.5625 13.133 28.5625 28.5625C28.5625 43.992 41.0705 56.5 56.5 56.5Z" fill="#A6A6A6" />
                  </svg>
                </g>
              </svg>
              <div className="infos">
                <InfoRow>
                  <div>닉네임</div>
                  <div></div>
                  <div>{userInfo.name}</div>
                </InfoRow>
                <InfoRow>
                  <div>성별</div>
                  <div></div>
                  <div>{userInfo.gender}</div>
                </InfoRow>
                <InfoRow>
                  <div>나이</div>
                  <div></div>
                  <div>{userInfo.age}</div>
                </InfoRow>
                <InfoRow>
                  <div>지역</div>
                  <div></div>
                  <div>{userInfo.location}</div>
                </InfoRow>
              </div>
            </TutorFirstLine>
            <Purpose>
              <h3>운동 목적</h3>
              <Btns>
                <Diet onClick={() => handlePurposeClick('다이어트')} isSelected={isSelected('다이어트')}>다이어트</Diet>
                <Muscle onClick={() => handlePurposeClick('근력향상')} isSelected={isSelected('근력향상')}>근력향상</Muscle>
                <Stress onClick={() => handlePurposeClick('스트레스 해소')} isSelected={isSelected('스트레스 해소')}>스트레스 해소</Stress>
                <Hobby onClick={() => handlePurposeClick('취미활동')} isSelected={isSelected('취미활동')}>취미활동</Hobby>
              </Btns>
            </Purpose>
            <IntensityPreference>
              <h3>운동 선호 강도</h3>
              <SliderWithLabels value={intensity} onChange={setIntensity} />
            </IntensityPreference>
            <MessageToTutor>
              <h3>튜터에게 전할 말</h3>
              <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="튜터에게 전할 말을 적어주세요!"></textarea>
            </MessageToTutor>
          </ModalContent>
        </ModalContainer>
      </form>
    </>
  );
};

export default ModalForm;
