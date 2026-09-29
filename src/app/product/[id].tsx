import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../constants/theme';
import { products } from '../../features/products/data/products';

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const product = products.find((item) => item.id === id);

    if (!product) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Product not found</Text>
            </View>
        );
    }

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
                            {product.rating} · {product.storeCount} stores
                        </Text>
                    </View>

                    <Text style={styles.price}>
                        {product.price.toLocaleString()} DA
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
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