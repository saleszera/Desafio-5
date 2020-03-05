import React, { Component } from 'react';
import { FaGithubAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

// export default function Main() {
//   return (
//     /*
//       conteudo da primeira parte do modulo
//     */
//     // <Title error={false}>
//     //   Main
//     //   {/* <small>Outro texto</small> */}
//     // </Title>

//     /*
//       conteudo da segunda parte do modulo
//     */

//     <Container>
//       <h1>
//         <FaGithubAlt />
//         Repositórios
//       </h1>

//       <Form onSubmit={() => {}}>
//         <input type="text" placeholder="Adicionar Repositório" />

//         <SubmitButton>
//           <FaPlus color="#FFF" size={14} />
//         </SubmitButton>
//       </Form>
//     </Container>
//   );
// }

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    err: null,
  };

  /*
    Para carregar os dados do localstorage
  */
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  /*
    Para salvar dados no localstorage
  */

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    /*
      Pega oque está sendo digitado no input e adicionando a newRepo
    */
    this.setState({ newRepo: e.target.value, err: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, err: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw new Error('Informe o repositório!');

      const checkRepo = repositories.find(
        r => r.name.toUpperCase() === newRepo.toUpperCase()
      );

      if (checkRepo) throw new Error('Repositório duplicado');

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({ err: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, err } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={err}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {/*
              Verifica se está carregando, se sim, é exibido o icone de loading,
              se não, exibi o icone do sinal de "+"
            */}

            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaSearch color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/*
                como a variavel provavelmente terá '/' será gerado um encode
              */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
