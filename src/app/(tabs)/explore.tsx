import { Feather } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../constants/theme';
import ProductCard from '../../features/products/components/ProductCard';
import { products } from '../../features/products/data/products';
import { getLowestPrice } from '../../features/products/utils';

type SortOrder = 'none' | 'asc' | 'desc';

export default function ExploreScreen() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');

    const categoryOptions = useMemo(() => {
        const unique = new Set(products.map((product) => product.category));
        return Array.from(unique);
    }, []);

    const results = useMemo(() => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        if (sortOrder === 'asc') {
            filtered = [...filtered].sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        } else if (sortOrder === 'desc') {
            filtered = [...filtered].sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        }

        return filtered;
    }, [selectedCategory, sortOrder]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>

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

            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <ProductCard product={item} />}
            />
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
});