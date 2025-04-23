//Nguyễn Bá Tuân
//2124802010170

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; // React Native thuần, không dùng '@expo/vector-icons'

export default function App() {
  const [historyText, setHistoryText] = useState<string>('');
  const [resultText, setResultText] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);

  const buttonsLeft: (string[])[] = [
    ['C', '⌫'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '='],
  ];

  const buttonsRight: string[] = ['÷', '×', '-', '+'];

  const onButtonPress = (value: string) => {
    if (value === 'C') {
      setHistoryText('');
      setResultText('');
    } else if (value === '⌫') {
      setHistoryText(prev => prev.slice(0, -1));
    } else if (value === '=') {
      try {
        const expression = historyText.replace(/×/g, '*').replace(/÷/g, '/');
        const evalResult = eval(expression);
        setResultText(evalResult.toString());
      } catch (e) {
        setResultText('Error');
      }
    } else {
      setHistoryText(prev => prev + value);
    }
  };

  const bgColor = isDark ? '#2f3640' : '#f1f2f6';
  const textColor = isDark ? '#fff' : '#000';
  const subTextColor = isDark ? '#b2bec3' : '#636e72';
  const btnBgColor = isDark ? '#353b48' : '#dcdde1';
  const operatorColor = '#f39c12';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Toggle Theme */}
        <View style={styles.themeToggle}>
          <TouchableOpacity onPress={() => setIsDark(!isDark)}>
            <Entypo
              name={isDark ? 'light-up' : 'moon'}
              size={28}
              color={textColor}
            />
          </TouchableOpacity>
        </View>

        {/* Result Display */}
        <View style={styles.resultContainer}>
          <Text style={[styles.historyText, { color: subTextColor }]}>
            {historyText}
          </Text>
          <Text style={[styles.resultText, { color: textColor }]}>
            {resultText}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonLeft}>
            {buttonsLeft.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.buttonRow}>
                {row.map((btn) => (
                  <TouchableOpacity
                    key={btn}
                    style={[styles.button, { backgroundColor: btnBgColor }]}
                    onPress={() => onButtonPress(btn)}
                  >
                    <Text style={[styles.buttonText, { color: textColor }]}>
                      {btn}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {/* Right Column */}
          <View style={styles.buttonRight}>
            {buttonsRight.map((op) => (
              <View key={op} style={styles.operatorButtonWrapper}>
                <TouchableOpacity
                  style={[styles.operatorButton, { backgroundColor: operatorColor }]}
                  onPress={() => onButtonPress(op)}
                >
                  <Text style={[styles.buttonText, { color: '#fff' }]}>
                    {op}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => setHistoryText('')}>
              <Entypo
                name="trash"
                size={28}
                color={isDark ? '#ccc' : '#666'}
                style={{ marginTop: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    padding: 20,
  },
  historyText: {
    fontSize: 24,
    textAlign: 'right',
  },
  resultText: {
    fontSize: 36,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 5,
    flexDirection: 'row',
  },
  buttonLeft: {
    flex: 3,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRight: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operatorButtonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  operatorButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
