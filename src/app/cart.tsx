import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../constants/theme';
import { products } from '../features/products/data/products';
import { getLowestPrice } from '../features/products/utils';
import { useCart } from '../store/cart-context';
export default function CartScreen() {
    const router = useRouter();
    const { items, removeFromCart, updateQuantity } = useCart();

    const cartProducts = items
        .map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return product
                ? { ...product, price: getLowestPrice(product), quantity: item.quantity }
                : null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    const subtotal = cartProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartProducts.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} hitSlop={8}>
                        <Feather name="arrow-left" size={22} color={colors.text} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Cart</Text>
                    <View style={{ width: 22 }} />
                </View>

                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>
                        Add products to see them here.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} hitSlop={8}>
                    <Feather name="arrow-left" size={22} color={colors.text} />
                </Pressable>
                <Text style={styles.headerTitle}>Cart</Text>
                <View style={{ width: 22 }} />
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {cartProducts.map((item) => (
                    <View key={item.id} style={styles.item}>
                        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />

                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName} numberOfLines={1}>
                                {item.name}
                            </Text>
                            <Text style={styles.itemPrice}>
                                {item.price.toLocaleString()} DA
                            </Text>

                            <View style={styles.quantityRow}>
                                <Pressable
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Feather name="minus" size={14} color={colors.text} />
                                </Pressable>

                                <Text style={styles.quantityText}>{item.quantity}</Text>

                                <Pressable
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Feather name="plus" size={14} color={colors.text} />
                                </Pressable>
                            </View>
                        </View>

                        <Pressable
                            onPress={() => removeFromCart(item.id)}
                            hitSlop={8}
                            style={styles.removeButton}
                        >
                            <Feather name="trash-2" size={18} color={colors.textSecondary} />
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal</Text>
                    <Text style={styles.totalValue}>{subtotal.toLocaleString()} DA</Text>
                </View>

                <Pressable style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
    },

    headerTitle: {
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    list: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    itemImage: {
        width: 72,
        height: 72,
        borderRadius: radius.md,
    },

    itemInfo: {
        flex: 1,
    },

    itemName: {
        fontSize: typography.body,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    itemPrice: {
        marginTop: 2,
        fontSize: typography.small,
        color: colors.primary,
        fontWeight: '600',
    },

    quantityRow: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    quantityButton: {
        width: 26,
        height: 26,
        borderRadius: radius.sm,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    quantityText: {
        fontSize: typography.small,
        color: colors.text,
        minWidth: 16,
        textAlign: 'center',
    },

    removeButton: {
        padding: spacing.xs,
    },

    footer: {
        padding: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },

    totalLabel: {
        fontSize: typography.body,
        color: colors.textSecondary,
    },

    totalValue: {
        fontSize: typography.heading,
        fontFamily: fonts.headingBold,
        color: colors.primary,
    },

    checkoutButton: {
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkoutButtonText: {
        color: colors.white,
        fontSize: typography.body,
        fontWeight: '600',
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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