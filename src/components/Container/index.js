import styled, { keyframes } from 'styled-components';

const move = keyframes`
  from{
    opacity: 0;
    transform: translateX(-35%);
  }
  to{
    opacity: 1;
    transform: translateX(0)
  }
`;

const Container = styled.div`
  min-width: 300px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  animation: ${move} 900ms;

  h1 {
    font-size: 20px;
    /*
      Alinha tudo na mesma altura
    */
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }
`;

export default Container;
