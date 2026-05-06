import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Picker,
    Slider,
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
            <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
            >
                {options.map(opt => (
                    <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
            </Picker>
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
    return (
        <ControlField label={label} value={value.toFixed(1)}>
            <Slider
                style={styles.slider}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={value}
                onValueChange={onChange}
                minimumTrackTintColor={Colors.accent}
                maximumTrackTintColor={Colors.border}
            />
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
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    slider: {
        height: 40,
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
