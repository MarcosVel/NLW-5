import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import phonePlantImg from '../assets/phoneplant.png';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.wrapper }>

        <Text style={ styles.title }>
          Gerencie{ '\n' }
        suas plantas de{ '\n' }
        forma fácil
      </Text>

        <Image
          source={ phonePlantImg }
          style={ styles.image }
          resizeMode='contain'
        />

        <Text style={ styles.subtitle }>
          Não esqueça mais de regar suas{ '\n' }
        plantas. Nós cuidamos de lembrar você{ '\n' }
        sempre que precisar.
      </Text>

        <TouchableOpacity
          style={ styles.button }
          activeOpacity={ 0.7 }
          onPress={ handleStart }
        >
          <Feather
            name='chevron-right'
            style={ styles.buttonIcon }
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 28
  },

  title: {
    fontFamily: fonts.heading,
    lineHeight: 34,
    fontSize: 28,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
  },

  subtitle: {
    fontFamily: fonts.text,
    lineHeight: 25,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  }
})