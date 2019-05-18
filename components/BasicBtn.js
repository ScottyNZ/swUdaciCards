
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';


export function BasicBtn ({ onPress, btnLabel, style, textStyle }) {

  const propsStyle = style?style:{};
  const propsTextStyle = textStyle?textStyle:{};
  return (
    <TouchableOpacity
      style={[Platform.OS ==='ios' ? styles.iosBasicBtn : styles.androidBasicBtn, propsStyle]}
      onPress={onPress}>
        <Text style={[styles.basicBtnText, propsTextStyle]}>{btnLabel}</Text>
    </TouchableOpacity>
  );
}





const styles = StyleSheet.create({
  iosBasicBtn: {
    backgroundColor: '#5B481F',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBasicBtn: {
    backgroundColor: '#555',
    padding: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    height: 45,
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    width: "75%",
    //alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#5B481F',
    elevation: 4,

  },
  basicBtnText: {
    color: '#aa7727',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#0008',
    textShadowOffset: { width: 2, height: 2},
    letterSpacing: 1
  },
})

