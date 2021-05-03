import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [ userName, setUserName ] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageUserName();
  }, []);
  // este último vetor faz com que o useEffect seja recarregado toda vez que o username mudar. Vazio ele só recarrega uma vez.

  return (
    <View style={ styles.container }>
      <View>
        <Text style={ styles.greeting }>Olá,</Text>
        <Text style={ styles.userName }>
          { userName }
        </Text>
      </View>
      <Image
        source={ { uri: 'https://avatars.githubusercontent.com/u/62637265?v=4' } }
        style={ styles.image }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 40
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
});