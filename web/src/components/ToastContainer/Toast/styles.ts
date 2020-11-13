import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'info' | 'success' | 'error';
  hasDescription: boolean;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled.div<ContainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 16px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: top;

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin-right: 12px;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  div {
    flex: 1;

    p {
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    display: flex;
    border: 0;
    background: transparent;
    color: inherit;
  }
`;
