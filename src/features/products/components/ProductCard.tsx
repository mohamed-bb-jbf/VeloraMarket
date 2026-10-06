import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

import { colors, fonts, radius, spacing } from '../../../constants/theme';
import { useFavorites } from '../../../store/favorites-context';
import type { Product } from '../data/products';
import { getLowestPrice } from '../utils';

type ProductCardProps = {
    product: Product;
    grid?: boolean;
};

export default function ProductCard({
    product,
    grid = false,
}: ProductCardProps) {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const { isFavorite, toggleFavorite } = useFavorites();

    const favorite = isFavorite(product.id);
    const lowestPrice = getLowestPrice(product);

    const gridWidth =
        (width - spacing.lg * 2 - spacing.md) / 2;

    const cardWidth = grid ? gridWidth : 150;

    return (
        <Pressable
            style={[
                styles.card,
                {
                    width: cardWidth,
                    marginRight: grid ? 0 : spacing.md,
                },
            ]}
            onPress={() => router.push(`/product/${product.id}`)}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={product.image}
                    style={[
                        styles.image,
                        {
                            width: cardWidth,
                            height: cardWidth,
                        },
                    ]}
                    resizeMode="cover"
                />

                <Pressable
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(product.id)}
                    hitSlop={8}
                >
                    <Ionicons
                        name={favorite ? 'heart' : 'heart-outline'}
                        size={16}
                        color={
                            favorite
                                ? colors.primary
                                : colors.textSecondary
                        }
                    />
                </Pressable>
            </View>

            <Text style={styles.brand}>
                {product.brand}
            </Text>

            <Text
                style={styles.name}
                numberOfLines={1}
            >
                {product.name}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    From {lowestPrice.toLocaleString()} DA
                </Text>

                <View style={styles.rating}>
                    <Feather
                        name="star"
                        size={12}
                        color={colors.accent}
                    />

                    <Text style={styles.ratingText}>
                        {product.rating}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: spacing.lg,
    },

    imageWrapper: {
        position: 'relative',
    },

    image: {
        borderRadius: radius.md,
    },

    favoriteButton: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        width: 28,
        height: 28,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 13,
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