import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button, Box, HStack, IconButton } from 'native-base';
import { HamburgerIcon } from 'native-base';
import { Actionsheet, useDisclose } from 'native-base';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

const ConsultationsListScreen: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Fetch consultations from the backend
    axios.get('http://localhost:3000/api/consultations')
      .then((response) => {
        setConsultations(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar consultas:', error);
      });
  }, []);

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <Text style={styles.preco}>
        R$ <Text style={styles.valor}>{item.peso * 1.25}</Text>
      </Text>
      <Text style={styles.info}>Localidade: <Text style={styles.valor}>{item.localidade}</Text></Text>
      <Text style={styles.info}>Peso: <Text style={styles.valor}>{(item.peso / 1000).toFixed(2)} tonelada(s) ou {item.peso} quilo(s)</Text></Text>
      <Text style={styles.info}>Acontecimento: <Text style={styles.valor}>{item.acontecimento}</Text></Text>
      <Text style={styles.info}>Marca: <Text style={styles.valor}>{item.marca}</Text></Text>

      {/* Botão para efetivar orçamento */}
      <Button 
        style={styles.button} 
        onPress={() => {
          alert(`Orçamento efetivado com sucesso!\n\nLocalidade: ${item.localidade}\nPeso: ${(item.peso / 1000).toFixed(2)} toneladas\nAcontecimento: ${item.acontecimento}\nMarca: ${item.marca}`);
          navigation.navigate('ContactScreen'); // Navegar para a tela de contato após a mensagem
        }}
      >
        <Text style={styles.buttonText}>Efetivar Orçamento</Text>
      </Button>
    </View>
  );

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
    <View >
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
          <Actionsheet.Item onPress={goToOrcar}>Orçar</Actionsheet.Item>
          <Actionsheet.Item onPress={goToContato}>Contato</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <FlatList 
        data={consultations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }} // Para garantir que o conteúdo não fique em cima do footer
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  consultationItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'orange', // Define a cor do card como laranja
    borderRadius: 8,
    position: 'relative', // Necessário para posicionamento absoluto
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Cor do R$
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Cor do valor
  },
  info: {
    color: 'black', // Cor das chaves das informações
    fontSize: 16,
  },
  button: {
    backgroundColor: 'white', // Cor do botão
    marginTop: 16,
    alignSelf: 'center', // Centraliza o botão
  },
  buttonText: {
    color: 'orange', // Cor do texto do botão
    fontWeight: 'bold',
  },
});

export default ConsultationsListScreen;
