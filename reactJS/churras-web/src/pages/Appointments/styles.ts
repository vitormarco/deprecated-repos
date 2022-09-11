import styled, { keyframes } from 'styled-components';

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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

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
  width: 100%;

  animation: ${appearFromTop} 1s;


`;

export const ListAppointment = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 24px;
  margin-top: -50px;


  background: transparent;

  width: 100%;
  max-width: 588px;


  > div:nth-child(odd) {
    margin-right: 24px;

    @media(max-width: 485px) {
      margin-right: 0;
    }
  }
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
