import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const ManualUpdate = ({ onAdd }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [n, setN] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');
  const [data, setData] = useState([]);

  const handleAdd = () => {
    const newData = {
      id: Date.now().toString(), // Unique ID for FlatList
      latitude,
      longitude,
      n,
      p,
      k,
    };

    setData([...data, newData]);

    if (typeof onAdd === 'function') {
      onAdd(newData);
    }

    setLatitude('');
    setLongitude('');
    setN('');
    setP('');
    setK('');
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
      <Button title="Add to Table" onPress={handleAdd} />

      <View style={styles.tableContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.latitude}</Text>
              <Text style={styles.cell}>{item.longitude}</Text>
              <Text style={styles.cell}>{item.n}</Text>
              <Text style={styles.cell}>{item.p}</Text>
              <Text style={styles.cell}>{item.k}</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Text style={styles.headerCell}>Latitude</Text>
              <Text style={styles.headerCell}>Longitude</Text>
              <Text style={styles.headerCell}>N Value</Text>
              <Text style={styles.headerCell}>P Value</Text>
              <Text style={styles.headerCell}>K Value</Text>
            </View>
          )}
        />
      </View>
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
  tableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
});

export default ManualUpdate;
