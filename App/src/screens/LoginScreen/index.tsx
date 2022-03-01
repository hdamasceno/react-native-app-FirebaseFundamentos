import React from 'react';

import {Container, PasswordTitle, UserNameTitle} from './styles';

export function LoginScreen() {
    return (
        <Container>
            <UserNameTitle>João Paulo Moraes de Araújo</UserNameTitle>
            <UserNameTitle>Henry Damasceno Araujo de Lima</UserNameTitle>
            <PasswordTitle>Letícia de Castro Moraes</PasswordTitle>
            <PasswordTitle>Sofia Moraes Bezerra</PasswordTitle>
        </Container>
    );
}
