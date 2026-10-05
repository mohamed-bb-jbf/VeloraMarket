import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../../../constants/theme';
import type { Store } from '../data/stores';

type StoreCardProps = {
    store: Store;
};

export default function StoreCard({ store }: StoreCardProps) {
    const router = useRouter();

    return (
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/store/${store.id}`)}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{store.name.charAt(0)}</Text>
            </View>

            <Text style={styles.name} numberOfLines={1}>
                {store.name}
            </Text>

            <View style={styles.metaRow}>
                <Feather name="star" size={11} color={colors.accent} />
                <Text style={styles.metaText}>{store.rating}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{store.distanceKm} km</Text>
            </View>

            <Text style={[styles.status, store.openNow ? styles.open : styles.closed]}>
                {store.openNow ? 'Open now' : 'Closed'}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 140,
        marginRight: spacing.md,
        padding: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: radius.lg,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 18,
        fontFamily: fonts.headingBold,
        color: colors.primary,
    },

    name: {
        marginTop: spacing.sm,
        fontSize: 13,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    metaRow: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },

    metaText: {
        fontSize: 11,
        color: colors.textSecondary,
    },

    metaDot: {
        fontSize: 11,
        color: colors.textSecondary,
    },

    status: {
        marginTop: 4,
        fontSize: 10,
        fontWeight: '600',
    },

    open: {
        color: '#3A7D44',
    },

    closed: {
        color: colors.textSecondary,
    },
});