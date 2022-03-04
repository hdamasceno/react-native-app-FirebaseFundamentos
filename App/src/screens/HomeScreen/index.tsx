import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Header} from '@components/Header';
import {ProdutoList, ProdutoProps} from './ProdutoList';
import {Container, ContainerButtons, Button, ButtonText} from './styles';

export function HomeScreen() {
    const [produtoList, setProdutoList] = useState<ProdutoProps[]>([]);

    const handleGetListFromFirebase = useCallback(() => {
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
            }
        },
        [handleGetListFromFirebase],
    );

    useEffect(() => {
        handleGetListFromFirebase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header title="Home" showLogoutButton />
            <Container>
                <ContainerButtons>
                    <Button onPress={handleAddNewProduct}>
                        <ButtonText>Adicionar</ButtonText>
                    </Button>
                    <Button onPress={handleAddNewProduct}>
                        <ButtonText>Adicionar</ButtonText>
                    </Button>
                    <Button onPress={handleAddNewProduct}>
                        <ButtonText>Adicionar</ButtonText>
                    </Button>
                    <Button onPress={handleAddNewProduct}>
                        <ButtonText>Adicionar</ButtonText>
                    </Button>
                </ContainerButtons>
                <ProdutoList items={produtoList} handleDelete={handleDelete} />
            </Container>
        </>
    );
}
