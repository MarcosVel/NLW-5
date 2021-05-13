import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../styles/colors';

import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { UserIdentification } from '../pages/UserIdentification';
import { Welcome } from '../pages/Welcome';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode='none'
    screenOptions={ {
      cardStyle: {
        backgroundColor: colors.white,
      },
    } }
  >
    <stackRoutes.Screen
      name='Welcome'
      component={ Welcome }
    />

    <stackRoutes.Screen
      name='UserIdentification'
      component={ UserIdentification }
    />

    <stackRoutes.Screen
      name='Confirmation'
      component={ Confirmation }
    />

    <stackRoutes.Screen
      name='PlantSelect'
      component={ PlantSelect }
    />

    <stackRoutes.Screen 
      name='PlantSave'
      component={ PlantSave }
    />

    <stackRoutes.Screen 
      name='MyPlants'
      component={ MyPlants }
    />
  </stackRoutes.Navigator>
)

export default AppRoutes;