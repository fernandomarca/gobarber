import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  & + div {
    margin-top: 8px;
  }

  svg {
    color: #666360;
    margin-right: 16px;
  }

  input {
    background: transparent;
    border: 0;
    flex: 1;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }
`;
