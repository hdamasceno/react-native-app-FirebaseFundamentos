import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.TailWind.Gray[100]};
`;

export const UserNameTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    font-weight: 600;
    font-size: ${RFValue(22)}px;
    color: ${({theme}) => theme.colors.TailWind.Blue[500]};
    margin-top: ${RFValue(10)}px;
`;

export const PasswordTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    font-weight: 600;
    font-size: ${RFValue(22)}px;
    color: ${({theme}) => theme.colors.TailWind.Red[500]};
    margin-top: ${RFValue(10)}px;
`;
