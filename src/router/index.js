import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {

  Splash,
  SignIn,
  SignUp,
  Home,
  Home1,
  Lapor,
  Chat,
  Maps,
  Profile,
  ChangePassword,
  About,
  information_P,
  messagemasyarakat,
  Lapor2,
  Chat1,
  messagepengepul,
  information_M,
  Maps1,
  TipeSampah,


} from '../pages';

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">

      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Lapor" component={Lapor} options={{ headerShown: true }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: true }} />
      <Stack.Screen name="Maps" component={Maps} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: true }} />
      <Stack.Screen name="About" component={About} options={{ headerShown: true }} />
      <Stack.Screen name="information_P" component={information_P} options={{ headerShown: true }} />
      <Stack.Screen name="Home1" component={Home1} options={{ headerShown: false }} />
      <Stack.Screen name="messagemasyarakat" component={messagemasyarakat} options={{ headerShown: true }} />
      <Stack.Screen name="Lapor2" component={Lapor2} options={{ headerShown: true }} />
      <Stack.Screen name="Chat1" component={Chat1} options={{ headerShown: true }} />
      <Stack.Screen name="messagepengepul" component={messagepengepul} options={{ headerShown: true }} />
      <Stack.Screen name="information_M" component={information_M} options={{ headerShown: true }} />
      <Stack.Screen name="Maps1" component={Maps1} options={{ headerShown: true }} />
      <Stack.Screen name="TipeSampah" component={TipeSampah} options={{ headerShown: true }} />
  
    </Stack.Navigator>
  );
};
export default Router;
