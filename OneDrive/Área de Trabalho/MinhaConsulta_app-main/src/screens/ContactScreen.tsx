import React from 'react';
import { Box, Text, VStack, IconButton, useDisclose, HamburgerIcon, HStack, Actionsheet, Button } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const ContactScreen: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Componente Banner
    const Banner = () => (
        <Box px={4} py={2} bg="orange.400">
            <HStack justifyContent="space-between" alignItems="center">
                <HStack justifyContent="flex-start" alignItems="center">
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
    );

    // Componente Footer
    const Footer = () => (
        <Box bg="black" p={4} position="absolute" bottom={0} left={0} right={0}>
            <HStack justifyContent="flex-start" alignItems="center">
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

    // Funções para navegação
    const goToOrcamentos = () => {
        onClose();
        navigation.navigate('ConsultationsList');
    };

    const goToSchedule = () => {
        onClose();
        navigation.navigate('ScheduleConsultation');
    };

    return (
        <Box flex={1} bg="white" marginTop={0}>
            <Banner />
            <Text px={4} fontSize="xl" bold>Sobre nós</Text>
            <Text fontSize="lg" textAlign="left" alignItems="center" justifyContent="center" color="gray.600" p={4}>
                Somos uma empresa especializada em serviços de guincho e assistência veicular, com anos de experiência no setor.{"\n"}{"\n"}
                Nossa missão é garantir segurança e confiança para nossos clientes em qualquer situação.
            </Text>
            
            <VStack space={4} mt={4} px={4}>
                <Text fontSize="xl" bold>Contato</Text>
                <Text>
                    Entre em contato conosco pelo telefone <b>(11) 1234-5678</b> ou pelo e-mail <b>contato@empresa.com</b> com o print do seu orçamento <b>mais recente</b>.
                </Text>
                <Text>Endereço: Rua Exemplo, 123 - Cidade - Estado</Text>
                <Button style={{ backgroundColor: 'orange', borderWidth:1 , borderColor:'black' }} onPress={() => alert('Mensagem enviada!')}>
                    <b color="black">Enviar mensagem</b>
                </Button>

            </VStack>
            <Footer />

            {/* Actionsheet para navegação */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={goToOrcamentos}>Ver orçamentos</Actionsheet.Item>
                    <Actionsheet.Item onPress={goToSchedule}>Agendar consulta</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    );
};

export default ContactScreen;
