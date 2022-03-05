import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.white};
    align-items: center;
    margin-top: ${RFValue(20)}px;
`;

export const PhotoInfo = styled.Text`
    font-size: 12px;
    color: ${({theme}) => theme.colors.TailWind.Gray[900]};
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
`;
