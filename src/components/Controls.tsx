import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '@styles/theme';

interface ControlFieldProps {
    label: string;
    value: string | number;
    children: React.ReactNode;
}

export const ControlField: React.FC<ControlFieldProps> = ({
    label,
    value,
    children,
}) => {
    return (
        <View style={styles.field}>
            <View style={styles.fieldLabel}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.fieldValue}>{value}</Text>
            </View>
            {children}
        </View>
    );
};

interface ModeSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
}

export const ModeSelect: React.FC<ModeSelectProps> = ({
    value,
    onChange,
    options,
}) => {
    return (
        <View style={styles.selectContainer}>
            {options.map(opt => {
                const selected = opt.value === value;

                return (
                    <TouchableOpacity
                        key={opt.value}
                        style={[styles.modeButton, selected && styles.modeButtonActive]}
                        onPress={() => onChange(opt.value)}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.modeText, selected && styles.modeTextActive]}>
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

interface SliderFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
}

export const SliderField: React.FC<SliderFieldProps> = ({
    label,
    value,
    onChange,
    min,
    max,
    step,
}) => {
    const decrease = () => onChange(Number((Math.max(min, value - step)).toFixed(1)));
    const increase = () => onChange(Number((Math.min(max, value + step)).toFixed(1)));

    return (
        <ControlField label={label} value={value.toFixed(1)}>
            <View style={styles.sliderRow}>
                <TouchableOpacity style={styles.sliderButton} onPress={decrease}>
                    <Text style={styles.sliderButtonText}>−</Text>
                </TouchableOpacity>
                <View style={styles.sliderTrack}>
                    <View
                        style={[
                            styles.sliderFill,
                            {
                                width: `${((value - min) / (max - min)) * 100}%`,
                            },
                        ]}
                    />
                </View>
                <TouchableOpacity style={styles.sliderButton} onPress={increase}>
                    <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </ControlField>
    );
};

interface ToggleProps {
    label: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
    label,
    description,
    value,
    onChange,
}) => {
    return (
        <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => onChange(!value)}
            activeOpacity={0.9}
        >
            <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>{label}</Text>
                <Text style={styles.toggleDesc}>{description}</Text>
            </View>
            <View style={[styles.switch, value && styles.switchOn]}>
                <View
                    style={[styles.switchThumb, value && styles.switchThumbOn]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    field: {
        backgroundColor: '#f8fafc',
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        marginBottom: Spacing.md,
    },
    fieldLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    label: {
        fontSize: 13,
        color: Colors.muted,
        fontWeight: '600',
    },
    fieldValue: {
        fontFamily: 'monospace',
        fontSize: 13,
        color: Colors.accent,
        fontWeight: '700',
    },
    selectContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    modeButton: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.card,
    },
    modeButtonActive: {
        borderColor: Colors.accent,
        backgroundColor: Colors.accentBg,
    },
    modeText: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.text,
    },
    modeTextActive: {
        color: Colors.accent,
    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    sliderButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderButtonText: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.text,
        marginTop: -2,
    },
    sliderTrack: {
        flex: 1,
        height: 10,
        borderRadius: 999,
        backgroundColor: Colors.border,
        overflow: 'hidden',
    },
    sliderFill: {
        height: '100%',
        borderRadius: 999,
        backgroundColor: Colors.accent,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        backgroundColor: '#f8fafc',
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
    },
    toggleInfo: {
        flex: 1,
    },
    toggleLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    toggleDesc: {
        fontSize: 13,
        color: Colors.muted,
        fontWeight: '500',
        marginTop: Spacing.xs,
    },
    switch: {
        width: 48,
        height: 26,
        borderRadius: BorderRadius.full,
        backgroundColor: '#d1d5db',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 3,
    },
    switchOn: {
        backgroundColor: Colors.good,
        alignItems: 'flex-end',
    },
    switchThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.card,
    },
    switchThumbOn: {
        backgroundColor: Colors.card,
    },
});
