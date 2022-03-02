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
    children,
    ...rest
}: Props) {
    return (
        <Container type={type} disabled={isLoading} {...rest}>
            {isLoading ? {children} : <Title>{title}</Title>}
        </Container>
    );
}
