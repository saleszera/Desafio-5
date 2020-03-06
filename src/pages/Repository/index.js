import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import api from '../../services/api';
import { Loading, Owner, IssueList, IssueFilter, IssuePage } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ repository: PropTypes.string }),
    }).isRequired,
  };

  state = {
    /*
      Como é um unico objeto, repository é iniciado como objeto
    */
    repository: {},
    /*
      Como são muitos objetos, issues é retornada como array
    */
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todos', active: true },
      { state: 'open', label: 'Abertos', active: false },
      { state: 'closed', label: 'Fechados', active: false },
    ],
    filterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    /*
      Com Promise.all ele resolve as requisições axios ao mesmo tempo e é retornado um array.
      Por isso foi desestruturado e a primeira posição é o repository e a segunda as issues.
    */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      /*
        De issues são retornadas apenas issues que ainda não foram resolvidas, ou seja, que
        estão em aberto e são retornadas apenas 5 itens.
      */
      api.get(`/repos/${repoName}/issues`, {
        params: { state: filters.find(f => f.active).state, per_page: 5 },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  handleClick = async action => {
    const { page } = this.state;
    await this.setState({ page: action === 'back' ? page - 1 : page + 1 });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, filters, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssueFilter>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>

          {issues.map(issue => (
            <li key={String(issue.id)}>
              {/* pega o avatar do usuario da issue */}
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {/* labels */}
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <IssuePage>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handleClick('back')}
          >
            <FaChevronLeft />
          </button>

          <button type="button" onClick={() => this.handleClick('next')}>
            <FaChevronRight />
          </button>
        </IssuePage>
      </Container>
    );
  }
}

// export default function Repository({ match }) {
//   /*
//     Decodigica a / que está dentro de repository, essa variavel é pega por match.params
//   */
//   return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
// }
