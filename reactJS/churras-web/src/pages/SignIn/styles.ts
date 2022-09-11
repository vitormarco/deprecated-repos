import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/bbq-pattern.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background: #FFD836;
  flex-direction: column;
  position: relative;

`;

export const Background = styled.header`
  display: flex;
  justify-content: center;

  h1 {
    margin-top: 70px
  }

  background: linear-gradient(0deg, #FFD836 0%, rgba(255, 216, 54, 0) 100%), url(${signInBackgroundImg}) no-repeat center ;
  background-size: cover;
  width: 100%;
  height: 40vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 300px;

  animation: ${appearFromTop} 1s;

  form {
      position: absolute;
      top: -15vh;
      width: 340px;
      text-align: center;

      a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, '#f4ede8')}
        }
      }

      div {
        text-align: left;

        h3 {
          margin-bottom: 24px;
          font-size: 21px;
        }

        & + div {
          margin-top: 24px;
        }
      }
    }
`;

export const FooterForm = styled.footer`
  a {
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Footer = styled.footer`
  flex: 1;
  position: relative;

  img {
    position: absolute;
    bottom: 15px;

    width: 48px;
    height: 48px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;
