import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../constants/theme';

export default function AddProductScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.back()} hitSlop={8}>
                <Feather name="arrow-left" size={22} color={colors.text} />
            </Pressable>

            <Text style={styles.title}>Add product</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },

    title: {
        marginTop: spacing.lg,
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
    },
});
