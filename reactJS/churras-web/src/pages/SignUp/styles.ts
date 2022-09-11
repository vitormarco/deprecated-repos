import styled from 'styled-components';

export const Content = styled.div`
  min-width: 340px;

`;

export const ContentCreate = styled.div`
  background: #f1f1f1;
  padding: 24px;
  border-radius: 8px;
  margin-top: -50px;

  form {
    div {
      h3 {
        margin-bottom: 8px;
      }

      & + div {
        margin-top: 20px;
      }
    }

    button {
      margin-top: 40px;
    }
  }
`;

export const Footer = styled.footer`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

`;
