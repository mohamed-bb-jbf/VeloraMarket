import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../store/auth-context';
import { useCart } from '../../store/cart-context';
import { useFavorites } from '../../store/favorites-context';

export default function ProfileScreen() {
    const router = useRouter();
    const { favoriteIds } = useFavorites();
    const { totalItems } = useCart();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            icon: 'heart' as const,
            label: 'Favorites',
            count: favoriteIds.length,
            onPress: () => router.push('/favorites'),
        },
        {
            icon: 'shopping-bag' as const,
            label: 'Cart',
            count: totalItems,
            onPress: () => router.push('/cart'),
        },
        {
            icon: 'package' as const,
            label: 'Orders',
            count: 0,
            onPress: () => router.push('/orders'),
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.guestCard}>
                <View style={styles.avatar}>
                    <Feather name="user" size={28} color={colors.primary} />
                </View>

                <View style={styles.guestInfo}>
                    <Text style={styles.guestTitle}>
                        {user ? user.email : 'Guest'}
                    </Text>
                    <Text style={styles.guestSubtitle}>
                        {user ? 'Signed in' : 'Sign in to sync your account'}
                    </Text>
                </View>

                {user ? (
                    <Pressable style={styles.signInButton} onPress={() => logout()}>
                        <Text style={styles.signInText}>Sign Out</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.signInButton}
                        onPress={() => router.push('/auth')}
                    >
                        <Text style={styles.signInText}>Sign In</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <Pressable
                        key={item.label}
                        style={styles.menuRow}
                        onPress={item.onPress}
                    >
                        <View style={styles.menuLeft}>
                            <Feather name={item.icon} size={18} color={colors.text} />
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </View>

                        <View style={styles.menuRight}>
                            {item.count > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{item.count}</Text>
                                </View>
                            )}
                            <Feather name="chevron-right" size={18} color={colors.textSecondary} />
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },

    title: {
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
        marginBottom: spacing.lg,
    },

    guestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.md,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: radius.xl,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    guestInfo: {
        flex: 1,
    },

    guestTitle: {
        fontSize: typography.body,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    guestSubtitle: {
        marginTop: 2,
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    signInButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.sm,
        backgroundColor: colors.primary,
    },

    signInText: {
        fontSize: typography.small,
        fontWeight: '600',
        color: colors.white,
    },

    menu: {
        marginTop: spacing.xl,
    },

    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    menuLabel: {
        fontSize: typography.body,
        color: colors.text,
    },

    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    badge: {
        minWidth: 22,
        height: 22,
        borderRadius: radius.lg,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.white,
    },
});