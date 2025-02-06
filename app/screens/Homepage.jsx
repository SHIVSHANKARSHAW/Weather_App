import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme/theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeather } from "../api/weather";
import { weatherImg } from "../constants/constants";
import * as Progress from 'react-native-progress';
import { storeData, getData } from "../utils/asyncStorage";

export default function Homepage() {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [weather, setWeather] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  const handleLocationSearch = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeather({
      cityName: loc.name,
      days: "7",
    }).then((data) => { 
      setWeather(data);
      setLoading(false);
      storeData('city',loc.name);
     })
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

useEffect(() => {
  fetchMyWeatherData();
}, []);

const fetchMyWeatherData = async () => {
  let myCity = await getData('city');
  let cityName = "Kolkata";
  if (myCity) cityName = myCity;  
fetchWeather({
  cityName,
  days: "7",
}).then((data) => { 
  setWeather(data);
  setLoading(false);
}
)}


  const handleTextDebounce = React.useCallback(
    debounce(handleSearch, 1200),
    []
  );

  const {current, location} = weather;

  return (
    <View className="flex-1 relative h-full w-full">
      <StatusBar style="none" />
      <Image
        source={require("../../assets/images/Bg-3.jpg")}
        blurRadius={60}
        className="absolute h-full w-full"
      />
      {
        loading ?
        (
          <View className="flex-1 justify-center items-center">
            <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2"/>
            </View>
        ) : (
          <SafeAreaView className="flex flex-1">
          {/* Search  */}
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row rounded-full justify-end items-center"
              style={{
                backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor={"lightgray"}
                  className="pl-6 h-10 flex-1 text-base text-white"
                />
              ) : null}
  
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                className="rounded-full h-12 w-12 m-1 p-1 flex justify-center items-center"
                style={{ backgroundColor: theme.bgWhite(0.3) }}
              >
                <MagnifyingGlassIcon size={25} color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((location, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-gray-400"
                    : "";
  
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocationSearch(location)}
                      key={index}
                      className={`p-4 flex items-center flex-row ${borderClass}`}
                    >
                      <MapPinIcon size={20} color="gray" />
                      <Text className="font-md px-2">
                        {location?.name}, {location?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* Forecast Section  */}
          <View className="flex flex-1 justify-around mb-2 mx-4">
            {/* Location */}
            <Text className="text-white text-2xl text-center font-bold">
              {location?.name + " "},
              <Text className="text-lg text-gray-300 font-semibold">
                {" "+ location?.country}
              </Text>
            </Text>
            {/* Weather Img */}
            <View className="flex-row justify-center">
              <Image
                source={weatherImg[current?.condition?.text]}
                className="h-52 w-52"
              />
            </View>
            {/* Data */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center  text-white text-2xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>
            {/* Other Stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base pl-3">
                  {current?.wind_kph}Km
                </Text>
              </View>
              <View className="flex-row  items-center">
                <Image
                  source={require("../../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base pl-3">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row  items-center">
                <Image
                  source={require("../../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base pl-3">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>
  
          {/* Forecast For Next Day  */}
          <View className="mb-4 ">
            <View className="flex-row items-center mx-5 space-x-2 pb-6">
              {/* <CalenderDaysIcon size="22" color="white" /> */}
              <Text className="text-white text-semibold"> Daily Forecast</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              {
                weather?.forecast?.forecastday.map((day, index) => {
                  let date = new Date(day.date);
                  let options = { weekday: 'long'};
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];
                  return (
                  <View
                  key={index}
                  className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                source={weatherImg[current?.condition?.text]}
                className="h-11 w-11"
                  />
                  <Text className=" text-white">{dayName}</Text>
                  <Text className="text-white text-xl font-semibold">{day?.day?.avgtemp_c}&#176;</Text>
                </View>
                  )
                })
              }      
            </ScrollView>
          </View>
        </SafeAreaView>
        )
      }
  
    </View>
  );
}
