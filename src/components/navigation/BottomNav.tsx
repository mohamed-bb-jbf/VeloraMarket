import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

type Tab = 'home' | 'explore' | 'favorites' | 'orders' | 'profile';

type BottomNavProps = {
  activeTab: Tab;
  onTabPress: (tab: Tab) => void;
};

const tabs: { key: Tab; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'explore', label: 'Explore', icon: 'compass' },
  { key: 'favorites', label: 'Favorites', icon: 'heart' },
  { key: 'orders', label: 'Orders', icon: 'shopping-bag' },
  { key: 'profile', label: 'Profile', icon: 'user' },
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
            <Feather
              name={tab.icon}
              size={22}
              color={active ? colors.primary : colors.textSecondary}
              style={styles.icon}
            />

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
    marginBottom: 4,
  },

  label: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});