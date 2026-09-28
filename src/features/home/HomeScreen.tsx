
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
    colors,
    radius,
    spacing,
    typography,
} from '../../constants/theme';

import BottomNav from '../../components/navigation/BottomNav';
import { categories } from './components/categories';
import CategoryCard from './components/CategoryCard';

type Tab = 'home' | 'explore' | 'favorites' | 'orders' | 'profile';

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState<Tab>('home');

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>Velora</Text>

                    <View style={styles.headerActions}>
                        <Text style={styles.icon}>♡</Text>
                        <Text style={styles.icon}>◯</Text>
                    </View>
                </View>

                {/* Location */}
                <Text style={styles.location}>
                    📍 Médéa, Algeria
                </Text>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>⌕</Text>

                    <Text style={styles.searchPlaceholder}>
                        Search products, brands & stores
                    </Text>
                </View>

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
            </View>

            {/* Bottom Navigation */}
            <BottomNav
                activeTab={activeTab}
                onTabPress={setActiveTab}
            />
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
        fontWeight: '600',
        color: colors.primary,
    },

    headerActions: {
        flexDirection: 'row',
        gap: spacing.md,
    },

    icon: {
        fontSize: 25,
        color: colors.text,
    },

    location: {
        marginTop: spacing.sm,
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
        fontSize: 24,
        color: colors.textSecondary,
        marginRight: spacing.sm,
    },

    searchPlaceholder: {
        fontSize: typography.body,
        color: colors.textSecondary,
    },

    sectionTitle: {
        marginTop: spacing.xl,
        fontSize: typography.heading,
        fontWeight: '600',
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

    categoryCard: {
        width: 150,
        minHeight: 90,
        marginRight: spacing.md,
        padding: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    categoryName: {
        fontSize: typography.body,
        fontWeight: '600',
        color: colors.text,
    },

    categorySubtitle: {
        marginTop: spacing.sm,
        fontSize: typography.small,
        color: colors.textSecondary,
    },
});