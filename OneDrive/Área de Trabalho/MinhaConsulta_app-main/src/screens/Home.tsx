// src/screens/HomeScreen.tsx

import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Text, HStack, IconButton, HamburgerIcon, Actionsheet, useDisclose } from 'native-base';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { isOpen, onOpen, onClose } = useDisclose();

    const goToOrcamentos = () => {
        onClose();
        navigation.navigate('ConsultationsList');
    };

    const goToOrcar = () => {
        onClose();
        navigation.navigate('ScheduleConsultation');
    };

    const goToContato = () => {
        onClose();
        navigation.navigate('ContactScreen');
    };

    const Footer = () => (
        <Box bg="black" p={4} position="absolute" bottom={0} left={0} right={0}>
            <HStack justifyContent="left" alignItems="center">
                <Text color="white" fontSize="2xl" bold>
                    WEB
                </Text>
                <Text color="orange.400" fontSize="2xl" bold>
                    CP
                </Text>
                <Text paddingLeft={'6rem'} color="white" fontSize="1xl" bold>
                © Direitos reservados.
                </Text>
            </HStack>
        </Box>
    );

    return (
        <Box flex={1} bg="white">
            <Box px={4} py={2} bg="orange.400">
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack justifyContent="left" alignItems="center">
                        <Text color="black" fontSize="2xl" bold>
                            WEB
                        </Text>
                        <Text color="white" fontSize="2xl" bold>
                            CP
                        </Text>
                    </HStack>
                    <IconButton
                        icon={<HamburgerIcon color="white" />}
                        onPress={onOpen}
                    />
                </HStack>
            </Box>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={goToOrcamentos}>Ver orçamentos</Actionsheet.Item>
                    <Actionsheet.Item onPress={goToOrcar}>Orçar</Actionsheet.Item>
                    <Actionsheet.Item onPress={goToContato}>Contato</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

            <HStack justifyContent="space-between" mx={4} mt={8}>
                <Button
                    flex={1}
                    mr={10}
                    bg="black"
                    colorScheme="dark"
                    onPress={goToOrcamentos}
                >
                    Ver orçamentos
                </Button>
                <Button
                    flex={1}
                    mr={10}
                    bg="orange.400"
                    colorScheme="dark"
                    onPress={goToOrcar}
                >
                    Orçar
                </Button>
            </HStack>
            <Footer />
        </Box>
    );
};

export default HomeScreen;
