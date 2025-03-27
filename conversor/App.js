import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [euro, setEuro] = useState(null);
  const [real, setReal] = useState(null);
  const [message, setMessage] = useState("Digite um valor em Euros:");
  const [textButton, setTextButton] = useState("Converter");
  const taxaCambio = 5.50; // Simulação de taxa fixa

  function converterMoeda() {
    if (euro != null && euro > 0) {
      Keyboard.dismiss();
      setReal((euro * taxaCambio).toFixed(2));
      setMessage("O valor em Reais é:");
      setTextButton("Converter novamente");
      setEuro(null);
    } else {
      setReal(null);
      setMessage("Digite um valor válido em Euros:");
      setTextButton("Converter");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Euro para Real</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subTitle}>Conversor de Moeda</Text>
        
        <View>
          <Text style={styles.label}>Valor em Euros (€)</Text>
          <TextInput
            style={styles.input}
            value={euro ?? ''}
            onChangeText={setEuro}
            placeholder='Ex. 10'
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={converterMoeda}
        >
          <Ionicons name="cash-outline" size={24} color="#fff" />
          <Text style={styles.text}>{textButton}</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{message}</Text>
          <Text style={styles.resultValue}>{real ? `R$ ${real}` : ''}</Text>
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  titleContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#0077B6',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#0077B6',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    height: 45,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#0077B6',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096C7',
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#0096C7',
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 36,
    color: '#0096C7',
    fontWeight: 'bold',
  },
});
