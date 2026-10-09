import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    colors,
    fonts,
    radius,
    spacing,
    typography,
} from '../../constants/theme';
import { useCatalog } from '../../store/catalog-context';
import BrandCard from '../products/components/BrandCard';
import OfferCard from '../products/components/OfferCard';
import ProductCard from '../products/components/ProductCard';
import { getUniqueBrands } from '../products/utils';
import StoreCard from '../stores/components/StoreCard';
import { categories } from './components/categories';
import CategoryCard from './components/CategoryCard';

export default function HomeScreen() {
    const router = useRouter();
    const { products, stores, loading, error } = useCatalog();
    const brands = getUniqueBrands(products);
    const offers = products.filter((product) => product.discountPercent);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>
                    Could not load products. Please try again.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentInner}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>Velora</Text>

                    <View style={styles.headerActions}>
                        <Pressable onPress={() => router.push('/cart')}>
                            <Feather name="shopping-bag" size={22} color={colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('/favorites')}>
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

                {/* Special Offers */}
                {offers.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>
                            Special Offers
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.categoriesScroll}
                            contentContainerStyle={styles.categoriesContent}
                        >
                            {offers.map((product) => (
                                <OfferCard key={product.id} product={product} />
                            ))}
                        </ScrollView>
                    </>
                )}

                {/* Featured Products */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Featured Products
                    </Text>
                    <Pressable onPress={() => router.push('/(tabs)/explore')}>
                        <Text style={styles.seeAll}>See all</Text>
                    </Pressable>
                </View>

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
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Popular Brands
                    </Text>
                    <Pressable onPress={() => router.push('/(tabs)/explore')}>
                        <Text style={styles.seeAll}>See all</Text>
                    </Pressable>
                </View>

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
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Nearby Stores
                    </Text>
                    <Pressable onPress={() => router.push('/(tabs)/explore')}>
                        <Text style={styles.seeAll}>See all</Text>
                    </Pressable>
                </View>

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
            </ScrollView>
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
    },

    contentInner: {
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxl,
    },

    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xl,
    },

    errorText: {
        fontSize: typography.small,
        color: colors.textSecondary,
        textAlign: 'center',
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
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
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

    sectionHeader: {
        marginTop: spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    seeAll: {
        fontSize: typography.small,
        fontWeight: '600',
        color: colors.primary,
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