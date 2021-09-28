import styled from 'styled-components';

export const BookWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const BookContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const BookActionButton = styled.button`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100%;
  color: #222222;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 200ms cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const BookPaper = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 120px);
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;
