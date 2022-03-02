import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMA from 'react-native-vector-icons/MaterialIcons';

import {Container} from './styles';
import theme from '../../../global/theme';

type Props = TouchableOpacityProps & {
    color?: 'success' | 'alert';
    size?: 'small' | 'large';
    iconType?: 'FA' | 'MA';
    iconName: string;
};

export function ButtonIcon({
    color = 'success',
    size = 'small',
    iconType = 'MA',
    iconName,
    ...rest
}: Props) {
    return (
        <Container activeOpacity={0.8} color={color} size={size} {...rest}>
            {iconType === 'FA' && (
                <IconFA
                    name={iconName}
                    size={size === 'small' ? 18 : 24}
                    color={theme.colors.white}
                />
            )}
            {iconType === 'MA' && (
                <IconMA
                    name={iconName}
                    size={size === 'small' ? 18 : 24}
                    color={theme.colors.white}
                />
            )}
        </Container>
    );
}
