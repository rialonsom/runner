import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { ThemeContext } from '../theme';

export function RunnerText(props: {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <Text style={[{ color: theme.colors.text }, props.style]}>
      {props.children}
    </Text>
  );
}
