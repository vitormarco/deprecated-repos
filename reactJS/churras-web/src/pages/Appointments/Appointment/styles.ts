import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 calc(50% - 12px);
  margin-bottom: 24px;
  height: 192px;

  @media(max-width: 485px) {
    flex: 0 100%;
  }


  a {
    text-decoration: none;
    color: #000;
    flex: 1;
    height: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  transition: background-color 0.2s;

  &:hover {
    background: #f0f0f0
  }

  height: 100%;
  padding: 24px;

  div {
    h2 {
      margin-bottom: 8px;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: auto;

  div {
    display: flex;

    span {
      font-weight: bold;
    }

    svg {
      color: #FFD836;
      margin-right: 12px;
    }

    & + div {
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;


        border-radius: 50%;
        width: 30px;
        height: 30px;

        background: #FFD836;

        svg {
          margin-right: 0;
          color: #fff;
        }
      }

    }
  }
`;

export const ContentCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #F1F1F1;
  transition: background-color 0.2s;

  height: 100%;
  padding: 24px;

  &:hover {
    background: ${shade(0.1, '#F1F1F1')}
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-bottom: 8px;

    background: #FFD836;
  }
`;
