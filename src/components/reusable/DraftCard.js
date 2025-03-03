import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { getInitialLetter, getRandomLightColor, scaleFont, scaleHeight } from '../../Utils';

// Function to generate a random light color





const DraftCard = ({ draft, onPress }) => {
  const { colors, dark } = useTheme();
  const initialLetter = getInitialLetter(draft?.recipient);
  const bgColor = getRandomLightColor();


  return (
    <Card onPress={() => onPress(draft)} style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.container}>
        <View style={[styles.initialCircle, { backgroundColor: bgColor }]}>
          <Text style={styles.initialText}>{initialLetter}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.subject, { color: colors.text }]} numberOfLines={1}>
            {draft.subject}
          </Text>
          <Text style={[styles.message, { color: colors.text }]} numberOfLines={1}>
            {draft.body}
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={[styles.date, { color: dark ? '#bbb' : '#666' }]}>{draft.date}</Text>
          <Text style={[styles.date, { color: dark ? '#bbb' : '#666', textAlign: 'right' }]}>{draft.status}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: scaleHeight(18),
    borderRadius: 0,
    paddingVertical: scaleHeight(15),
    elevation: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  initialText: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: '#333', // Dark text
  },
  textContainer: {
    flex: 1,
  },
  subject: {
    fontSize: scaleFont(15),
    fontWeight: 'bold',
  },
  message: {
    fontSize: scaleFont(12),
  },
  date: {
    fontSize: scaleFont(10),
  },
});

export default DraftCard;
