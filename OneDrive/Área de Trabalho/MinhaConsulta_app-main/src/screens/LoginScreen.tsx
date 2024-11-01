import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Center, Input, NativeBaseProvider, Text } from 'native-base';
import React, { useState } from 'react';
import { Alert as RNAlert } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { HStack } from 'native-base';

// Tipagem das props usando NativeStackScreenProps para incluir a prop navigation automaticamente
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// Componente de Banner
const Banner = () => (
    <Box px={4} py={3} bg="orange.400">
    <HStack justifyContent="space-between" alignItems="center">
        <HStack justifyContent="left" alignItems="center">
            <Text color="black" fontSize="2xl" bold>
                WEB
            </Text>
            <Text color="white" fontSize="2xl" bold>
                CP
            </Text>
        </HStack>

    </HStack>
</Box>
);

// Componente de Rodapé
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

const LoginScreen = ({ navigation }: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        if (username === 'admin' && password === '123') {
            navigation.navigate('Home'); // Redireciona para a tela Home
        } else {
            alert('Usuário ou senha incorretos!');
        }
    };

    return (
        <NativeBaseProvider>
            <Banner />
            <Center flex={1} justifyContent={'flex-start'} bg="white">
                
                <Text color={'grey'} paddingLeft={37} display={'flex'} alignSelf="flex-start" paddingTop={30}>Login:  <b>admin</b></Text>
                <Text color={'grey'} paddingLeft={37} display={'flex'} alignSelf="flex-start">Senha: <b>123</b></Text>
                <Text marginLeft={10} paddingTop={10} paddingBottom={4} alignSelf="flex-start" color="orange.400" fontSize="lg" fontWeight="medium">Entre na nossa aplicação</Text>
                <Box width="80%">
                    <Input
                        placeholder="Usuário"
                        mb={4}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Input
                        placeholder="Senha"
                        mb={4}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        bg="orange.400" // Definindo a cor de fundo
                        _text={{ color: 'white', fontWeight: 'bold' }} // Definindo a cor do texto e o peso
                        onPress={handleLogin}
                        mt={4}
                        alignSelf="flex-end"
                    >
                        ENTRAR
                    </Button>

                </Box>
                <Footer />
            </Center>
        </NativeBaseProvider>
    );
};

export default LoginScreen;
