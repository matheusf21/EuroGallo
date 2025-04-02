import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';

const CurrencyConverter = () => {
  const [euroValue, setEuroValue] = useState('');
  const [realValue, setRealValue] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      const data = await response.json();
      setExchangeRate(data.rates.BRL);
    } catch (error) {
      console.error('Erro ao buscar taxa de câmbio:', error);
    }
  };

  const convertToReal = () => {
    if (euroValue && exchangeRate) {
      setRealValue((parseFloat(euroValue) * exchangeRate).toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1E1E1E" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Conversor de Moeda</Text>
      </View>

      {exchangeRate && (
        <Text style={styles.exchangeRate}>Cotação Atual: €1 = R${exchangeRate.toFixed(2)}</Text>
      )}

      <View style={styles.content}>
        <Text style={styles.label}>Valor em Euros (€)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 10"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={euroValue}
          onChangeText={setEuroValue}
        />
        <TouchableOpacity style={styles.button} onPress={convertToReal}>
          <Text style={styles.text}>Converter para Reais</Text>
        </TouchableOpacity>

        {realValue && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Resultado:</Text>
            <Text style={styles.resultValue}>R$ {realValue}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'flex-start', // Move o conteúdo para cima
  },
  header: {
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10, // Reduz espaço abaixo do cabeçalho
  },
  headerText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  exchangeRate: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 45, // Reduz espaço abaixo da cotação
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#DDD',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#FFF',
    marginBottom: 25, // Reduz espaço entre input e botão
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#008000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 15, // Reduz espaço acima do resultado
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    color: '#DDD',
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 34,
    color: '#008000',
    fontWeight: 'bold',
    marginTop: 5,
  },
});


export default CurrencyConverter;
