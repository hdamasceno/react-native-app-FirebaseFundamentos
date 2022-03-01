import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {ThemeProvider} from 'styled-components';
import theme from './global/theme';
import {Routes} from './routes';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.safeAreaView}>
                <Routes />
            </View>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
});

export default App;
