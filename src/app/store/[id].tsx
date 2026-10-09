import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../constants/theme';
import ProductCard from '../../features/products/components/ProductCard';
import { useCatalog } from '../../store/catalog-context';

export default function StoreDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { products, stores, loading } = useCatalog();

    const store = stores.find((item) => item.id === id);
    const storeProducts = products.filter((product) =>
        product.listings.some((listing) => listing.storeId === id)
    );

    if (loading) {
        return (
            <View style={styles.notFound}>
                <ActivityIndicator color={colors.primary} />
            </View>
        );
    }

    if (!store) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Store not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} hitSlop={8}>
                    <Feather name="arrow-left" size={22} color={colors.text} />
                </Pressable>
            </View>

            <View style={styles.storeHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{store.name.charAt(0)}</Text>
                </View>

                <Text style={styles.storeName}>{store.name}</Text>

                <View style={styles.metaRow}>
                    <Feather name="star" size={13} color={colors.accent} />
                    <Text style={styles.metaText}>{store.rating}</Text>
                    <Text style={styles.metaDot}>·</Text>
                    <Feather name="map-pin" size={13} color={colors.textSecondary} />
                    <Text style={styles.metaText}>
                        {store.distanceKm} km · {store.location}
                    </Text>
                </View>

                <Text style={[styles.status, store.openNow ? styles.open : styles.closed]}>
                    {store.openNow ? 'Open now' : 'Closed'}
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Products</Text>

            <FlatList
                data={storeProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <ProductCard product={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.xl,
    },

    header: {
        paddingHorizontal: spacing.lg,
    },

    storeHeader: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: radius.xl,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 26,
        fontFamily: fonts.headingBold,
        color: colors.primary,
    },

    storeName: {
        marginTop: spacing.sm,
        fontSize: typography.heading,
        fontFamily: fonts.headingBold,
        color: colors.text,
    },

    metaRow: {
        marginTop: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    metaText: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    metaDot: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    status: {
        marginTop: spacing.xs,
        fontSize: typography.small,
        fontWeight: '600',
    },

    open: {
        color: '#3A7D44',
    },

    closed: {
        color: colors.textSecondary,
    },

    sectionTitle: {
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.lg,
        fontSize: typography.subheading,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    list: {
        paddingHorizontal: spacing.lg,
    },

    row: {
        gap: spacing.md,
        marginBottom: spacing.md,
    },

    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },

    notFoundText: {
        fontSize: typography.body,
        color: colors.textSecondary,
    },
});