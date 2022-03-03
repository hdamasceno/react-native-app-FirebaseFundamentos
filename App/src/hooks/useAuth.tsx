import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface ContextProviderProps {
    children: ReactNode;
}

interface AuthenticatedUserProps {
    id: string;
    name: string;
    isAdmin: boolean;
}

interface ContextProps {
    isAuthenticated: boolean;
    authenticatedUser: AuthenticatedUserProps;

    Authenticate(email: string, senha: string): Promise<void>;
    AuthenticateAnonymously(): Promise<void>;
    UserForgotPasswordEmailNotify(email: string): Promise<void>;
    UserCreateNewAccount(email: string, senha: string): Promise<void>;
    UserLogout(): Promise<void>;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

export function AuthProvider({children}: ContextProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authenticatedUser, setAuthenticatedUser] =
        useState<AuthenticatedUserProps>({} as AuthenticatedUserProps);

    const handleGetUserFromFirebase = useCallback((userId: string) => {
        firestore()
            .collection('Usuario')
            .doc(userId)
            .get()
            .then(response => {
                if (response.exists) {
                    const {name, isAdmin} =
                        response.data() as AuthenticatedUserProps;

                    setAuthenticatedUser({
                        id: userId,
                        name,
                        isAdmin,
                    });
                } else {
                    // salvar usuario na base de dados
                }
            });
    }, []);

    const handleSaveUserProfileAfterCreation = useCallback(
        async (email: string, senha: string) => {
            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(({user}) => {
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        isAdmin: false,
                    } as AuthenticatedUserProps;

                    firestore().collection('Usuario').add(newUser);
                })
                .catch(error => {
                    setIsAuthenticated(false);
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

    const handleAuthenticateUserAnonymously = useCallback(async () => {
        const {user} = await auth().signInAnonymously();
        setAuthenticatedUser({
            id: user.uid,
        } as AuthenticatedUserProps);
        setIsAuthenticated(true);
    }, []);

    const handleUserLogout = useCallback(async () => {
        auth().signOut();
        setAuthenticatedUser({} as AuthenticatedUserProps);
        setIsAuthenticated(false);
    }, []);

    const handleAuthenticateUser = useCallback(
        async (email: string, senha: string) => {
            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(({user}) => {
                    handleGetUserFromFirebase(user.uid);
                })
                .catch(error => {
                    setIsAuthenticated(false);
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
        [handleGetUserFromFirebase],
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
                .then(() => {
                    handleSaveUserProfileAfterCreation(email, senha);

                    Alert.alert('Usuário criado com sucesso!');
                })
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
        [handleSaveUserProfileAfterCreation],
    );

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticatedUser,
                Authenticate: handleAuthenticateUser,
                AuthenticateAnonymously: handleAuthenticateUserAnonymously,
                UserForgotPasswordEmailNotify:
                    handleForgotPasswordEmailNotification,
                UserCreateNewAccount: handleCreateNewUserAccount,
                UserLogout: handleUserLogout,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
