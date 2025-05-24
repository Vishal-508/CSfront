import styled from 'styled-components';

export const DashboardContainer = styled.div`
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

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 100%;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const DashboardCardTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

export const DashboardCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DashboardStat = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #3498db;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const DashboardRecentIssues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DashboardIssueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;

  a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #2980b9;
      text-decoration: underline;
    }
  }

  span {
    color: ${props => 
      props.status === 'Pending' ? '#e74c3c' : 
      props.status === 'In Progress' ? '#f39c12' : '#2ecc71'};
    font-weight: 500;
  }
`;