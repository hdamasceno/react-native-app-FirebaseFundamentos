import React from 'react';
import auth from '@react-native-firebase/auth';

import {ButtonLogout, Container, Title} from './styles';
import {Text} from 'react-native';

type Props = {
    title: string;
    showLogoutButton?: boolean;
};

export function Header({title, showLogoutButton = false}: Props) {
    function handleLogout() {
        auth().signOut();
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
