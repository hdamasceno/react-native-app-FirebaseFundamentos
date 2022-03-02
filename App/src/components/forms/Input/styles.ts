import styled, {css} from 'styled-components/native';
import {TextInput} from 'react-native';
export type TypeProps = 'primary' | 'secondary';

type Props = {
    type: TypeProps;
};

export const Container = styled(TextInput).attrs<Props>(({theme, type}) => ({
    placehorderTextColor:
        type === 'primary'
            ? theme.colors.TailWind.Gray[100]
            : theme.colors.TailWind.Gray[900],
}))<Props>`
    width: 100%;
    height: 56px;
    background-color: transparent;
    border-radius: 8px;
    font-size: 14px;
    padding: 7px 0;
    padding-left: 20px;
    margin-bottom: 16px;
    margin-top: 8px;

    ${({theme, type}) => css`
        font-family: ${theme.fonts.Poppins};
        border: 1px solid ${theme.colors.TailWind.Gray[300]};
        color: ${type === 'primary'
            ? theme.colors.TailWind.Gray[700]
            : theme.colors.TailWind.Blue[700]};
    `}
`;
