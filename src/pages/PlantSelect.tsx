import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSelect() {
  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Header />

        <Text style={ styles.title }>Em qual ambiente</Text>
        <Text style={ styles.subtitle }>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ styles.environmentList }
          data={ [ 1, 2, 3, 4, 5 ] }
          renderItem={ ({ item }) => (
            <EnvironmentButton
              title="Cozinha"
              active
            />
          ) }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 32,
    paddingRight: 60
  }
})