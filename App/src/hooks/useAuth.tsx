import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

interface ContextProviderProps {
    children: ReactNode;
}

interface AuthenticatedUserProps {
    id: string;
}

interface ContextProps {
    isAuthenticated: boolean;
    authenticatedUser: AuthenticatedUserProps;

    Authenticate(email: string, senha: string): Promise<void>;
    UserForgotPasswordEmailNotify(email: string): Promise<void>;
    UserCreateNewAccount(email: string, senha: string): Promise<void>;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

export function AuthProvider({children}: ContextProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authenticatedUser, setAuthenticatedUser] =
        useState<AuthenticatedUserProps>({} as AuthenticatedUserProps);

    const handleAuthenticateUser = useCallback(
        async (email: string, senha: string) => {
            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(({user}) => {
                    setAuthenticatedUser({
                        id: user.uid,
                    } as AuthenticatedUserProps);
                    setIsAuthenticated(true);
                })
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
        },
        [],
    );

    const handleForgotPasswordEmailNotification = useCallback(
        async (email: string) => {
            auth()
                .sendPasswordResetEmail(email)
                .then(() =>
                    Alert.alert(
                        'Enviamos um link no seu e-mail para você redefinir sua senha.',
                    ),
                )
                .catch(error => console.log(error));
        },
        [],
    );

    const handleCreateNewUserAccount = useCallback(
        async (email: string, senha: string) => {
            auth()
                .createUserWithEmailAndPassword(email, senha)
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
                        return Alert.alert(
                            'A senha deve ter no mínimo 6 dígitos.',
                        );
                    }
                });
        },
        [],
    );

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticatedUser,
                Authenticate: handleAuthenticateUser,
                UserForgotPasswordEmailNotify:
                    handleForgotPasswordEmailNotification,
                UserCreateNewAccount: handleCreateNewUserAccount,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
