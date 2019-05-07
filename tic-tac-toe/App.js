import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { red } from 'ansi-colors';

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state= {
      //Se crea la matriz para iniciar el juego en cero
      statusGame: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      player: 1,
    }
    this.startGame = this.startGame.bind(this);
    this.returnIcon = this.returnIcon.bind(this);
    this.onPressTile = this.onPressTile.bind(this);
  }
 //Esta atento a llamar la función para iniciar el juego
  componentDidMount(){
    this.startGame();
  }
  startGame = () => {
    this.setState({statusGame:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
    });
  }

  //la funcion winnerPlayer =>
  //retorna 1 si el jugador 1 gana
  //retorna -1 si el jugador 2 gana
  //retorna cero si ninguno gana

  winnerPlayer = ()=>{
    const numTiles = 3;
    let add;
    //Para las filas
    for(let i= 0; i<numTiles; i++){
      add = this.state.statusGame[i][0]+this.state.statusGame[i][1]+this.state.statusGame[i][2];
      if(add == 3) {return 1;}
      else if(add == -3) {return -1;}
    }
    // Para las columnas
    for(let i= 0; i<numTiles; i++){
      add = this.state.statusGame[0][i]+this.state.statusGame[1][i]+this.state.statusGame[2][i];
      if(add == 3) {return 1;}
      else if(add == -3) {return -1;}
    }
    //Para las diagonales
    add = this.state.statusGame[0][0]+this.state.statusGame[1][1]+this.state.statusGame[2][2];
      if(add == 3) {return 1;}
      else if(add == -3) {return -1;}
      add = this.state.statusGame[2][0]+this.state.statusGame[1][1]+this.state.statusGame[0][2];
      if(add == 3) {return 1;}
      else if(add == -3) {return -1;}
      //Sin ganadores
      return 0;
  }

  onPressTile = (row, col) => {
    //Bloquear tile para que no cambie la jugada
    let notChangeTile = this.state.statusGame[row][col];
    if(notChangeTile !== 0) {return;}
    //guardar el jugador actual
    let player = this.state.player;
    //Seleccionar jugador y el cuadrado correcto
    let arr = this.state.statusGame.slice();
    arr[row][col] = player;
    this.setState({statusGame: arr});

    // Cambiar de jugador
    let newPlayer = (player == 1) ? -1 : 1; 
    this.setState({player: newPlayer});
      //Comprobando si existe ganador
    let winners = this.winnerPlayer();
    if(winners == 1) {
      Alert.alert('El jugador O es el ganador');
      this.startGame();
    }
    else if(winners == -1){
      Alert.alert('El jugador X es el ganador');
      this.startGame();
    }
  }
  //Funcion de boton para iniciar nueva partida
  onNewGamePress = ()=> {
    this.startGame();
  }
  // Indicador del proximo turno
  turnNext() {
    if (this.state.player === 1) {
      return 'O'
    }
    if (this.state.player === -1) {
      return 'X'
    }
  }

returnIcon = (row, col) => {
  //evaluar caso de las jugadas
  let valueItem = this.state.statusGame[row] [col];
  switch(valueItem){
    case 1: return <Icon name='circle-thin' style={styles.tileO}/>;
    case -1: return <Icon name='times' style={styles.tileX}/>;
    default: return <View/>;
  }
}

  render(){
    return (
      //contruyendo la matriz
      <View style={styles.container}>
        <Text style={{ color: '#B03A2E', fontSize: 40 }}>TIC-TAC-TOE</Text>
        <Text style={{ color: 'white', fontSize: 15, paddingBottom: 10,}}>Próximo Jugador: {this.turnNext()}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onPressTile(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.returnIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTile(0,1)} style={[styles.tile, {borderTopWidth: 0}]}>
            {this.returnIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTile(0,2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>
            {this.returnIcon(0,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onPressTile(1,0)} style={[styles.tile, {borderLeftWidth: 0}]}>
              {this.returnIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTile(1,1)} style={styles.tile}>
            {this.returnIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTile(1,2)} style={[styles.tile, {borderRightWidth: 0}]}>
            {this.returnIcon(1,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onPressTile(2,0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.returnIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTile(2,1)} style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.returnIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTile(2,2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {this.returnIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
        <Button title='Nueva Partida' onPress={this.onNewGamePress} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth: 2,
    width: 100,
    height: 100,
    borderColor: '#fff'
  },
  tileX:{
    fontSize: 70,
    color: 'red',
    textAlign: 'center',
    paddingTop: 8,
  },
  tileO:{
    fontSize: 70,
    color: '#008000',
    textAlign: 'center',
    paddingTop: 10,
  },
  buttonView: {
    paddingTop: 15, 
  }
})