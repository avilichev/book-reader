/* eslint-disable @typescript-eslint/ban-types */
import styled from 'styled-components';

type LayoutType = typeof Layout & {
  Header: typeof Header;
  Content: typeof Content;
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  position: relative;
  z-index: 1500;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

const Content = styled.div`
  flex: 1 0 auto;
  position: relative;
`;

(Layout as LayoutType).Header = Header;
(Layout as LayoutType).Content = Content;

export default Layout as LayoutType;
