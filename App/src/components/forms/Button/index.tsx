import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Container, Title, TypeProps} from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    type: TypeProps;
    isLoading?: boolean;
};

export function Button({
    title,
    isLoading = false,
    type = 'primary',
    ...rest
}: Props) {
    return (
        <Container type={type} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
}
