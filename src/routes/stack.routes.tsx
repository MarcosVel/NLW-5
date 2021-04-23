import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../styles/colors';

import { Confimation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { UserIdentification } from '../pages/UserIdentification';
import { Welcome } from '../pages/Welcome';

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
      name='Confimation'
      component={ Confimation }
    />
    <stackRoutes.Screen
      name='PlantSelect'
      component={ PlantSelect }
    />
  </stackRoutes.Navigator>
)

export default AppRoutes;