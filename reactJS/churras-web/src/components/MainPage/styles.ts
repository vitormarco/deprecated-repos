import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/bbq-pattern.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  position: relative;
`;

export const Background = styled.header`
  display: flex;
  justify-content: center;

  h1 {
    margin-top: 70px
  }

  background: url(${signInBackgroundImg}) no-repeat center, #FFD836;
  background-size: cover;
  width: 100%;
  height: 30vh;
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  width: 100%;

  footer {
    justify-content: space-between;
    width: 100%;
    max-width: 588px;
    animation: ${appearFromTop} 1s;
    margin-top: 25px;

    button {
      margin-top: 0;
      width: 150px;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-weight: bold;
      height: 20px;
      color: #474a51;
      transition: color 0.2s;

      &:hover {
        color: ${shade(1, '#474a51')}
      }

      svg {
        margin-right: 4px;
      }
    }
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  animation: ${appearFromTop} 1s;
`;

export const Footer = styled.footer`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-top: auto;
    margin-bottom: 15px;

    width: 48px;
    height: 48px;
  }
`;
