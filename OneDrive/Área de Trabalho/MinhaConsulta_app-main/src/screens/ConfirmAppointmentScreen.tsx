import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Center, NativeBaseProvider, Text } from 'native-base';
import React from 'react';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ConfirmAppointmentScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ConfirmAppointment'
>;

type Props = {
    navigation: ConfirmAppointmentScreenNavigationProp;
};

const ConfirmAppointmentScreen = ({ navigation }: Props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="white">
                <Box>
                    <Text>Guincho agendado com sucesso!</Text>
                    <Button style={{backgroundColor:'orange'}} mt={4} onPress={() => navigation.navigate('ConsultationsList')}>
                        Ver histórico de chamados
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default ConfirmAppointmentScreen;