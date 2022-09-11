import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #FFFFFF;
  border-radius: 10px;
  padding: 16px;
  width: 100%;


  border: 2px solid #FFFFFF;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) => props.isErrored && css`
    border-color: #c53030;
  `}

  ${(props) => props.isFocused && css`
    color: #c0c0c0 ;
    border-color: #c0c0c0 ;
  `}

  ${(props) => props.isField && css`
    color: #c0c0c0 ;
  `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px #FFFFFF inset !important;
      box-shadow: 0 0 0 30px #FFFFFF inset;
      -webkit-text-fill-color: #666360 !important;
    }

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
