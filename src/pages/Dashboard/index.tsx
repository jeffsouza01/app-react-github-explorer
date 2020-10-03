import React, {FormEvent, useState} from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

import api from '../../services/api';

const Dashboard: React.FC = () => {
    const [newRepo, setNetRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    async function handleCreateRepository(
        event: FormEvent<HTMLFormElement>,): Promise<void> {
            event.preventDefault();

            const response = await api.get(`repos/${newRepo}`)

            const repository = response.data;

            //setRepositories([...repositories, repository]);
        }



    return (
    <>
        <img src={logoImg} alt="Github Explorer"/>
        <Title> Explore repositórios no Github </Title>

        <Form>
            <input placeholder='Digite aqui o nome do repositório'/>
            <button type="submit">Pesquisar</button>
        </Form>


        <Repositories>
            <a href="Testing">
                <img src="https://avatars0.githubusercontent.com/u/42705353?s=460&u=041225cea197fbaa534cb12c0198973e8cb55ed2&v=4"
                alt="Jefferson da Silva"/>

                <div>
                    <strong>jeffsouza01/api-authentication</strong>
                    <p>API para criação e autenticação de usuários.</p>
                </div>

                <FiChevronRight size={30}/>
            </a>

        </Repositories>
    </>
    )
)};

export default Dashboard;
