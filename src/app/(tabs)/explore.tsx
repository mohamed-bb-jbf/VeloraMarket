import { Feather } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    colors,
    fonts,
    radius,
    spacing,
    typography,
} from '../../constants/theme';

import ProductCard from '../../features/products/components/ProductCard';
import { products } from '../../features/products/data/products';
import { getLowestPrice } from '../../features/products/utils';

type SortOrder = 'none' | 'asc' | 'desc';

export default function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const [sortOrder, setSortOrder] =
        useState<SortOrder>('none');

    const categoryOptions = useMemo(() => {
        const unique = new Set(
            products.map((product) => product.category)
        );

        return Array.from(unique);
    }, []);

    const results = useMemo(() => {
        let filtered = products;

        // Search
        if (searchQuery.trim()) {
            const query = searchQuery
                .trim()
                .toLowerCase();

            filtered = filtered.filter((product) => {
                return (
                    product.name
                        .toLowerCase()
                        .includes(query) ||
                    product.brand
                        .toLowerCase()
                        .includes(query) ||
                    product.category
                        .toLowerCase()
                        .includes(query)
                );
            });
        }

        // Category
        if (selectedCategory) {
            filtered = filtered.filter(
                (product) =>
                    product.category === selectedCategory
            );
        }

        // Sorting
        if (sortOrder === 'asc') {
            filtered = [...filtered].sort(
                (a, b) =>
                    getLowestPrice(a) -
                    getLowestPrice(b)
            );
        }

        if (sortOrder === 'desc') {
            filtered = [...filtered].sort(
                (a, b) =>
                    getLowestPrice(b) -
                    getLowestPrice(a)
            );
        }

        return filtered;
    }, [
        searchQuery,
        selectedCategory,
        sortOrder,
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Explore
            </Text>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Feather
                    name="search"
                    size={18}
                    color={colors.textSecondary}
                />

                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search products..."
                    placeholderTextColor={
                        colors.textSecondary
                    }
                    style={styles.searchInput}
                    returnKeyType="search"
                    autoCapitalize="none"
                />

                {searchQuery.length > 0 && (
                    <Pressable
                        onPress={() =>
                            setSearchQuery('')
                        }
                    >
                        <Feather
                            name="x"
                            size={18}
                            color={
                                colors.textSecondary
                            }
                        />
                    </Pressable>
                )}
            </View>

            {/* Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersScroll}
                contentContainerStyle={
                    styles.filtersContent
                }
            >
                <Pressable
                    style={[
                        styles.chip,
                        selectedCategory === null &&
                        styles.chipActive,
                    ]}
                    onPress={() =>
                        setSelectedCategory(null)
                    }
                >
                    <Text
                        style={[
                            styles.chipText,
                            selectedCategory === null &&
                            styles.chipTextActive,
                        ]}
                    >
                        All
                    </Text>
                </Pressable>

                {categoryOptions.map((category) => (
                    <Pressable
                        key={category}
                        style={[
                            styles.chip,
                            selectedCategory ===
                            category &&
                            styles.chipActive,
                        ]}
                        onPress={() =>
                            setSelectedCategory(
                                category
                            )
                        }
                    >
                        <Text
                            style={[
                                styles.chipText,
                                selectedCategory ===
                                category &&
                                styles.chipTextActive,
                            ]}
                        >
                            {category}
                        </Text>
                    </Pressable>
                ))}

                <Pressable
                    style={[
                        styles.chip,
                        sortOrder === 'asc' &&
                        styles.chipActive,
                    ]}
                    onPress={() =>
                        setSortOrder(
                            sortOrder === 'asc'
                                ? 'none'
                                : 'asc'
                        )
                    }
                >
                    <Feather
                        name="arrow-up"
                        size={12}
                        color={
                            sortOrder === 'asc'
                                ? colors.white
                                : colors.textSecondary
                        }
                    />

                    <Text
                        style={[
                            styles.chipText,
                            sortOrder === 'asc' &&
                            styles.chipTextActive,
                        ]}
                    >
                        Price
                    </Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.chip,
                        sortOrder === 'desc' &&
                        styles.chipActive,
                    ]}
                    onPress={() =>
                        setSortOrder(
                            sortOrder === 'desc'
                                ? 'none'
                                : 'desc'
                        )
                    }
                >
                    <Feather
                        name="arrow-down"
                        size={12}
                        color={
                            sortOrder === 'desc'
                                ? colors.white
                                : colors.textSecondary
                        }
                    />

                    <Text
                        style={[
                            styles.chipText,
                            sortOrder === 'desc' &&
                            styles.chipTextActive,
                        ]}
                    >
                        Price
                    </Text>
                </Pressable>
            </ScrollView>

            {/* Products */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {results.length > 0 ? (
                    <View style={styles.grid}>
                        {results.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                grid
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.empty}>
                        <Feather
                            name="search"
                            size={36}
                            color={
                                colors.textSecondary
                            }
                        />

                        <Text style={styles.emptyTitle}>
                            No products found
                        </Text>

                        <Text
                            style={styles.emptyText}
                        >
                            Try another search or
                            category.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.xl,
    },

    title: {
        paddingHorizontal: spacing.lg,
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    searchContainer: {
        marginTop: spacing.md,
        marginHorizontal: spacing.lg,
        height: 46,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: colors.text,
        paddingVertical: 0,
    },

    filtersScroll: {
        marginTop: spacing.md,
    },

    filtersContent: {
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
    },

    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        height: 34,
        paddingHorizontal: spacing.md,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: spacing.sm,
    },

    chipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    chipText: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    chipTextActive: {
        color: colors.white,
        fontWeight: '600',
    },

    list: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xl,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },

    emptyTitle: {
        marginTop: spacing.md,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.text,
    },

    emptyText: {
        marginTop: spacing.xs,
        fontSize: 13,
        color: colors.textSecondary,
    },
});