import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../../../constants/theme';
import type { Product } from '../data/products';

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    return (
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${product.id}`)}
        >
            <Image
                source={product.image}
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.brand}>{product.brand}</Text>

            <Text style={styles.name} numberOfLines={1}>
                {product.name}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>{product.price.toLocaleString()} DA</Text>

                <View style={styles.rating}>
                    <Feather name="star" size={12} color={colors.accent} />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        marginRight: spacing.md,
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: radius.md,
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

    footer: {
        marginTop: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    price: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

    ratingText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
});