import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@styles/theme';

interface AlertItemProps {
  type: 'ok' | 'warning' | 'danger';
  title: string;
  message: string;
}

const getAlertColor = (type: string) => {
  switch (type) {
    case 'ok':
      return {
        bg: Colors.goodBg,
        border: Colors.goodBd,
        icon: Colors.good,
        iconBg: '#d1fae5',
      };
    case 'warning':
      return {
        bg: Colors.warnBg,
        border: Colors.warnBd,
        icon: Colors.warn,
        iconBg: '#fef3c7',
      };
    case 'danger':
      return {
        bg: Colors.badBg,
        border: Colors.badBd,
        icon: Colors.bad,
        iconBg: '#fee2e2',
      };
    default:
      return {
        bg: Colors.accentBg,
        border: Colors.accentBd,
        icon: Colors.accent,
        iconBg: '#dbeafe',
      };
  }
};

export const AlertItem: React.FC<AlertItemProps> = ({
  type,
  title,
  message,
}) => {
  const colors = getAlertColor(type);
  const icon = type === 'ok' ? '✓' : type === 'warning' ? '⚠' : '✕';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.bg, borderColor: colors.border },
      ]}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: colors.iconBg },
        ]}
      >
        <Text style={[styles.icon, { color: colors.icon }]}>
          {icon}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

interface AlertsListProps {
  items: AlertItemProps[];
}

export const AlertsList: React.FC<AlertsListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Text style={styles.emptyText}>
        No alerts. All systems normal.
      </Text>
    );
  }

  return (
    <View style={styles.listContainer}>
      {items.map((item, idx) => (
        <View key={idx} style={idx < items.length - 1 && styles.itemMargin}>
          <AlertItem
            type={item.type}
            title={item.title}
            message={item.message}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 13,
    fontWeight: '900',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.muted,
    lineHeight: 18,
  },
  listContainer: {
    gap: Spacing.md,
  },
  itemMargin: {
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '500',
    paddingVertical: Spacing.md,
  },
});
