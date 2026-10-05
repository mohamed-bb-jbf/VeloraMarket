import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../constants/theme';
import ProductCard from '../features/products/components/ProductCard';
import { products } from '../features/products/data/products';
import { getLowestPrice } from '../features/products/utils';

type SortOrder = 'none' | 'asc' | 'desc';

export default function SearchScreen() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');

    const categoryOptions = useMemo(() => {
        const unique = new Set(products.map((product) => product.category));
        return Array.from(unique);
    }, []);

    const hasActiveSearch = query.trim().length > 0 || selectedCategory !== null;

    const results = useMemo(() => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        if (query.trim().length > 0) {
            const q = query.trim().toLowerCase();
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(q) ||
                product.brand.toLowerCase().includes(q) ||
                product.category.toLowerCase().includes(q)
            );
        }

        if (sortOrder === 'asc') {
            filtered = [...filtered].sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        } else if (sortOrder === 'desc') {
            filtered = [...filtered].sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        }

        return filtered;
    }, [query, selectedCategory, sortOrder]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} hitSlop={8}>
                    <Feather name="arrow-left" size={22} color={colors.text} />
                </Pressable>

                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color={colors.textSecondary} />

                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search products, brands & stores"
                        placeholderTextColor={colors.textSecondary}
                        style={styles.input}
                        autoFocus
                    />
                </View>
            </View>

            {/* Category Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersScroll}
                contentContainerStyle={styles.filtersContent}
            >
                <Pressable
                    style={[styles.chip, selectedCategory === null && styles.chipActive]}
                    onPress={() => setSelectedCategory(null)}
                >
                    <Text style={[styles.chipText, selectedCategory === null && styles.chipTextActive]}>
                        All
                    </Text>
                </Pressable>

                {categoryOptions.map((category) => (
                    <Pressable
                        key={category}
                        style={[styles.chip, selectedCategory === category && styles.chipActive]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={[styles.chipText, selectedCategory === category && styles.chipTextActive]}>
                            {category}
                        </Text>
                    </Pressable>
                ))}

                <Pressable
                    style={[styles.chip, sortOrder === 'asc' && styles.chipActive]}
                    onPress={() => setSortOrder(sortOrder === 'asc' ? 'none' : 'asc')}
                >
                    <Feather
                        name="arrow-up"
                        size={12}
                        color={sortOrder === 'asc' ? colors.white : colors.textSecondary}
                    />
                    <Text style={[styles.chipText, sortOrder === 'asc' && styles.chipTextActive]}>
                        Price
                    </Text>
                </Pressable>

                <Pressable
                    style={[styles.chip, sortOrder === 'desc' && styles.chipActive]}
                    onPress={() => setSortOrder(sortOrder === 'desc' ? 'none' : 'desc')}
                >
                    <Feather
                        name="arrow-down"
                        size={12}
                        color={sortOrder === 'desc' ? colors.white : colors.textSecondary}
                    />
                    <Text style={[styles.chipText, sortOrder === 'desc' && styles.chipTextActive]}>
                        Price
                    </Text>
                </Pressable>
            </ScrollView>

            {!hasActiveSearch ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Search VeloraMarket</Text>
                    <Text style={styles.emptySubtitle}>
                        Find products, brands, and categories.
                    </Text>
                </View>
            ) : results.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No results</Text>
                    <Text style={styles.emptySubtitle}>
                        Try a different name, brand, or category.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => <ProductCard product={item} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.xl,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
    },

    searchContainer: {
        flex: 1,
        height: 48,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    input: {
        flex: 1,
        fontSize: typography.body,
        color: colors.text,
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
    },

    row: {
        gap: spacing.md,
        marginBottom: spacing.md,
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