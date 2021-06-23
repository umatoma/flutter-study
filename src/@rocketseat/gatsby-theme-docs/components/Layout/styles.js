import styled from '@emotion/styled';
import { darken } from 'polished';

export const Main = styled.main`
  padding: 0 40px;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 780px) {
    padding: 24px 24px 48px 24px;
  }
`;

export const Children = styled.div`
  width: 100%;
  min-width: 75%;
  max-width: 75%;

  @media (max-width: 1200px) {
    min-width: 100%;
    max-width: 100%;
  }

  ${({ hasTitle }) => !hasTitle && 'padding-top: 40px'};
`;

export const Wrapper = styled.div`
  padding-left: 280px;
  transition: transform 0.5s;

  @media (max-width: 780px) {
    padding-left: 0;
    transform: translate3d(
      ${({ isMenuOpen }) => (isMenuOpen ? '240px' : '0')},
      0,
      0
    );
  }
`;

export const Title = styled.h1`
  padding: 40px 0 0 40px;

  @media (max-width: 780px) {
    padding: 24px 0 0 24px;
  }
`;


export const Container = styled.div`
  position: sticky;
  order: 2;
  margin-left: 3rem;
  top: 4rem;
  overflow: auto;
  width: 360px;
  flex-shrink: 0;

  h2 {
    color: #737380;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.142em;
    margin-top: 0rem;
    border: none;
    margin: 0 0 24px 0;
  }

  nav ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    li {
      margin-bottom: 12px;
      line-height: 1.1;

      a {
        font-size: 13px;
        color: #999999;
        font-weight: 400;
        text-decoration: none;
        transition: all 0.2s;

        &:hover {
          color: ${({ theme }) => darken('0.2', theme.colors.sidebar.link)};
        }
      }
    }
  }

  @media (max-width: 1200px) {
    position: relative;
    top: auto;
    order: 0;
    width: 100%;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(120, 117, 122, 0.2);
  }
`;

export const Container9999 = styled.div`
  @media (max-width: 1200px) {
    display: block;
  }
  @media (max-width: 780px) {
    display: none;
  }
`;

export const MediaOnlyFull = styled.div`
  display: block;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const MediaOnly1200 = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: block;
  }
  @media (max-width: 780px) {
    display: none;
  }
`;

export const MediaOnly780 = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: block;
  }
`;