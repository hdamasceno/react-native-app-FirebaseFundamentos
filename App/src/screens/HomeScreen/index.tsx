import React from 'react';
import {Button} from '@components/forms/Button';
import {Header} from '@components/Header';

import {Container} from './styles';

export function HomeScreen() {
    return (
        <>
            <Header title="Home" showLogoutButton />
            <Container>
                <Button title="Adicionar Documento" type="secondary" />
                <Button title="Alterar Documento" type="secondary" />
                <Button title="Excluir Documento" type="secondary" />
                <Button title="Filtrar Documentos" type="secondary" />
            </Container>
        </>
    );
}
