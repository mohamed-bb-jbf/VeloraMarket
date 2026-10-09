import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../store/auth-context';
import { useCart } from '../../store/cart-context';
import { useFavorites } from '../../store/favorites-context';

export default function ProfileScreen() {
    const router = useRouter();
    const { favoriteIds = [] } = useFavorites();
    const { totalItems = 0 } = useCart();
    const { user, logout } = useAuth();

    const isSignedIn = Boolean(user);
    const displayName = user?.email ?? 'Guest';
    const subtitle = isSignedIn ? 'Signed in' : 'Sign in to sync your account';

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

    const handleAuthPress = () => {
        if (isSignedIn) {
            logout();
            return;
        }

        router.push('/auth');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.guestCard}>
                <View style={styles.avatar}>
                    <Feather name="user" size={28} color={colors.primary} />
                </View>

                <View style={styles.guestInfo}>
                    <Text style={styles.guestTitle}>{displayName}</Text>
                    <Text style={styles.guestSubtitle}>{subtitle}</Text>
                </View>

                <Pressable style={styles.signInButton} onPress={handleAuthPress}>
                    <Text style={styles.signInText}>{isSignedIn ? 'Sign Out' : 'Sign In'}</Text>
                </Pressable>
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
        marginRight: spacing.md,
    },

    guestInfo: {
        flex: 1,
        marginRight: spacing.md,
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
    },

    menuLabel: {
        fontSize: typography.body,
        color: colors.text,
        marginLeft: spacing.md,
    },

    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    badge: {
        minWidth: 22,
        height: 22,
        borderRadius: radius.lg,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        marginRight: spacing.sm,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.white,
    },
});