import React from 'react';
import {FlatList} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {ProdutoListItem} from './ProdutoListItem';

import {Container} from './styles';

export interface ProdutoProps {
    id: string;
    referenciaCodigo: string;
    nome: string;
}

interface Props {
    items: ProdutoProps[];
    handleDelete(id: string): Promise<void>;
}

export function ProdutoList({items: produtoList, handleDelete}: Props) {
    return (
        <Container>
            <FlatList
                data={produtoList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    paddingBottom: getBottomSpace(),
                }}
                renderItem={({item}) => (
                    <ProdutoListItem item={item} handleDelete={handleDelete} />
                )}
            />
        </Container>
    );
}
