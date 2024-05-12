import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 80vh;
  border-radius: 1.25rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const Button = styled.div`
  background-color: lightblue;
  padding: 0.625rem 1.25rem;
  border-radius: 0.4375rem;
  cursor: pointer;
  color: white;
  font-weight: 600;
  margin-top: 1.25rem;
`;

export const MapContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  margin: 3.5625rem 1.5625rem;
`;

export const SearchInput = styled.input`
  width: 18.75rem;
  height: 3.125rem;
  border: 0;
  border-radius: 0.1875rem;
  outline: none;
  text-indent: 0.625rem;
  font-size: 1.125rem;
`;

export const Search = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  background-color: #00ca5b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

