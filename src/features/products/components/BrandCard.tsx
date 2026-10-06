import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../../../constants/theme';

type BrandCardProps = {
    name: string;
};

export default function BrandCard({ name }: BrandCardProps) {
    const router = useRouter();

    return (
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/search?brand=${encodeURIComponent(name)}`)}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name.charAt(0)}</Text>
            </View>

            <Text style={styles.name} numberOfLines={1}>
                {name}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 90,
        marginRight: spacing.md,
        alignItems: 'center',
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: radius.xl,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 22,
        fontFamily: fonts.headingBold,
        color: colors.primary,
    },

    name: {
        marginTop: spacing.sm,
        fontSize: 12,
        color: colors.text,
        textAlign: 'center',
    },
});