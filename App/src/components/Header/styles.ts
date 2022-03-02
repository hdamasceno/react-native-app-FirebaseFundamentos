import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import HomeIcon from '@assets/SvgIcons/FontAwesome/solid/heart.svg';

type ContainerProps = {
    showLogoutButton: boolean;
};

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 100px;
    background-color: ${({theme}) => theme.colors.TailWind.Indigo[100]};
    flex-direction: ${({showLogoutButton}) =>
        showLogoutButton ? 'row' : 'column'};
    align-items: center;
    justify-content: ${({showLogoutButton}) =>
        showLogoutButton ? 'space-around' : 'center'};
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.colors.TailWind.Indigo[900]};
    font-family: ${({theme}) => theme.fonts.LeagueSpartan};
    margin-top: ${getStatusBarHeight()}px;
`;

export const ButtonLogout = styled(TouchableOpacity)`
    margin-top: ${RFValue(20)}px;
`;

export const ButtonLogoutIcon = styled.View`
    color: ${({theme}) => theme.colors.TailWind.Indigo[900]};
`;

export const ButtonLogoutHomeIcon = styled(HomeIcon)`
    color: ${({theme}) => theme.colors.black};
`;
