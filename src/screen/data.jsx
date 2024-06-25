import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import CustomCheckBox from './CustomCheckBox'; // Ensure this path is correct

const Data = ({ navigation, onSelect = () => {} }) => {
  const [locationData, setLocationData] = useState([]);
  const [npkData, setNpkData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch location data from the API
    fetch('https://api.thingspeak.com/channels/YOUR_CHANNEL_ID/fields/1.json?api_key=YOUR_API_KEY&results=10')
      .then(response => response.json())
      .then(data => {
        setLocationData(data.feeds || []);
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });

    // Fetch NPK data from the API
    fetch('https://api.thingspeak.com/channels/2525297/fields/1,2,3.json?api_key=IT6C7L8OKXB6KZ9B&results=10')
      .then(response => response.json())
      .then(data => {
        setNpkData(data.feeds || []);
      })
      .catch(error => {
        console.error('Error fetching NPK data:', error);
      });
  }, []);

  const handleSelect = (item) => {
    const isSelected = selectedData.some((data) => data.created_at === item.created_at);
    const newSelectedData = isSelected
      ? selectedData.filter((data) => data.created_at !== item.created_at)
      : [...selectedData, item];

    setSelectedData(newSelectedData);
    onSelect(newSelectedData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Location Data (Channel 1)</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Select</Text>
          <Text style={styles.tableHeader}>Latitude</Text>
          <Text style={styles.tableHeader}>Longitude</Text>
          <Text style={styles.tableHeader}>Timestamp</Text>
        </View>
        {locationData.slice(0, 10).map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <CustomCheckBox
              isChecked={selectedData.some((data) => data.created_at === item.created_at)}
              onPress={() => handleSelect(item)}
            />
            <Text style={styles.tableCell}>{item.field1}</Text>
            <Text style={styles.tableCell}>{item.field2}</Text>
            <Text style={styles.tableCell}>{item.created_at}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.header}>N, P, K Values (Channel 2)</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Select</Text>
          <Text style={styles.tableHeader}>N</Text>
          <Text style={styles.tableHeader}>P</Text>
          <Text style={styles.tableHeader}>K</Text>
          <Text style={styles.tableHeader}>Timestamp</Text>
        </View>
        {npkData.slice(0, 10).map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <CustomCheckBox
              isChecked={selectedData.some((data) => data.created_at === item.created_at)}
              onPress={() => handleSelect(item)}
            />
            <Text style={styles.tableCell}>{item.field1}</Text>
            <Text style={styles.tableCell}>{item.field2}</Text>
            <Text style={styles.tableCell}>{item.field3}</Text>
            <Text style={styles.tableCell}>{item.created_at}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Manual Update"
        onPress={() => navigation.navigate('ManualUpdate')}
      />

      <Button
        title="Channel 3"
        onPress={() => navigation.navigate('NewData')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Background color to differentiate the table
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center', // Center the header text
  },
  tableCell: {
    flex: 1,
    textAlign: 'center', // Center the cell text
    padding: 5,
  },
});

export default Data;
