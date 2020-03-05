import styled, { keyframes, css } from 'styled-components';

/*
  Primeira parte do modulo
*/
// export const Title = styled.h1`
//   color: #FFF;
//   /* font-size: 24px;
//   color: ${props =>
//     props.error
//       ? 'red'
//       : '#7159c1'}; //se a props contiver erro a cor é trocada por vermelho
//   font-family: Arial, Helvetica, sans-serif;

//   small { //estilização para a tag small
//     font-size: 14px;
//     color: #333;
//     margin-left: 5px;
//   } */
// `;

/*
  Segunda parte do modulo
*/

export const Form = styled.form`
  margin-top: 30px;
  /*
    Garante que o input e o botão fiquem alinhados um ao lado do outro
    independente do tamanho.
  */
  display: flex;
  flex-direction: row;

  input {
    /*
      Com "flex: 1" o input ocupa todo o espaço possível
    */
    flex: 1;
    border: ${props => (props.error ? '2px solid #FF0000' : '1px solid #eee')};
    /*
      10px em cima e em baixo e 15px na esqueda e na direita
    */
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

/*
  Animação para fazer o icone de loading girar
*/
const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  /*
    A propriedade disabled é associada a props.loading, ou seja,
    loading = disabled
  */
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /*
    Para alinhar os icones dentro do botão
  */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #9575ff;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /*
    Verifica se loading = true, se sim, é aplicada a animação
  */
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  /*
    Tira os pontos que vem por default da tag <ul>
  */
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    /*
      deixa a tag <span> para um lado e a tag <a> para o lado oposto
    */
    justify-content: space-between;
    align-items: center;
    /*
      Aplica a estilização em todas as tags <li> menos na primeira
    */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      /*
        tira o underline do link
      */
      text-decoration: none;
      &:hover {
        color: #9575ff;
      }
    }
  }
`;
