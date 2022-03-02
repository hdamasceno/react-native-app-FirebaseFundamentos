import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex: 1;

    background-color: ${({theme}) => theme.colors.TailWind.Gray[100]};
`;

export const Content = styled.ScrollView.attrs({
    showsVerticalScrollbar: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace(),
    },
})`
    width: 100%;
    height: 100%;
    padding: ${getStatusBarHeight() + 20}px 32px;
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

export const Account = styled.View`
    width: 100%;
    margin-top: 32px;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
`;
