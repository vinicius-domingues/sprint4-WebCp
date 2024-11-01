// src/navigation/AppNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConsultationsListScreen from '../screens/ConsultationsListScreen';
import ScheduleConsultationScreen from '../screens/ScheduleConsultationScreen';
import ConfirmAppointmentScreen from '../screens/ConfirmAppointmentScreen';
import Home from '../screens/Home'; // Importando a tela Home
import ContactScreen from '../screens/ContactScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined; // Adicionando a tela Home
  ConsultationsList: undefined;
  ScheduleConsultation: undefined;
  ConfirmAppointment: undefined;
  ContactScreen: undefined; // Adicionando a tela Contato
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: ' ' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Cadastrar' }}
      />
      <Stack.Screen
        name="Home" // Adicionando a tela Home
        component={Home}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="ConsultationsList"
        component={ConsultationsListScreen}
        options={{ title: 'Home > Histórico de orçamentos' }}
      />
      <Stack.Screen
        name="ScheduleConsultation"
        component={ScheduleConsultationScreen}
        options={{ title: 'Home > Agendar guincho' }}
      />
      <Stack.Screen
        name="ConfirmAppointment"
        component={ConfirmAppointmentScreen}
        options={{ title: 'Confirmação de Agendamento' }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ title: 'Home > Contate-nos' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
