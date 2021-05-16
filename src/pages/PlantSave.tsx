import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { format, isBefore } from 'date-fns';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
  const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  const navigation = useNavigation();

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if (dateTime)
      setSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch {
      Alert.alert('Não foi possível salvar! 😢');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={ false }
      contentContainerStyle={ styles.container }
    >
      <View style={ styles.container }>
        <View style={ styles.plantInfo }>
          <SvgFromUri
            uri={ plant.photo }
            height={ 150 }
            width={ 150 }
          />

          <Text style={ styles.plantName }>
            { plant.name }
          </Text>

          <Text style={ styles.plantAbout }>
            { plant.about }
          </Text>
        </View>

        <View style={ styles.controller }>
          <View style={ styles.tipContainer }>
            <Image
              source={ waterDrop }
              style={ styles.tipImage }
            />
            <Text style={ styles.tipText }>
              { plant.water_tips }
            </Text>
          </View>

          <Text style={ styles.alertLabel }>
            Escolha o melhor horário para ser lembrado:
            </Text>

          {
            showDatePicker && (
              <DateTimePicker
                value={ selectedDateTime }
                mode='time'
                display='spinner'
                onChange={ handleChangeTime }
              />
            )
          }

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={ styles.dateTimePickerButton }
                onPress={ handleOpenDateTimePickerForAndroid }
              >
                <Text style={ styles.dateTimePickerText }>
                  { `Lembrar as ${format(selectedDateTime, 'HH:mm')}` }
                </Text>
              </TouchableOpacity>
            )
          }

          <Button
            title='Cadastrar planta'
            onPress={ handleSave }
          />

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },

  controller: {
    backgroundColor: colors.white,
    padding: 20,
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    // marginVertical: 10,
    marginTop: 10,
    marginBottom: 30
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },

  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 13,
    // marginTop: -30,
    marginBottom: 5
  },

  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    // paddingVertical: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },

  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  }

})