import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider, useAppContext } from './src/context/AppContext';
import { MonitorScreen } from './src/screens/MonitorScreen';
import { WeatherScreen } from './src/screens/WeatherScreen';
import { InfoScreen } from './src/screens/InfoScreen';
import { Colors, Spacing } from './src/styles/theme';
import { translations } from './src/utils/i18n';

const Tab = createBottomTabNavigator();

const Header: React.FC = () => {
    const { language, setLanguage } = useAppContext();
    const t = translations[language];

    return (
        <SafeAreaView style={styles.header} edges={['top']}>
            <View style={styles.headerContent}>
                <View style={styles.headerLeft}>
                    <Text style={styles.logo}>🌾</Text>
                    <View>
                        <Text style={styles.title}>{t.navTitle}</Text>
                        <Text style={styles.tagline}>{t.tagline}</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.langToggle}
                        onPress={() => setLanguage(language === 'en' ? 'ne' : 'en')}
                    >
                        <Text
                            style={[
                                styles.langText,
                                language === 'en' && styles.langActive,
                            ]}
                        >
                            EN
                        </Text>
                        <Text
                            style={[
                                styles.langText,
                                language === 'ne' && styles.langActive,
                            ]}
                        >
                            ने
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.navMeta}>
                        <View style={styles.statusDot} />
                        <Text style={styles.metaText}>{t.connected}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const TabBar: React.FC<{
    state: any;
    descriptors: any;
    navigation: any;
}> = ({ state, descriptors, navigation }) => {
    const { language } = useAppContext();
    const t = translations[language];

    const tabs = [
        { key: 'Monitor', label: t.tabMonitor, icon: '❄️' },
        { key: 'Weather', label: t.tabWeather, icon: '🌤️' },
        { key: 'Info', label: t.tabInfo, icon: '📚' },
    ];

    return (
        <SafeAreaView style={styles.tabBar} edges={['bottom']}>
            <View style={styles.tabBarContent}>
                {tabs.map((tab, index) => {
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: state.routes[index].key,
                            preventDefault: false,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(state.routes[index].name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={onPress}
                            style={[
                                styles.tab,
                                isFocused && styles.tabActive,
                            ]}
                        >
                            {isFocused && <View style={styles.tabIndicator} />}
                            <Text style={styles.tabIcon}>{tab.icon}</Text>
                            <Text
                                style={[
                                    styles.tabLabel,
                                    isFocused && styles.tabLabelActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

function AppNavigator() {
    return (
        <NavigationContainer>
            <View style={styles.appContainer}>
                <Header />
                <Tab.Navigator
                    tabBar={(props) => <TabBar {...props} />}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Tab.Screen
                        name="Monitor"
                        component={MonitorScreen}
                        options={{ title: 'Monitor' }}
                    />
                    <Tab.Screen
                        name="Weather"
                        component={WeatherScreen}
                        options={{ title: 'Weather' }}
                    />
                    <Tab.Screen
                        name="Info"
                        component={InfoScreen}
                        options={{ title: 'Info' }}
                    />
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <AppProvider>
                <AppNavigator />
            </AppProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    header: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        flex: 1,
    },
    logo: {
        fontSize: 32,
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: -0.3,
    },
    tagline: {
        fontSize: 11,
        color: Colors.muted,
        fontWeight: '500',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    langToggle: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 999,
        padding: 2,
        gap: 0,
    },
    langText: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: 999,
        fontSize: 11,
        fontWeight: '700',
        color: Colors.muted,
    },
    langActive: {
        backgroundColor: Colors.card,
        color: Colors.text,
    },
    navMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        backgroundColor: '#f8fafc',
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 999,
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: Colors.good,
    },
    metaText: {
        fontSize: 11,
        color: Colors.muted,
        fontWeight: '600',
    },
    tabBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        borderTopColor: Colors.border,
        borderTopWidth: 1,
    },
    tabBarContent: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        height: 68,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        color: Colors.muted,
    },
    tabActive: {
        color: Colors.accent,
    },
    tabIndicator: {
        position: 'absolute',
        top: 0,
        width: 32,
        height: 3,
        backgroundColor: Colors.accent,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    tabIcon: {
        fontSize: 22,
        lineHeight: 22,
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.muted,
    },
    tabLabelActive: {
        color: Colors.accent,
    },
});
