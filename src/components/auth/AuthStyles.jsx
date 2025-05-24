import styled from 'styled-components';

export const AuthContainer = styled.div`
width:100svw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  background-color: #f5f7fa;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const AuthForm = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

export const AuthTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

export const AuthInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const AuthButton = styled.button`
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

export const AuthToggle = styled.p`
  text-align: center;
  color: #7f8c8d;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
    text-decoration: underline;
  }
`;

export const AuthError = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: -0.5rem;
`;