import styled from 'styled-components';

export const MapWrapper = styled.div`
  position: relative;
  height: calc(100vh - 80px);
//   width: 100%;
width:100svw;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 500px;
  }
`;

export const MapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #2c3e50;
`;

export const MapError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #e74c3c;
`;

export const MapControlPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 250px;

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #2c3e50;
  }

  p {
    margin-bottom: 0.5rem;
    color: #7f8c8d;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    max-width: 100%;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.9rem;

    h2 {
      font-size: 1rem;
    }
  }
`;