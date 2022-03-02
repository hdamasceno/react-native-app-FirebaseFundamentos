import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
    type: TypeProps;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
    display: flex;
    flex: 1;
    max-height: 56px;
    min-height: 56px;
    width: 100%;
    border-radius: 12px;
    margin-top: 12px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme, type}) =>
        type === 'primary'
            ? theme.colors.TailWind.Gray[200]
            : theme.colors.TailWind.Blue[200]};
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.Poppins};
    color: ${({theme}) => theme.colors.TailWind.Blue[900]};
    font-size: 14px;
    font-weight: 500;
`;
