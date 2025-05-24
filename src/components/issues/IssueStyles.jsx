import styled from 'styled-components';

export const IssuesContainer = styled.div`
  padding: 2rem;
//   max-width: 1200px;
width:100svw;
  margin: 0 auto;

  @media (max-width: 992px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const IssuesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  h1 {
    color: #2c3e50;
    font-size: 1.8rem;
    margin: 0;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const IssuesTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
`;

export const IssuesTab = styled.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.active ? '#3498db' : '#7f8c8d'};
  border-bottom: 2px solid ${props => props.active ? '#3498db' : 'transparent'};
  transition: all 0.3s;

  &:hover {
    color: #3498db;
  }
`;

export const IssuesContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const IssueCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const IssueImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const IssueDetails = styled.div`
  padding: 1.25rem;
`;

export const IssueTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;

export const IssueMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #7f8c8d;

  span {
    padding: 0.25rem 0.5rem;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
`;

export const IssueStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background-color: ${props => 
    props.status === 'pending' ? '#e74c3c' : 
    props.status === 'in progress' ? '#f39c12' : '#2ecc71'};
`;

export const IssueVotes = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const IssueActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const IssueButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${props => props.danger ? '#e74c3c' : '#3498db'};
  color: white;

  &:hover {
    background-color: ${props => props.danger ? '#c0392b' : '#2980b9'};
  }
`;

export const SearchBar = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 250px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover:not(:disabled) {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }
  }

  span {
    color: #7f8c8d;
  }
`;

