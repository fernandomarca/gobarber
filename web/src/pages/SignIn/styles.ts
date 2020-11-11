import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/images/sign-in-background.png';

export const Container = styled.div`
  display: flex;

  height: 100vh;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* place-content: center; */
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    display: flex;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    align-items: center;
    /* justify-content: center; */
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
