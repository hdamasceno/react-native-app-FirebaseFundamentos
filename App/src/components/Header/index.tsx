import React from 'react';

import {ButtonLogout, Container, Title} from './styles';
import {Text} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

type Props = {
    title: string;
    showLogoutButton?: boolean;
};

export function Header({title, showLogoutButton = false}: Props) {
    const {UserLogout} = useAuth();

    function handleLogout() {
        UserLogout();
    }

    return (
        <Container showLogoutButton={showLogoutButton}>
            <Title>{title}</Title>

            {showLogoutButton && (
                <ButtonLogout onPress={handleLogout}>
                    <Text>Sair</Text>
                </ButtonLogout>
            )}
        </Container>
    );
}
