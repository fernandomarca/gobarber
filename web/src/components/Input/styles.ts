import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `};

  svg {
    margin-right: 16px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  input {
    background: transparent;
    border: 0;
    flex: 1;
    color: #f4ede8;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      box-shadow: 0 0 0 30px #232129 inset !important;
      -webkit-text-fill-color: #f4ede8 !important;
    }

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  width: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
    color: #c53030;
  }

  span {
    background: #c53030;
    color: #ffff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
