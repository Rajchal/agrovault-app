import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { useAppContext } from '@context/AppContext';
import { KPICard } from '@components/KPICard';
import { Card, CardHeader, CardBody, CardSection, Badge } from '@components/Card';
import { CropChips } from '@components/CropChips';
import { AlertsList } from '@components/AlertItem';
import {
    ControlField,
    ModeSelect,
    SliderField,
    Toggle,
} from '@components/Controls';
import { Colors, Spacing, BorderRadius } from '@styles/theme';
import { translations } from '@utils/i18n';

const CROPS = [
    { code: 'TOMATO', name: 'Tomato', emoji: '🍅' },
    { code: 'ONION', name: 'Onion', emoji: '🧅' },
    { code: 'POTATO', name: 'Potato', emoji: '🥔' },
    { code: 'LEAFY_GREENS', name: 'Leafy Greens', emoji: '🥬' },
    { code: 'CARROT', name: 'Carrot', emoji: '🥕' },
];

export const MonitorScreen: React.FC = () => {
    const {
        language,
        mode,
        setMode,
        selectedCrops,
        setSelectedCrops,
        doorOpen,
        setDoorOpen,
        gridOn,
        setGridOn,
        temp,
        setTemp,
        humidity,
        setHumidity,
        battery,
        setBattery,
        compressorOn,
        setCompressorOn,
        loading,
        refreshing,
        error,
        humidityHistory,
        refreshData,
    } = useAppContext();

    const t = translations[language];

    const [manualTempValue, setManualTempValue] = useState(6);
    const [manualHumValue, setManualHumValue] = useState(90);

    const alerts = [
        {
            type: 'ok' as const,
            title: 'Temperature Normal',
            message: `${temp.toFixed(1)}°C — within safe range`,
        },
        {
            type: 'ok' as const,
            title: 'System Status',
            message: 'All sensors operational. Battery good.',
        },
    ];

    const humidityChartData = {
        labels: humidityHistory.map((_, index) => `${index + 1}`),
        datasets: [
            {
                data: humidityHistory.length > 0 ? humidityHistory : [humidity],
                color: () => Colors.accent,
                strokeWidth: 3,
            },
        ],
    };

    const shelf = [
        { name: 'Tomato', emoji: '🍅', days: 21 },
        { name: 'Onion', emoji: '🧅', days: 60 },
        { name: 'Potato', emoji: '🥔', days: 90 },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Loading Overlay */}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>Connecting to ESP32...</Text>
                </View>
            )}

            {/* Error Banner */}
            {error && !loading && (
                <View style={styles.errorBanner}>
                    <Text style={styles.errorText}>⚠️ {error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={refreshData}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Section Header */}
                <CardSection
                    title={t.secMonitor}
                    badge={<Badge text={t.unitBadge} />}
                >
                    {/* KPI Cards */}
                    <View style={styles.kpiRow}>
                        <View style={styles.kpiColumn}>
                            <KPICard
                                label={t.temp}
                                emoji="🌡️"
                                value={temp.toFixed(1)}
                                sub="Current"
                                tag={{ text: t.normal, type: 'ok' }}
                            />
                        </View>
                        <View style={styles.kpiColumn}>
                            <KPICard
                                label={t.hum}
                                emoji="💧"
                                value={`${humidity}%`}
                                sub="Current"
                                tag={{ text: t.normal, type: 'ok' }}
                            />
                        </View>
                    </View>

                    <View style={styles.kpiRow}>
                        <View style={styles.kpiColumn}>
                            <KPICard
                                label={t.bat}
                                emoji="🔋"
                                value={`${battery}%`}
                                sub="Battery"
                                tag={{ text: t.good, type: 'ok' }}
                            />
                        </View>
                        <View style={styles.kpiColumn}>
                            <KPICard
                                label={t.comp}
                                emoji="⚙️"
                                value={compressorOn ? t.on : t.off}
                                sub="Status"
                                tag={{ text: t.auto, type: 'info' }}
                            />
                        </View>
                    </View>
                </CardSection>

                {/* Chart Card (placeholder) */}
                <Card>
                    <CardHeader title={t.chartTitle} />
                    <CardBody>
                        <LineChart
                            data={humidityChartData}
                            width={Dimensions.get('window').width - 64}
                            height={220}
                            yAxisSuffix="%"
                            fromZero
                            withDots
                            withInnerLines={false}
                            withOuterLines={false}
                            chartConfig={{
                                backgroundColor: Colors.card,
                                backgroundGradientFrom: Colors.card,
                                backgroundGradientTo: Colors.card,
                                decimalPlaces: 0,
                                color: () => Colors.accent,
                                labelColor: () => Colors.muted,
                                propsForDots: {
                                    r: '4',
                                    strokeWidth: '2',
                                    stroke: Colors.accent,
                                },
                            }}
                            bezier
                            style={styles.chart}
                        />
                        <View style={styles.chartMetaRow}>
                            <Text style={styles.chartMetaText}>Humidity history</Text>
                            <Text style={styles.chartMetaText}>
                                {refreshing ? 'Refreshing...' : 'Live from ESP32'}
                            </Text>
                        </View>
                    </CardBody>
                </Card>

                {/* Controls Card */}
                <Card>
                    <CardHeader title={t.ctrlTitle} />
                    <CardBody>
                        {/* Mode Select */}
                        <ControlField label={t.modeLabel} value={mode}>
                            <ModeSelect
                                value={mode}
                                onChange={setMode}
                                options={[
                                    { label: 'Auto', value: 'AUTO' },
                                    { label: 'Eco', value: 'ECO' },
                                    { label: 'Pre-Cool', value: 'PRECOOL' },
                                    { label: 'Manual', value: 'MANUAL' },
                                ]}
                            />
                        </ControlField>

                        {/* Crop Selection */}
                        <View style={styles.field}>
                            <Text style={styles.label}>{t.produceLabel}</Text>
                            <CropChips
                                crops={CROPS}
                                selected={selectedCrops}
                                onSelectionChange={setSelectedCrops}
                            />
                        </View>

                        {/* Manual Controls (show only in MANUAL mode) */}
                        {mode === 'MANUAL' && (
                            <>
                                <SliderField
                                    label={t.mtLabel}
                                    value={manualTempValue}
                                    onChange={setManualTempValue}
                                    min={0}
                                    max={15}
                                    step={0.5}
                                />
                                <SliderField
                                    label={t.mhLabel}
                                    value={manualHumValue}
                                    onChange={setManualHumValue}
                                    min={50}
                                    max={98}
                                    step={1}
                                />
                            </>
                        )}

                        {/* Toggles */}
                        <Toggle
                            label={t.doorLabel}
                            description={doorOpen ? t.doorOpen : t.doorClosed}
                            value={doorOpen}
                            onChange={setDoorOpen}
                        />

                        <Toggle
                            label={t.gridLabel}
                            description={gridOn ? t.gridOn : t.gridOff}
                            value={gridOn}
                            onChange={setGridOn}
                        />
                    </CardBody>
                </Card>

                {/* Shelf Life Card */}
                <Card>
                    <CardHeader title={t.shelfTitle} />
                    <CardBody>
                        {shelf.map((item, idx) => (
                            <View
                                key={idx}
                                style={[
                                    styles.shelfItem,
                                    idx < shelf.length - 1 && {
                                        borderBottomColor: Colors.border,
                                        borderBottomWidth: 1,
                                    },
                                ]}
                            >
                                <View>
                                    <Text style={styles.shelfName}>
                                        {item.emoji} {item.name}
                                    </Text>
                                </View>
                                <View style={styles.shelfRight}>
                                    <View style={styles.shelfBar}>
                                        <View
                                            style={[
                                                styles.shelfBarFill,
                                                {
                                                    width: `${(item.days / 90) * 100}%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.shelfDays}>{item.days}d</Text>
                                </View>
                            </View>
                        ))}
                    </CardBody>
                </Card>

                {/* Alerts Card */}
                <Card>
                    <CardHeader
                        title={t.alertTitle}
                        badge={
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: Colors.muted,
                                    fontWeight: '700',
                                }}
                            >
                                {alerts.length}
                            </Text>
                        }
                    />
                    <CardBody>
                        <AlertsList items={alerts} />
                    </CardBody>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: Spacing.md,
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '600',
    },
    errorBanner: {
        backgroundColor: '#fee2e2',
        borderBottomColor: '#fecaca',
        borderBottomWidth: 1,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorText: {
        flex: 1,
        color: '#991b1b',
        fontSize: 13,
        fontWeight: '500',
    },
    retryButton: {
        backgroundColor: '#dc2626',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: 4,
        marginLeft: Spacing.md,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    scrollContent: {
        padding: Spacing.lg,
        paddingBottom: 100,
    },
    kpiRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.md,
    },
    kpiColumn: {
        flex: 1,
    },
    chartPlaceholder: {
        minHeight: 200,
        backgroundColor: Colors.bg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.md,
    },
    chart: {
        marginLeft: -8,
        borderRadius: BorderRadius.lg,
    },
    chartMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.sm,
    },
    chartMetaText: {
        fontSize: 12,
        color: Colors.muted,
    },
    field: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: 13,
        color: Colors.muted,
        fontWeight: '600',
        marginBottom: Spacing.sm,
    },
    shelfItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
    },
    shelfName: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
    },
    shelfRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    shelfBar: {
        width: 100,
        height: 7,
        backgroundColor: Colors.border,
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    shelfBarFill: {
        height: '100%',
        backgroundColor: Colors.accent,
        borderRadius: BorderRadius.full,
    },
    shelfDays: {
        fontSize: 13,
        color: Colors.muted,
        fontWeight: '600',
        minWidth: 40,
    },
});
