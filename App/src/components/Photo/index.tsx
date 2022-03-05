import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {Container, EmptyPhotoContainer, Image, EmptyPhotoText} from './styles';

type Props = TouchableOpacityProps & {
    uri?: string;
    handlePickImage(): Promise<void>;
};

export function Photo({uri, handlePickImage, ...rest}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePickImage}
            {...rest}>
            <Container>
                {uri ? (
                    <Image source={{uri}} />
                ) : (
                    <EmptyPhotoContainer>
                        <EmptyPhotoText>
                            nenhuma foto selecionada
                        </EmptyPhotoText>
                    </EmptyPhotoContainer>
                )}
            </Container>
        </TouchableOpacity>
    );
}
