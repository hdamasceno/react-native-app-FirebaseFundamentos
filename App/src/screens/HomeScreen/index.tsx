import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Header} from '@components/Header';
import {ProdutoList, ProdutoProps} from './ProdutoList';
import {
    Container,
    ContainerButtons,
    Button,
    ButtonText,
    FilterContainer,
} from './styles';
import {Input} from '@components/forms/Input';

export function HomeScreen() {
    const [filterText, setFilterText] = useState<string>('');
    const [produtoList, setProdutoList] = useState<ProdutoProps[]>([]);

    const handleGetListFromFirebase = useCallback(() => {
        setProdutoList([]);

        firestore()
            .collection('Produto')
            .get()
            .then(response => {
                const tempData = response.docs.map(
                    item =>
                        ({
                            id: item.id,
                            referenciaCodigo: item.data().referenciaCodigo,
                            nome: item.data().nome,
                        } as ProdutoProps),
                );

                setProdutoList(tempData);
            });
    }, []);

    const handleAddNewProduct = useCallback(() => {
        const newProduct = {
            nome: 'Produto - ' + Number(new Date()).toString(),
            referenciaCodigo: Number(new Date()).toString(),
        };

        firestore().collection('Produto').add(newProduct);
        handleGetListFromFirebase();
    }, [handleGetListFromFirebase]);

    const handleDelete = useCallback(
        async (id: string) => {
            const produto = await firestore()
                .collection('Produto')
                .doc(id)
                .get();

            if (produto.exists) {
                await firestore().collection('Produto').doc(id).delete();
                handleGetListFromFirebase();
            } else {
                handleGetListFromFirebase();
            }
        },
        [handleGetListFromFirebase],
    );

    const handleFiltrar = useCallback(() => {
        console.log(filterText);
    }, [filterText]);

    useEffect(() => {
        handleGetListFromFirebase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header title="Home" showLogoutButton />
            <Container>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ContainerButtons>
                        <Button onPress={handleGetListFromFirebase}>
                            <ButtonText>Atualizar</ButtonText>
                        </Button>
                        <Button onPress={handleAddNewProduct}>
                            <ButtonText>Adicionar</ButtonText>
                        </Button>
                        <Button onPress={handleFiltrar}>
                            <ButtonText>Filtrar</ButtonText>
                        </Button>
                    </ContainerButtons>
                    <FilterContainer>
                        <Input
                            placeholder="Filtrar..."
                            type="secondary"
                            onChangeText={setFilterText}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry
                        />
                    </FilterContainer>
                </KeyboardAvoidingView>
                <ProdutoList items={produtoList} handleDelete={handleDelete} />
            </Container>
        </>
    );
}
