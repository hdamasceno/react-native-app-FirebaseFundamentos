import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
`;

export const ContainerButtons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${RFValue(10)}px;
    margin-bottom: ${RFValue(5)}px;
`;

export const Button = styled(TouchableOpacity)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.TailWind.Indigo[100]};
    border-radius: ${RFValue(10)}px;
    padding: ${RFValue(10)}px;
    margin-left: ${RFValue(8)}px;
`;

export const ButtonText = styled.Text`
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    font-size: ${RFValue(13)}px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.TailWind.Gray[700]};
`;

export const FilterContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
    width: 100%;
`;
