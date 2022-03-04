import {getBottomSpace} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex: 1;
    width: 100%;
    padding: ${RFValue(10)}px;
    margin: ${RFValue(10)}px;
    margin-bottom: ${getBottomSpace()}px;
    background-color: ${({theme}) => theme.colors.TailWind.Pink[50]};
`;
