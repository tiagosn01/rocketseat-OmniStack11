import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const navigation = useNavigation();

  function navigateToDetail() {
    navigation.navigate('Detail');
  }

  async function loadIncidents() {
    const response = await api.get('incidents');

      setIncidents(response.data);
  } 

  useEffect(() => {
    loadIncidents();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text styles={styles.headerTextBold}>0 casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList} 
        keyExtractor={incident =>String(incident.id)}
        showsVerticalScrollIndicator={false}

        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}:</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}:</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{incident.value}</Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={navigateToDetail}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={18} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      /> 
    </View>
  )
}