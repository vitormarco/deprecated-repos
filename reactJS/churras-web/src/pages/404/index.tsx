import React from 'react';
import { Link } from 'react-router-dom';
import MainPage from '../../components/MainPage';

const SignIn: React.FC = () => (
  <MainPage>
    <h2 style={{ marginTop: '40px' }}>Página não encontrada. 404</h2>
    <Link to="/" />
  </MainPage>
);

export default SignIn;
