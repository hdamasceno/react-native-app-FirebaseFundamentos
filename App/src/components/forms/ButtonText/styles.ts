import styled from 'styled-components/native';

export const Title = styled.Text`
    font-size: 14px;
    font-family: ${({theme}) => theme.fonts.Poppins};
    color: ${({theme}) => theme.colors.TailWind.Gray[900]};
    margin-left: 7px;
`;
