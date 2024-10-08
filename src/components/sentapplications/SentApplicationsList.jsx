import React from 'react';
import styled from 'styled-components';
import Modal from '../modal/Modal';

const SentApplicationsContainer = styled.div`
  top: 27.7rem;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
    cursor: pointer;
`;

const SentApplication = styled.div`
  position: relative;
  width: 139.5rem;
  height: 17.4rem;
  flex-shrink: 0;
  border-radius: 1rem;
  border: 0.1rem solid #6BA6FF;
  background: #FFF;
  box-shadow: 0px 0px 2rem 0px rgba(51, 62, 94, 0.30);

  div:nth-child(1) {
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 0.3rem solid #606575;
    left: 4rem;
    top: 7.4rem;
    position: absolute;
    background-color: ${({ isSelected }) => (isSelected ? '#606575' : '#FFF')};
  }

  div:nth-child(2) {
    width: 13rem;
    height: 14.4rem;
    flex-shrink: 0;
    background: #D9D9D9;
    left: 11.2rem;
    top: 1.5rem;
    position: absolute;
  }

  div:nth-child(3) {
    color: #A6A6A6;
    font-family: var(--font-family-pretendard);
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    left: 28.7rem;
    top: 7rem;
    position: absolute;
  }

  div:nth-child(4) {
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    left: 42.4rem;
    top: 7rem;
    position: absolute;
  }

  div:nth-child(5) {
    color: var(--Sub-Color, #333E5E);
    font-family: var(--font-family-pretendard);
    font-size: 28px;
    font-style: normal;
    line-height: normal;
    left: 56.8rem;
    top: 7rem;
    position: absolute;
    font-weight: 700;
  }

  div:nth-child(7) {
    flex-shrink: 0;
    width: 14.9rem;
    font-family: var(--font-family-pretendard);
    font-size: 28px;
    color: #A6A6A6;
    text-align: right;
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    left: 121.4rem;
    top: 7rem;
    position: absolute;
  }
`;

const StatusBtn = styled.div`
  font-family: var(--font-family-pretendard);
  font-size: 2.8rem;
  border-radius: 3rem;
  border: 0.2rem solid ${({ isstatus }) => (isstatus ? 'var(--Main-Color, #6BA6FF)' : '#606575')};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  left: 102.6rem;
  top: 6.5rem;
  position: absolute;
  width: 14.1rem;
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  background: ${({ isstatus }) => (isstatus ? 'var(--Main-Color, #6BA6FF)' : 'transparent')};
  color: ${({ isstatus }) => (isstatus ? '#FFF' : 'inherit')};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 0.5rem;
  border: none;
  color: ${({ $isActive }) => ($isActive ? '#333E5E' : '#A6A6A6')};
  cursor: pointer;
  font-size: 2.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: var(--font-family-pretendard);
  background: none;
`;

const DisabledButton = styled(PageButton)`
  cursor: not-allowed;
  background-color: none;
  color: #666;
`;

const SentApplicationsList = ({
  applications,
  selectedApplications,
  handleSelectApplication,
  openModal,
  closeModal,
  isModalOpen,
  selectedAppId,
  page,
  totalPages,
  handlePageChange,
}) => {
  return (
    <SentApplicationsContainer>
      {applications.map((data, index) => (
        <SentApplication
          key={index}
          isSelected={selectedApplications.includes(data.application_id)}
          onClick={() => openModal(data.application_id)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleSelectApplication(data.application_id);
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url(${data.img_url})`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div>{data.tutor_name}</div>
          <div>{data.user_name}</div>
          <div>
          {data.title.length > 19 ? `${data.title.substring(0, 30)} ...` : data.title}
          </div>
          <StatusBtn isstatus={data.status}>
            {data.status ? '수락완료' : '수락대기'}
          </StatusBtn>
          <div>{new Date(data.created_at).toLocaleDateString()}</div>
        </SentApplication>
      ))}
      {selectedAppId && <Modal appId={selectedAppId} isOpen={isModalOpen} closeModal={closeModal} />}
      <PaginationContainer>
        <DisabledButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          이전
        </DisabledButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            $isActive={index + 1 === page}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
        <DisabledButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          다음
        </DisabledButton>
      </PaginationContainer>
    </SentApplicationsContainer>
  );
};

export default SentApplicationsList;
