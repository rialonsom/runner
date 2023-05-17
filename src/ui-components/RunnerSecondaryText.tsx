import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { ThemeContext } from '../theme';

export function RunnerSecondaryText(props: {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <Text style={[{ color: theme.colors.secondaryText }, props.style]}>
      {props.children}
    </Text>
  );
}
