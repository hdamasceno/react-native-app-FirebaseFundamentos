import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
`;
