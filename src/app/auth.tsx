import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../constants/theme';
import { useAuth } from '../store/auth-context';

export default function AuthScreen() {
    const router = useRouter();
    const { login, register } = useAuth();

    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);

        try {
            if (mode === 'login') {
                await login(email.trim(), password);
            } else {
                await register(email.trim(), password);
            }
            router.back();
        } catch (err: any) {
            setError(mapFirebaseError(err?.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} hitSlop={8}>
                    <Feather name="arrow-left" size={22} color={colors.text} />
                </Pressable>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {mode === 'login' ? 'Welcome back' : 'Create account'}
                </Text>
                <Text style={styles.subtitle}>
                    {mode === 'login'
                        ? 'Sign in to sync your favorites and orders.'
                        : 'Join VeloraMarket to save your favorites.'}
                </Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        placeholderTextColor={colors.textSecondary}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        placeholderTextColor={colors.textSecondary}
                        style={styles.input}
                        secureTextEntry
                    />

                    {error.length > 0 && (
                        <Text style={styles.error}>{error}</Text>
                    )}

                    <Pressable
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.submitButtonText}>
                            {loading
                                ? 'Please wait...'
                                : mode === 'login'
                                    ? 'Sign In'
                                    : 'Create Account'}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            setMode(mode === 'login' ? 'register' : 'login');
                            setError('');
                        }}
                        style={styles.switchModeButton}
                    >
                        <Text style={styles.switchModeText}>
                            {mode === 'login'
                                ? "Don't have an account? "
                                : 'Already have an account? '}
                            <Text style={styles.switchModeLink}>
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </Text>
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

function mapFirebaseError(code?: string): string {
    switch (code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'Incorrect email or password.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        default:
            return 'Something went wrong. Please try again.';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },

    content: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },

    title: {
        fontSize: typography.title,
        fontFamily: fonts.headingBold,
        color: colors.text,
    },

    subtitle: {
        marginTop: spacing.xs,
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    form: {
        marginTop: spacing.xl,
    },

    label: {
        fontSize: typography.small,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },

    input: {
        height: 48,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: typography.body,
        color: colors.text,
        marginBottom: spacing.md,
    },

    error: {
        fontSize: typography.small,
        color: '#B3261E',
        marginBottom: spacing.md,
    },

    submitButton: {
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.sm,
    },

    submitButtonText: {
        color: colors.white,
        fontSize: typography.body,
        fontWeight: '600',
    },

    switchModeButton: {
        marginTop: spacing.lg,
        alignItems: 'center',
    },

    switchModeText: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },

    switchModeLink: {
        color: colors.primary,
        fontWeight: '600',
    },
});
