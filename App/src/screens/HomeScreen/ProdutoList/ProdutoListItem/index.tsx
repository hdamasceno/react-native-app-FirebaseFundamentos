import React from 'react';
import {ProdutoProps} from '../index';

import {
    Container,
    ContainerItem,
    ContainerItemHeader,
    Nome,
    Button,
    ButtonTitle,
} from './styles';

interface Props {
    item: ProdutoProps;
    handleDelete(id: string): Promise<void>;
}

export function ProdutoListItem({item, handleDelete}: Props) {
    return (
        <Container>
            <ContainerItem>
                <ContainerItemHeader>
                    <Nome>{item.nome}</Nome>
                </ContainerItemHeader>
                <Button onPress={() => handleDelete(item.id)}>
                    <ButtonTitle>Excluir</ButtonTitle>
                </Button>
            </ContainerItem>
        </Container>
    );
}
