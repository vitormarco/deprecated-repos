import React from 'react';

import logo from '../../assets/logo.png';

import {
  AnimationContainer,
  Footer,
  Content,
  Background,
  Container,
} from './styles';

const MainPage: React.FC = ({ children }) => (
  <Container>
    <Background>
      <h1>Agenda de Churras</h1>
    </Background>
    <Content>
      <AnimationContainer>{children}</AnimationContainer>
    </Content>
    <Footer>
      <img src={logo} alt="Trinca" />
    </Footer>
  </Container>
);

export default MainPage;
