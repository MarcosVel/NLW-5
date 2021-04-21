import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import phonePlantImg from '../assets/phoneplant.png';
import { Feather } from '@expo/vector-icons';

export function Welcome() {

  return (
    <SafeAreaView style={ styles.container }>

      <Text style={ styles.title }>
        Gerencie{ '\n' }
        suas plantas{ '\n' }
        de forma fácil
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
      >
        <Feather
          name='chevron-right'
          style={ styles.buttonIcon }
        />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 28
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
  },

  subtitle: {
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