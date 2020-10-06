import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    //const { params } = useRouteMatch<RepositoryParams>();

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer"/>
                <Link to='/'>
                    < FiChevronLeft size={18} />
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo >
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/42705353?s=460&u=041225cea197fbaa534cb12c0198973e8cb55ed2&v=4" alt="Jeffsouza01"/>
                    <div>
                        <strong>jeffsouza01/api-authentication</strong>
                        <p>descrição do repositorio</p>
                    </div>
                </header>

                <ul>
                    <li>
                        <strong>100</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>12</strong>
                        <span>Issues Abertas</span>
                    </li>
                </ul>

            </RepositoryInfo>


            <Issues>
                <Link to='hohoho'>
                    <div>
                        <strong>Teste </strong>
                        <p>Teste</p>
                    </div>

                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    )
}

export default Repository;
