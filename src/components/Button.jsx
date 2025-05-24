// src/components/Button.jsx
import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

export default Button;
