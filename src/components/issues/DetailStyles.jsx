import styled from 'styled-components';

export const DetailContainer = styled.div`
  padding: 2rem;
//   max-width: 1000px;
width:100svw;
  margin: 0 auto;
`;

export const DetailHeader = styled.div`
  margin-bottom: 2rem;
`;

export const DetailContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DetailTitle = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const DetailMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;

  span {
    padding: 0.25rem 0.5rem;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
`;

export const DetailDescription = styled.p`
  color: #34495e;
  line-height: 1.6;
`;

export const DetailVoteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.disabled ? '#2ecc71' : '#3498db'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

export const DetailBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #f5f7fa;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e6ed;
  }
`;


export const DetailStatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ status }) => 
    status === 'resolved' ? '#4CAF50' : 
    status === 'in progress' ? '#FFC107' : '#F44336'};
  color: white;
`;

export const DetailVoteCount = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;

export const DetailActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const DetailLoading = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
`;

export const DetailError = styled.div`
  padding: 2rem;
  text-align: center;
  color: #f44336;
`;