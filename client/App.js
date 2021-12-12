import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});

  const Separator = () => (
    <View style={styles.separator} />
  );

  async function search() {
    try {
      const response = await fetch(`http://localhost:4242/api/users/${username}`); //si localhost fonctionne pas, mettre l'adresse IP du PC
      //console.log(response);
      const user = await response.json();
      //console.log(user);
      setUser(user.user.findUser);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style = {styles.texte}>Type an username here</Text>
        
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholderTextColor = "#9a73ef"
          onChangeText={setUsername}
          placeholder= "Example : dayana-18"
          value={username}
        />

        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {search}>
          <Text style = {styles.submitButtonText}> Search </Text>
          
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <Separator />
      <View style = {styles.view2}>
        <Text style = {styles.texte}>id : {user.idGitHub}</Text>
        <Text style = {styles.texte}>login : {user.login}</Text>
        <Text style = {styles.texte}>{user.public_repos} repositories</Text>
        <Text style = {styles.texte}>{user.followers} followers</Text>
        <Text style = {styles.texte}>{user.following} following</Text>
        <Text style = {styles.texte}>created {user.created_at}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 23
  },
  view2: {
    // flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23
  },
  texte: {
    marginLeft: 15,
    fontFamily: '',
    fontWeight: 'bold',
    color: '#4a2992',
 },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    padding: 10,
 },
  submitButton: {
    backgroundColor: '#4a2992',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#4a2992',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  result: {
    marginLeft: 15,
  },
  loupe: {
    width: 5,
    height: 5,
  }
});
