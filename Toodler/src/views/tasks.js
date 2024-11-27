import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import BoardCard from '../components/boardCard';
import { addBoard, deleteBoard, updateBoard } from '../services/dataService';
import globalStyles from '../styles/globalStyles';
import data from '../resources/data.json';

const Tasks = ({ navigation }) => {
    
}