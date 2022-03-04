import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
    display: flex;
    padding: ${RFValue(8)}px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.TailWind.Indigo[100]};
    margin-bottom: ${RFValue(3)}px;
`;

export const ContainerItem = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ContainerItemHeader = styled.View``;

export const Nome = styled.Text`
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    font-size: ${RFValue(13)}px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.TailWind.Indigo[600]};
`;

export const Button = styled(TouchableOpacity)``;

export const ButtonTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    font-size: ${RFValue(13)}px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.TailWind.Red[500]};
`;
