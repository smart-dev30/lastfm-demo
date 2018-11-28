import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonStyle } from '../containers/styles';
import { Constants } from '../utils';

export const CountryListItem = ({flag, region, title, onPress, customStyle}) => {

  const flagSource = {uri: flag};
  return (
    <TouchableOpacity onPress={onPress} style={[style.itemContainer, customStyle]}>
      <View style={CommonStyle.flexOne}>
        <Text style={style.title}> {title} </Text>
        <Text style={style.region}> {region} </Text>
      </View>
      <Icon name="chevron-right" size={10} color={Constants.primaryTextColor} />
    </TouchableOpacity>
  );
};

const style = EStyleSheet.create({
  itemContainer: {
    height: 60,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  title: {
    flex: 1,
    color: '$primaryTextColor',
    fontSize: 18,
    lineHeight: 22,
  },
  region: {
    flex: 1,
    color: '$primaryTextColor',
    fontSize: 14,
    opacity: 0.7,
    paddingTop: 4,
  },
});