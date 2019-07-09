import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Provider -> Sirve como componente  padre.
//Permite insertar información del almacén en cada componente.
//Para ello todos deben ser hijos de provider.
// import {Provider} from 'react-redux'
// import store from './initializers/store'
// import firebase from './initializers/firebase'

//Importando acciones
// import {setUser, clearUser} from './initializers/actions'

// firebase.auth().onAuthStateChanged((user)=>{
//     //dispatch para poder pasar por el almacen
//     if(user){
//         store.dispatch(setUser(user))
//     }else{
//         store.dispatch(clearUser())
//     }
// })

ReactDOM.render(
  //Pasando por el almacen
//<Provider store={store}>
  <App />
//</Provider>

,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
