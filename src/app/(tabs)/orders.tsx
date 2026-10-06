import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../constants/theme';

export default function OrdersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Orders</Text>

            <View style={styles.emptyContainer}>
                <View style={styles.iconCircle}>
                    <Feather name="package" size={28} color={colors.textSecondary} />
                </View>

                <Text style={styles.emptyTitle}>No orders yet</Text>
                <Text style={styles.emptySubtitle}>
                    Your past orders will appear here once you place one.
                </Text>
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
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },

    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },

    emptyTitle: {
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    emptySubtitle: {
        marginTop: spacing.sm,
        fontSize: typography.small,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});