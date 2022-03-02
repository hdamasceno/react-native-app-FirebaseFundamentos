import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
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

    function handleForgotPassword() {
        auth()
            .sendPasswordResetEmail(email)
            .then(() =>
                Alert.alert(
                    'Enviamos um link no seu e-mail para você redefinir sua senha.',
                ),
            )
            .catch(error => console.log(error));
    }

    /*
    async function handleSignInAnonymously() {
        const {user} = await auth().signInAnonymously();
        console.log(user);
    }
    */

    function handleSignInWithEmailAndPassword() {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(({user}) => console.log(user))
            .catch(error => {
                console.log(error.code);

                if (
                    error.code === 'auth/user-not-found' ||
                    error.code === 'auth/wrong-password'
                ) {
                    Alert.alert(
                        'Usuário não encontrado. E-mail e/ou senha inválida!',
                    );
                }
            });
    }

    function handleCreateUserAccount() {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => Alert.alert('Usuário criado com sucesso!'))
            .catch(error => {
                console.log(error.code);

                if (error.code === 'auth/email-already-in-use') {
                    return Alert.alert(
                        'E-mail não disponível. Escolha outro e-mail para cadastrar!',
                    );
                }

                if (error.code === 'auth/invalid-email') {
                    return Alert.alert('E-mail inválido!');
                }

                if (error.code === 'auth/weak-password') {
                    return Alert.alert('A senha deve ter no mínimo 6 dígitos.');
                }
            });
    }

    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Content>
                    <UserNameTitle>Email</UserNameTitle>
                    <Input
                        placeholder="Email"
                        type="secondary"
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
                    <Button
                        title="Criar Conta"
                        type="secondary"
                        onPress={handleCreateUserAccount}
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
