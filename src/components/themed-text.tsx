import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...props
}: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.base,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    color: '#211D1A',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  link: {
    fontSize: 16,
    color: '#7A263A',
  },
});