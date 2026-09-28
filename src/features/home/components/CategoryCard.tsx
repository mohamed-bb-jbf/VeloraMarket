import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../../constants/theme';

type CategoryCardProps = {
    name: string;
    subtitle: string;
    image: any;
};

export default function CategoryCard({
    name,
    subtitle,
    image,
}: CategoryCardProps) {
    return (
        <View style={styles.card}>
            <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.name}>{name}</Text>

            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 118,
        marginRight: spacing.md,
    },

    image: {
        width: 118,
        height: 118,
        borderRadius: radius.md,
    },

    name: {
        marginTop: spacing.sm,
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },

    subtitle: {
        marginTop: 3,
        fontSize: 11,
        color: colors.textSecondary,
    },
});