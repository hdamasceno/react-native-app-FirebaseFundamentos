import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const UserNameTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    font-weight: 600;
    font-size: ${RFValue(20)}px;
`;
