import React from "react";
import { Button, Text } from "react-native";

export function RunList({navigation}) {
  return (<>
    <Text>Run List</Text>
    <Button title="Go to" onPress={() => navigation.navigate('NewAppScreen')} />
  </>
  )
}