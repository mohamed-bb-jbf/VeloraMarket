import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../constants/theme';
import { products } from '../../features/products/data/products';
import { getLowestPrice } from '../../features/products/utils';
import { stores } from '../../features/stores/data/stores';
import { useCart } from '../../store/cart-context';

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const product = products.find((item) => item.id === id);

    if (!product) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Product not found</Text>
            </View>
        );
    }

    const listings = [...product.listings].sort((a, b) => a.price - b.price);
    const lowestPrice = getLowestPrice(product);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={product.image}
                    style={styles.image}
                    resizeMode="cover"
                />

                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color={colors.text} />
                </Pressable>

                <View style={styles.content}>
                    <Text style={styles.brand}>{product.brand}</Text>

                    <Text style={styles.name}>{product.name}</Text>

                    <View style={styles.ratingRow}>
                        <Feather name="star" size={14} color={colors.accent} />
                        <Text style={styles.ratingText}>
                            {product.rating} · {listings.length} stores
                        </Text>
                    </View>

                    <Text style={styles.price}>
                        From {lowestPrice.toLocaleString()} DA
                    </Text>

                    <Text style={styles.sectionTitle}>Available at</Text>

                    {listings.map((listing) => {
                        const store = stores.find((s) => s.id === listing.storeId);

                        if (!store) {
                            return null;
                        }

                        return (
                            <View key={listing.storeId} style={styles.storeRow}>
                                <View style={styles.storeAvatar}>
                                    <Text style={styles.storeInitial}>
                                        {store.name.charAt(0)}
                                    </Text>
                                </View>

                                <View style={styles.storeInfo}>
                                    <Text style={styles.storeName}>{store.name}</Text>

                                    <View style={styles.storeMetaRow}>
                                        <Feather name="map-pin" size={11} color={colors.textSecondary} />
                                        <Text style={styles.storeMeta}>
                                            {store.distanceKm} km · {store.location}
                                        </Text>
                                    </View>

                                    <Text
                                        style={[
                                            styles.storeStatus,
                                            store.openNow ? styles.storeOpen : styles.storeClosed,
                                        ]}
                                    >
                                        {store.openNow ? 'Open now' : 'Closed'}
                                    </Text>
                                </View>

                                <Text style={styles.storePrice}>
                                    {listing.price.toLocaleString()} DA
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    style={[styles.addButton, added && styles.addButtonSuccess]}
                    onPress={() => {
                        addToCart(product.id);
                        setAdded(true);
                        setTimeout(() => setAdded(false), 1500);
                    }}
                >
                    <Feather
                        name={added ? 'check' : 'shopping-bag'}
                        size={18}
                        color={colors.white}
                    />
                    <Text style={styles.addButtonText}>
                        {added ? 'Added to Cart' : 'Add to Cart'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    image: {
        width: '100%',
        height: 360,
    },

    backButton: {
        position: 'absolute',
        top: spacing.xl,
        left: spacing.lg,
        width: 40,
        height: 40,
        borderRadius: radius.xl,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        padding: spacing.lg,
    },

    brand: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    name: {
        marginTop: spacing.xs,
        fontSize: typography.title,
        fontFamily: fonts.headingBold,
        color: colors.text,
    },

    ratingRow: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },

    ratingText: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    price: {
        marginTop: spacing.lg,
        fontSize: typography.heading,
        fontWeight: '600',
        color: colors.primary,
    },

    sectionTitle: {
        marginTop: spacing.xl,
        marginBottom: spacing.md,
        fontSize: typography.subheading,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    storeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    storeAvatar: {
        width: 40,
        height: 40,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    storeInitial: {
        fontSize: typography.body,
        fontFamily: fonts.headingBold,
        color: colors.primary,
    },

    storeInfo: {
        flex: 1,
    },

    storeName: {
        fontSize: typography.small,
        fontWeight: '600',
        color: colors.text,
    },

    storeMetaRow: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    storeMeta: {
        fontSize: 11,
        color: colors.textSecondary,
    },

    storeStatus: {
        marginTop: 2,
        fontSize: 11,
        fontWeight: '600',
    },

    storeOpen: {
        color: '#3A7D44',
    },

    storeClosed: {
        color: colors.textSecondary,
    },

    storePrice: {
        fontSize: typography.small,
        fontWeight: '600',
        color: colors.primary,
    },

    footer: {
        padding: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
    },

    addButton: {
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },

    addButtonSuccess: {
        backgroundColor: colors.primaryDark,
    },

    addButtonText: {
        color: colors.white,
        fontSize: typography.body,
        fontWeight: '600',
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