import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  /*
    Alinha horizontalmente ao centro
   */
  justify-content: center;
  align-items: center;
  /*
    Altura total da tela
   */
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  /*
    Para ficar um item em baixo do outro
   */
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    /*
      Maximo de pixels que a tag pode ocupar
     */
    max-width: 400px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: #9575ff;
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 50px;

  button {
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    height: 50px;
    margin-bottom: 25px;

    &:hover {
      background: #9575ff;
    }
  }
`;

export const IssuePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  margin-top: 30px;

  button {
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    height: 50px;

    &:hover {
      background: #9575ff;
    }
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
      background: #7159c1;
    }
  }
`;
