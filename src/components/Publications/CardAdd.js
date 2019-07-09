import React from 'react'

// Firebase
import firebase from 'firebase'

//Json Anidados
import update from 'immutability-helper';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

class CardAdd extends React.Component{

  constructor(props){
    super(props)
    this.state={
      name: '',
      open: false,
      r:[],
        progress : 0,
        image : null,
        url: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.cambio = this.cambio.bind(this)

  }
  cambio(){
    this.setState(state => ({
        open:
          state.open === false
            ? true
            : false
      }))
  }
  // *** START ***
  handleUpload(){
    const {image} = this.state
    const storageRef = firebase.storage().ref(`/pictures/${image.name}`)
    const task = storageRef.put(image);

    task.on('state_changed', (snapshot) =>{
      let per = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
      this.setState({
        progress: per,
      })
    }, (error)=>{
      console.log(error.message)
    }, ()=>{
      firebase.storage().ref('pictures').child(image.name).getDownloadURL().then(url=>{
        console.log(url);

        const datos = this.state
        const newData = update(datos, {
            resources:[{
              path:{
                $set:
                  url
              }
            }]
          }
        )
        this.setState(newData)
      })
      console.log(this.state.url)
    });

  }

  // *** END ***

  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
        [name] : value
    })
    console.log(this.state);
  }
  render(){
    return(
      <div>

        <IconButton onClick={this.cambio} color="primary" aria-label="Add">
          {/* <Fab color="primary" aria-label="Add"> */}
            <AddIcon />
          {/* </Fab> */}
          {/* Guardar */}
        </IconButton>

        <div>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
              <form onSubmit={this.guardar}>

                <DialogContent>
                  <DialogTitle id="form-dialog-title">
                    Nueva Rutina
                  </DialogTitle>
                  <DialogContentText>
                    {/* Comparte el conocimiento con los demás para que nasndnakdaksdmaksdmkm */}
                  </DialogContentText>

                  <TextField
                    fullWidth
                    label="Rutina"
                    placeholder="Awesome Title"
                    name="title"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    onChange = {this.handleInput}
                  />

                  <br/>
                  <br/>

                  <TextField
                  //              className={classes.margin}
                    fullWidth
                    label="Descripcion"
                    placeholder="Añade un breve discripción"
                    name="description"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    onChange = {this.handleInput}
                  />
                  <br/>
                  <br/>

                  <LinearProgress variant="determinate" value={this.state.progress} max="100"/>
                  <br/>
                  <input type="file" onChange={this.handleFile}/>
                  <br/>
                  <br/>
                  <Button variant="contained" onClick={this.handleUpload}>
                    SUBIR
                    {/* Icono de carga de archivos */}
                    
                  </Button>
                  <br/>
                  <br/>
                  {/* <img width="320" height="100%" src={this.state.url} alt=""/> */}

              </DialogContent>

              <DialogActions>
                {/* <Button onClick={this.cambio} variant="contained" color="primary">
                  Publicar
                </Button> */}
                <Button type="submit" variant="contained" color="primary" onClick={this.cambio}>
                    GUARDAR
                </Button>
                <Button onClick={this.cambio} variant="contained" color="secondary">
                  SALIR
                </Button>
              </DialogActions>

            </form>
          </Dialog>
        </div>
      </div>
    )
  }

}

CardAdd.defaultProps = {
  title : "Nuevo",
  description : "",
  createdAt: new Date().toLocaleDateString().split('/').reverse().join('-'),
  updatedAt: new Date().toLocaleDateString().split('/').reverse().join('-'),
  user: {
      id:82
  }
}

export default withStyles({
  fab: {
    margin: (1),
  },
  extendedIcon: {
    marginRight: (1),
  }
}) (CardAdd);