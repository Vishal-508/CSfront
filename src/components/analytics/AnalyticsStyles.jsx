import styled from 'styled-components';

export const AnalyticsContainer = styled.div`
  padding: 2rem;
//   max-width: 1200px;
width:100svw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

export const AnalyticsSection = styled.section`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const AnalyticsTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const AnalyticsChartContainer = styled.div`
  height: 400px;
  width: 100%;
  margin: 0 auto;

  canvas {
    max-width: 100%;
    height: auto !important;
  }

  @media (max-width: 992px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const AnalyticsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 480px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;