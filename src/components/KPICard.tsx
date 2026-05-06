import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@styles/theme';

interface KPICardProps {
  label: string;
  emoji: string;
  value: string;
  sub?: string;
  tag?: {
    text: string;
    type: 'ok' | 'warning' | 'danger' | 'info';
  };
}

const getTagColor = (type: string) => {
  switch (type) {
    case 'ok':
      return { bg: Colors.goodBg, border: Colors.goodBd, text: Colors.good };
    case 'warning':
      return { bg: Colors.warnBg, border: Colors.warnBd, text: Colors.warn };
    case 'danger':
      return { bg: Colors.badBg, border: Colors.badBd, text: Colors.bad };
    case 'info':
      return { bg: Colors.accentBg, border: Colors.accentBd, text: Colors.accent };
    default:
      return { bg: Colors.accentBg, border: Colors.accentBd, text: Colors.accent };
  }
};

export const KPICard: React.FC<KPICardProps> = ({
  label,
  emoji,
  value,
  sub,
  tag,
}) => {
  const tagColors = tag ? getTagColor(tag.type) : null;

  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
      {tag && tagColors && (
        <View
          style={[
            styles.tag,
            { backgroundColor: tagColors.bg, borderColor: tagColors.border },
          ]}
        >
          <Text style={[styles.tagText, { color: tagColors.text }]}>
            {tag.text}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  emoji: {
    fontSize: 18,
  },
  label: {
    fontSize: 13,
    color: Colors.muted,
    fontWeight: '600',
  },
  value: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  sub: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  tag: {
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
