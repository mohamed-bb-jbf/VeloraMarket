import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
    colors,
    fonts,
    radius,
    spacing,
    typography,
} from '../../constants/theme';
import BrandCard from '../products/components/BrandCard';
import ProductCard from '../products/components/ProductCard';
import { products } from '../products/data/products';
import { getUniqueBrands } from '../products/utils';
import StoreCard from '../stores/components/StoreCard';
import { stores } from '../stores/data/stores';
import { categories } from './components/categories';
import CategoryCard from './components/CategoryCard';

export default function HomeScreen() {
    const router = useRouter();
    const brands = getUniqueBrands(products);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>Velora</Text>

                    <View style={styles.headerActions}>
                        <Pressable onPress={() => router.push('/cart')}>
                            <Feather name="shopping-bag" size={22} color={colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('/profile')}>
                            <Feather name="heart" size={22} color={colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('/profile')}>
                            <Feather name="user" size={22} color={colors.text} />
                        </Pressable>
                    </View>
                </View>

                {/* Location */}
                <View style={styles.locationRow}>
                    <Feather name="map-pin" size={13} color={colors.textSecondary} />
                    <Text style={styles.location}>Médéa, Algeria</Text>
                </View>

                {/* Search */}
                <Pressable
                    style={styles.searchContainer}
                    onPress={() => router.push('/search')}
                >
                    <Feather name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />

                    <Text style={styles.searchPlaceholder}>
                        Search products, brands & stores
                    </Text>
                </Pressable>

                {/* Categories */}
                <Text style={styles.sectionTitle}>
                    Shop by category
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            subtitle={category.subtitle}
                            image={category.image}
                        />
                    ))}
                </ScrollView>

                {/* Featured Products */}
                <Text style={styles.sectionTitle}>
                    Featured Products
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ScrollView>

                {/* Popular Brands */}
                <Text style={styles.sectionTitle}>
                    Popular Brands
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {brands.map((brand) => (
                        <BrandCard key={brand} name={brand} />
                    ))}
                </ScrollView>

                {/* Nearby Stores */}
                <Text style={styles.sectionTitle}>
                    Nearby Stores
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {stores.map((store) => (
                        <StoreCard key={store.id} store={store} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        fontSize: 30,
        fontFamily: fonts.headingBold,
        color: colors.primary,
    },

    headerActions: {
        flexDirection: 'row',
        gap: spacing.md,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginTop: spacing.sm,
    },

    location: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    searchContainer: {
        height: 52,
        marginTop: spacing.lg,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchIcon: {
        marginRight: spacing.sm,
    },

    searchPlaceholder: {
        fontSize: typography.body,
        color: colors.textSecondary,
    },

    sectionTitle: {
        marginTop: spacing.xl,
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    categoriesScroll: {
        marginTop: spacing.md,
        marginHorizontal: -spacing.lg,
    },

    categoriesContent: {
        paddingLeft: spacing.lg,
        paddingRight: spacing.lg,
    },
});