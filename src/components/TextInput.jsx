import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    marginBottom: 10,
    color: '#d73a4a',
  },
});

const TextInput = ({ error, style, ...props }) => {
  const textInputStyle = [
    styles.input,
    error && styles.inputError,
    style,
  ];

  return (
    <View>
      <RNTextInput style={textInputStyle} {...props} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TextInput;
