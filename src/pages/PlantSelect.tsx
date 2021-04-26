import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [ string ];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [ environments, setEnvironments ] = useState<EnvironmentProps[]>([]);
  const [ plants, setPlants ] = useState<PlantsProps[]>([]);
  const [ filteredPlants, setFilteredPlants ] = useState<PlantsProps[]>([]);
  const [ environmentsSelected, setEnvironmentsSelected ] = useState('all');

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentsSelected(environment);

    if (environment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get('plants?_sort=name&_order=asc');
      setPlants(data);
    }

    fetchPlants();
  }, []);

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
          data={ environments }
          renderItem={ ({ item }) => (
            <EnvironmentButton
              title={ item.title }
              active={ item.key === environmentsSelected }
              onPress={ () => handleEnvironmentSelected(item.key) }
            />
          ) }
        />
      </View>

      <View style={ styles.plants }>
        <FlatList
          showsVerticalScrollIndicator={ false }
          numColumns={ 2 }
          data={ filteredPlants }
          renderItem={ ({ item }) => (
            <PlantCardPrimary
              data={ item }
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
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})