import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const NpkChart = () => {
  const [npkData, setNpkData] = useState({ N: 0, P: 0, K: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://api.thingspeak.com/channels/2525297/feeds.json?api_key=IT6C7L8OKXB6KZ9B&results=1')
      .then(response => response.json())
      .then(data => {
        const latestEntry = data.feeds[0];
        setNpkData({
          N: parseFloat(latestEntry.field1),
          P: parseFloat(latestEntry.field2),
          K: parseFloat(latestEntry.field3)
        });
      })
      .catch(error => {
        console.error('Error fetching data from ThingSpeak:', error);
      });
  };

  if (npkData.N === 0 && npkData.P === 0 && npkData.K === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NPK Data</Text>
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
            datasets: [
              {
                data: [npkData.N, npkData.P, npkData.K],
                colors: [
                  (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // green for Nitrogen
                  (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // red for Phosphorus
                  (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue for Potassium
                ]
              }
            ]
          }}
          width={Dimensions.get('window').width - 40}
          height={300}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          withInnerLines={false} // Disable inner lines for cleaner look
          fromZero // Ensure bars start from zero
          showBarTops // Show tops of bars
          showValuesOnTopOfBars // Show exact values on top of bars
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 10,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});

export default NpkChart;
