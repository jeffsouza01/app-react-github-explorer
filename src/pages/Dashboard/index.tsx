import React, {FormEvent, useEffect, useState} from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

import api from '../../services/api';

interface Repository{
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError ] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);


    async function handleCreateRepository(
        event: FormEvent<HTMLFormElement>,): Promise<void> {
            event.preventDefault();

            if(!newRepo) {
                setInputError('Digite o autor/nome do repositório')
                return;
            }

            try {
                const response = await api.get<Repository>(`repos/${newRepo}`)

                const repository = response.data;

                setRepositories([...repositories, repository]);
                setNewRepo('');
                setInputError('');
            } catch(error) {
                setInputError('Repositório inválido ou não encontrado');
            }

        }



    return (
    <>
        <img src={logoImg} alt="Github Explorer"/>
        <Title> Explore repositórios no Github </Title>

        <Form hasError={!!inputError} onSubmit={handleCreateRepository}>
            <input
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder='Digite aqui o nome do repositório'
            />
            <button type="submit">Pesquisar</button>
        </Form>

        {inputError && <Error>{inputError} </Error>}

        <Repositories>
            {repositories.map(repository => (
            <Link key={repository.full_name} to={`repository/${repository.full_name}`}>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />

                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>

                <FiChevronRight size={30}/>
            </Link>

            ))}

        </Repositories>
    </>
    )
};

export default Dashboard;
