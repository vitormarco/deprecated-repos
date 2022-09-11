import styled from 'styled-components';

export const Container = styled.button`
  background: #000;
  height: 56px;
  border-radius: 50px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 74px;
  transition: background-color 0.2s;

  &:hover {
    background: #fff;
    color: #000;
    font-weight: 700
  }
`;
