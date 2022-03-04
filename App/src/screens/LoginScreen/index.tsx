import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {Button} from '@components/forms/Button';
import {ButtonText} from '@components/forms/ButtonText';
import {Input} from '../../components/forms/Input';

import {
    Container,
    PasswordTitle,
    UserNameTitle,
    Account,
    Content,
} from './styles';

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {UserCreateNewAccount, UserForgotPasswordEmailNotify, Authenticate} =
        useAuth();

    function handleForgotPassword() {
        UserForgotPasswordEmailNotify(email);
    }

    function handleSignInWithEmailAndPassword() {
        Authenticate(email, password);
    }

    function handleCreateUserAccount() {
        UserCreateNewAccount(email, password);
    }

    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Content>
                    <UserNameTitle>Email</UserNameTitle>
                    <Input
                        placeholder="Email"
                        type="primary"
                        onChangeText={setEmail}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    <PasswordTitle>Senha</PasswordTitle>
                    <Input
                        placeholder="Senha"
                        type="secondary"
                        onChangeText={setPassword}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    <Button
                        title="Login"
                        type="primary"
                        onPress={handleSignInWithEmailAndPassword}
                    />

                    <Account>
                        <ButtonText
                            title="Recuperar senha"
                            onPress={handleForgotPassword}
                        />
                        <ButtonText
                            title="Criar minha conta"
                            onPress={handleCreateUserAccount}
                        />
                    </Account>
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}
