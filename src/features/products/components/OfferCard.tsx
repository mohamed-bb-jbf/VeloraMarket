import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../../../constants/theme';
import type { Product } from '../data/products';
import { getDiscountedPrice, getLowestPrice } from '../utils';

type OfferCardProps = {
    product: Product;
};

export default function OfferCard({ product }: OfferCardProps) {
    const router = useRouter();
    const lowestPrice = getLowestPrice(product);
    const discountPercent = product.discountPercent ?? 0;
    const finalPrice = getDiscountedPrice(lowestPrice, discountPercent);

    return (
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${product.id}`)}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={product.image}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>-{discountPercent}%</Text>
                </View>
            </View>

            <Text style={styles.brand}>{product.brand}</Text>

            <Text style={styles.name} numberOfLines={1}>
                {product.name}
            </Text>

            <View style={styles.priceRow}>
                <Text style={styles.finalPrice}>{finalPrice.toLocaleString()} DA</Text>
                <Text style={styles.oldPrice}>{lowestPrice.toLocaleString()} DA</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        marginRight: spacing.md,
    },

    imageWrapper: {
        position: 'relative',
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: radius.md,
    },

    badge: {
        position: 'absolute',
        top: spacing.xs,
        left: spacing.xs,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 3,
        borderRadius: radius.sm,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.white,
    },

    brand: {
        marginTop: spacing.sm,
        fontSize: 11,
        color: colors.textSecondary,
    },

    name: {
        marginTop: 2,
        fontSize: 14,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    priceRow: {
        marginTop: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    finalPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
    },

    oldPrice: {
        fontSize: 12,
        color: colors.textSecondary,
        textDecorationLine: 'line-through',
    },
});