import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

type Tab = 'home' | 'explore' | 'favorites' | 'orders' | 'profile';

type BottomNavProps = {
  activeTab: Tab;
  onTabPress: (tab: Tab) => void;
};

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'explore', label: 'Explore', icon: '⌕' },
  { key: 'favorites', label: 'Favorites', icon: '♡' },
  { key: 'orders', label: 'Orders', icon: '▢' },
  { key: 'profile', label: 'Profile', icon: '◯' },
];

export default function BottomNav({
  activeTab,
  onTabPress,
}: BottomNavProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={styles.tab}
          >
            <Text style={[styles.icon, active && styles.activeIcon]}>
              {tab.icon}
            </Text>

            <Text style={[styles.label, active && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 8,
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },

  icon: {
    fontSize: 25,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  label: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  activeIcon: {
    color: colors.primary,
  },

  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});