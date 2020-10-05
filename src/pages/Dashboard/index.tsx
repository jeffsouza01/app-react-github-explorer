import React, {FormEvent, useState} from 'react';
import { FiChevronRight } from 'react-icons/fi';

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
    const [repositories, setRepositories] = useState<Repository[]>([]);

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
            <a key={repository.full_name} href="Testing">
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />

                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>

                <FiChevronRight size={30}/>
            </a>

            ))}

        </Repositories>
    </>
    )
};

export default Dashboard;
