import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const TextButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style} > {title} </Text>
    </TouchableOpacity>
  );
};