import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlexStyle,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '@styles/theme';

interface CropChipProps {
    name: string;
    code: string;
    emoji: string;
    selected: boolean;
    onPress: (code: string) => void;
}

export const CropChip: React.FC<CropChipProps> = ({
    name,
    code,
    emoji,
    selected,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.chip,
                selected && styles.chipSelected,
            ]}
            onPress={() => onPress(code)}
            activeOpacity={0.9}
        >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text
                style={[
                    styles.text,
                    selected && styles.textSelected,
                ]}
            >
                {name}
            </Text>
            <View
                style={[
                    styles.check,
                    selected && styles.checkSelected,
                ]}
            >
                {selected && (
                    <Text style={styles.checkmark}>✓</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

interface CropChipsProps {
    crops: Array<{ code: string; name: string; emoji: string }>;
    selected: string[];
    onSelectionChange: (selected: string[]) => void;
}

export const CropChips: React.FC<CropChipsProps> = ({
    crops,
    selected,
    onSelectionChange,
}) => {
    const handlePress = (code: string) => {
        if (selected.includes(code)) {
            onSelectionChange(selected.filter(c => c !== code));
        } else {
            onSelectionChange([...selected, code]);
        }
    };

    return (
        <View style={styles.container}>
            {crops.map(crop => (
                <CropChip
                    key={crop.code}
                    code={crop.code}
                    name={crop.name}
                    emoji={crop.emoji}
                    selected={selected.includes(crop.code)}
                    onPress={handlePress}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
        marginTop: Spacing.sm,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        paddingRight: Spacing.md,
        borderRadius: BorderRadius.full,
        borderWidth: 2,
        borderColor: Colors.border,
        backgroundColor: Colors.card,
    },
    chipSelected: {
        backgroundColor: Colors.accentBg,
        borderColor: Colors.accent,
    },
    emoji: {
        fontSize: 18,
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    textSelected: {
        color: Colors.accent,
    },
    check: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkSelected: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
    },
    checkmark: {
        color: Colors.card,
        fontSize: 10,
        fontWeight: '900',
    },
});
