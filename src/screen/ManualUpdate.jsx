import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ManualUpdate = ({ onAdd }) => {
  const navigation = useNavigation();

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [n, setN] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');

  const handleAdd = () => {
    const newData = {
      latitude,
      longitude,
      n,
      p,
      k,
    };
    if (typeof onAdd === 'function') {
      onAdd(newData);
    }
    setLatitude('');
    setLongitude('');
    setN('');
    setP('');
    setK('');

    // Navigate to NewData screen after updating data
    navigation.navigate('NewData');
  };

  return (
    <View style={styles.container}>
      <Text>Manual Update to Channel 3</Text>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
      />
      <TextInput
        style={styles.input}
        placeholder="N Value"
        value={n}
        onChangeText={setN}
      />
      <TextInput
        style={styles.input}
        placeholder="P Value"
        value={p}
        onChangeText={setP}
      />
      <TextInput
        style={styles.input}
        placeholder="K Value"
        value={k}
        onChangeText={setK}
      />
      <Button title="Update Channel 3" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ManualUpdate;
