import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Animated, StyleSheet, Text } from 'react-native';

const AnimatedTextInput = ({ placeholder, value, onChangeText, disable ,...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedPlaceholder = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedPlaceholder, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const placeholderStyle = {
    top: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 0],
    }),
    fontSize: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#aaa'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.placeholder, placeholderStyle]}>
        {placeholder}
      </Animated.Text>
      <TextInput
      editable={disable?false:true}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingTop: 18,
    position: 'relative',
  },
  input: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: '#333',
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    color: '#aaa',
  },
});

export default AnimatedTextInput;
