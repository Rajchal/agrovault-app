import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '@styles/theme';

interface CardProps {
    children?: React.ReactNode;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

interface CardHeaderProps {
    title: string;
    badge?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, badge }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            {badge && <View>{badge}</View>}
        </View>
    );
};

interface CardBodyProps {
    children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children }) => {
    return <View style={styles.body}>{children}</View>;
};

interface CardSectionProps {
    title: string;
    badge?: React.ReactNode;
    children: React.ReactNode;
}

export const CardSection: React.FC<CardSectionProps> = ({
    title,
    badge,
    children,
}) => {
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {badge && badge}
            </View>
            {children}
        </View>
    );
};

interface BadgeProps {
    text: string;
    variant?: 'default' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'default' }) => {
    const bgColor = variant === 'warning' ? Colors.warnBg : Colors.accentBg;
    const textColor =
        variant === 'warning' ? Colors.warn : Colors.accent;
    const borderColor =
        variant === 'warning' ? Colors.warnBd : Colors.accentBd;

    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: bgColor,
                    borderColor,
                },
            ]}
        >
            <Text style={[styles.badgeText, { color: textColor }]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.text,
    },
    body: {
        padding: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginVertical: Spacing.lg,
        marginTop: Spacing.xl,
        flexWrap: 'wrap',
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: '900',
        color: Colors.text,
    },
    badge: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
});
