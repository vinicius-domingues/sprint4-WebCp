import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  Input,
  IconButton,
  useDisclose,
  HamburgerIcon,
  NativeBaseProvider,
  HStack,
  VStack,
  Text,
  Alert,
  Actionsheet,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RootStackParamList } from '../navigation/AppNavigator';

// Definindo a interface para as consultas
interface Consultation {
  id: number;
  localidade: string;
  peso: number;
  acontecimento: string;
  marca: string;
  preco: number;
}

type ScheduleConsultationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ScheduleConsultation'
>;

type Props = {
  navigation: ScheduleConsultationScreenNavigationProp;
};

const ScheduleConsultationScreen = ({ navigation }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [localidade, setLocalidade] = useState('');
  const [peso, setPeso] = useState('');
  const [acontecimento, setAcontecimento] = useState('');
  const [marca, setMarca] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch consultations from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/consultations')
      .then((response) => {
        setConsultations(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar consultas:', error);
      });
  }, []);

  const handleClear = () => {
    setLocalidade('');
    setPeso('');
    setAcontecimento('');
    setMarca('');
    setError(null);
  };

  const Banner = () => (
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
        <IconButton icon={<HamburgerIcon color="white" />} onPress={onOpen} />
      </HStack>
    </Box>
  );

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

  const handleOrcar = () => {
    console.log('handleOrcar foi chamado'); // Verifique se a função é chamada
  
    if (!localidade || !peso || !acontecimento || !marca) {
      setError('Por favor, preencha todos os campos!');
      return;
    }
  
    const data = {
      localidade,
      peso,
      acontecimento,
      marca,
    };
  
    if (isNaN(Number(peso))) {
      setError('Por favor, insira um peso válido!');
      return;
    }
  
    axios.post('http://localhost:3000/api/consultations', data)
      .then((response) => {
        console.log('Dados enviados com sucesso:', response.data);
        navigation.navigate('ConfirmAppointment');
      })
      .catch((error) => {
        console.error('Erro ao enviar dados:', error);
        setError('Erro ao enviar dados para a API!');
      });
  };

  const goToOrcamentos = () => {
    onClose();
    navigation.navigate('ConsultationsList');
  };

  const goToContato = () => {
    onClose();
    navigation.navigate('ContactScreen');
  };

  return (
    <NativeBaseProvider>
      <Banner />
      <Center flex={1} paddingTop={'2'} justifyContent={'start'} bg="white">
        <VStack space={2} mt={2} width="90%" maxWidth="400px">
          {error && (
            <Alert w="100%" status="error" colorScheme="orange">
              <Alert.Icon />
              <Text fontSize="md" color="orange.600">{error}</Text>
            </Alert>
          )}

          <Input
            placeholder="Localidade do veículo"
            value={localidade}
            onChangeText={setLocalidade}
            mb={4}
            bg="gray.100"
            borderColor="orange.400"
            placeholderTextColor="gray.600"
          />

          <Input
            placeholder="Peso do veículo (em toneladas)"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
            mb={4}
            bg="gray.100"
            borderColor="orange.400"
            placeholderTextColor="gray.600"
          />

          <Input
            placeholder="Ocorrido"
            value={acontecimento}
            onChangeText={setAcontecimento}
            mb={4}
            bg="gray.100"
            borderColor="orange.400"
            placeholderTextColor="gray.600"
          />

          <Input
            placeholder="Nome veículo"
            value={marca}
            onChangeText={setMarca}
            mb={4}
            bg="gray.100"
            borderColor="orange.400"
            placeholderTextColor="gray.600"
          />

          <HStack space={4}>
            <Button
              flex={1}
              onPress={handleClear}
              bg="gray.600"
              _text={{ color: 'white' }}
            >
              Limpar
            </Button>

            <Button
              flex={1}
              onPress={handleOrcar}
              bg="orange.400"
              color={'white'}
            >
              Orçar
            </Button>
          </HStack>
        </VStack>

        <Footer />
      </Center>

      {/* Actionsheet para navegação */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={goToOrcamentos}>Ver orçamentos</Actionsheet.Item>
          <Actionsheet.Item onPress={goToContato}>Contato</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </NativeBaseProvider>
  );
};

export default ScheduleConsultationScreen;
