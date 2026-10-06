import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../constants/theme';
import ProductCard from '../../features/products/components/ProductCard';
import { products } from '../../features/products/data/products';
import { useFavorites } from '../../store/favorites-context';

export default function FavoritesScreen() {
    const { favoriteIds } = useFavorites();
    const favoriteProducts = products.filter((product) =>
        favoriteIds.includes(product.id)
    );

    if (favoriteProducts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No favorites yet</Text>
                <Text style={styles.emptySubtitle}>
                    Tap the heart on any product to save it here.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>

            <View style={styles.grid}>
                {favoriteProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
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

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xl,
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