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
  border-radius: 7px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  margin-top: 1.25rem;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 25px 25px;
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 50px;
  border: 0;
  border-radius: 3px;
  outline: none;
  text-indent: 10px;
  font-size: 18px;
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
