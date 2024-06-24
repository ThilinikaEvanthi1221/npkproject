import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../utils/color";

const Main = () => {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const handleData = () =>{
    navigation.navigate("data");
}
  
  const carouselData = [
    {
      id: "01",
      image: require("../assets/nitro.jpg"),
      screen: 'Nitrogen',
    },
    {
      id: "02",
      image: require("../assets/posporus.jpeg"),
      screen: 'Phosphorus',
    },
    {
      id: "03",
      image: require("../assets/potassium.jpg"),
      screen: 'Potassium',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
        <Image source={item.image} style={{ height: 200, width: screenWidth }} />
      </TouchableOpacity>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return (
      <View style={styles.dotContainer}>
        {carouselData.map((dot, index) => {
          const backgroundColor = activeIndex === index ? "green" : "red";
          return (
            <View
              key={index}
              style={{
                backgroundColor,
                height: 10,
                width: 10,
                borderRadius: 5,
                marginHorizontal: 6,
              }}
            ></View>
          );
        })}
      </View>
    );
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.headerText}>NPK Data Tracker</Text>
      <FlatList
        data={carouselData}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
      <TouchableOpacity onPress={() => navigation.navigate('Location')}>
      <CardComponent
        image={require("../assets/location.jpg")}
        name="Location"
        categories="See your location"
         />
         </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MeterScreen')}>
      <CardComponent
        image={require("../assets/npk.jpeg")}
        name="NPK Values"
        categories="See your values"
         />
         </TouchableOpacity>
         

      <TouchableOpacity onPress={handleData}>
      <CardComponent
        image={require("../assets/data.jpeg") }
        name="Data"
        categories="See your data"
      />
      </TouchableOpacity>
    </ScrollView>
  );
};

const CardComponent = ({ image, name, categories, deliveryTime, distance, iconColor }) => {
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.cardContainer}>
        <Image style={cardStyles.imageStyle} source={image} />
        <View style={cardStyles.infoStyle}>
          <Text style={cardStyles.titleStyle}>{name}</Text>
          <Text style={cardStyles.categoryStyle}>{categories}</Text>
        </View>
      </View>
    </View>
  );
};

export default Main;

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: colors.greendark,
    textAlign: "center",
    padding: 10,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});

const cardStyles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: colors.greendark,
    height: 200,
    borderRadius: radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '400',
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    marginLeft: 5,
  },
});
