import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, typography } from '../../constants/theme';

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    title: {
        fontSize: typography.heading,
        fontFamily: fonts.heading,
        color: colors.text,
    },
});