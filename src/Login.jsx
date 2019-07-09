import React, { Component } from 'react'
import firebase from './initializers/firebase'
import './Login.css'
import AuthElements from './components/AuthElements';



export const MainContext = React.createContext()
export class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            userLoggedIn: false,
            cod:0,
            user:[],
            name: '',
            email: '',
            open: false,
            anchorEl : null
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            
                if(user){
                    if(user.providerData[0].email){

                        //Hay inicio de sesión
                        this.setState({
                            userLoggedIn:true,
                            //Obtener la imagen de perfil
                            photoUrl:user.providerData[0].photoURL,
                            name: user.providerData[0].displayName,
                            email: user.providerData[0].email
                        })
                    }else{
                        firebase.auth().signOut()
                        alert("Usuario no existe")
                    }
                }else{
                    //No hay ininco de sesión
                    this.setState({
                        userLoggedIn:false,
                    })
                }
        })
    }

    login(){
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result=>{
            //Obtener token. Firebase no almacena los token,, solo te lo da
            // let token = result.credential.accessToken;
            this.props.setUser(this.state.cod)
            // console.log(token)
        }).catch(err=>{
            console.log(err);
        })
    }

    logout(){
        firebase.auth().signOut().then(console.log);
        this.setState({
            userLoggedIn:false,
        })
    }

    handleClick(e){
        this.setState({
            anchorEl:e.currentTarget
        })
    }

    handleClose(){
        this.setState({
            anchorEl: null
        })
    }

    render(){
        return(
            <div>
                <MainContext.Provider value={this.state}>
                    {/* <AuthElements
                        user={this.state.userLoggedIn}
                        image={this.state.photoUrl}
                        anchorEl={this.state.anchorEl}
                        login={this.login}
                        logout={this.logout}
                        handleClick={this.handleClick}
                        handleClose={this.handleClose}
                    /> */}
                    {this.props.children}
                </MainContext.Provider>
                <div>
                    <AuthElements
                        user={this.state.userLoggedIn}
                        image={this.state.photoUrl}
                        anchorEl={this.state.anchorEl}
                        login={this.login}
                        logout={this.logout}
                        handleClick={this.handleClick}
                        handleClose={this.handleClose}
                    />
                </div>
            </div>
        )
    }

}

export const LoginConsumer = MainContext.Consumer;