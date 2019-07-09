import React from 'react'


import { Button, Menu} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ExitToApp from '@material-ui/icons/ExitToApp'
import {withStyles} from '@material-ui/core/styles'


//Componente funcional
const AuthElements = function(props) {
    //Todo atraves de props
    const logInButton=()=>{
        if(props.user) return(
            <div>
                <Button onClick={props.handleClick} aria-haspopup="true" aria-controls="simple-menu">
                    <Avatar key="auth-avatar-element" src={props.image} />
                </Button>
                <Menu
                    id="simple-menu"
                    keepMounted
                    anchorEl={props.anchorEl}
                    open={Boolean(props.anchorEl)}
                    onClose={props.handleClose}
                >
                    
                </Menu>
                <IconButton key="auth-sign-out-button-element" color="inherit" onClick={props.logout}>
                    <ExitToApp/>
                </IconButton>
            </div>
        )

        return (
            <Button variant="contained" color="info" onClick={props.login}>
                Iniciar Sesión con Google
            </Button>
        )
    }

    return (
        <div className={props.classes.container}>
            {logInButton()}
        </div>
    )

}

export default withStyles({
    button:{
      backgroundColor:'red'
    },
    container:{
        display:'flex',
        flexDirection:'row'
    }
  }) (AuthElements);