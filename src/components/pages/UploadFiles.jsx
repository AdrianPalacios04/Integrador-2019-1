import React, { Component } from 'react'
import firebase from 'firebase'
// import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


class UploadFiles extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      progress : 0,
      image : null,
      url: ''
    };

    this.handleUpload = this.handleUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  handleUpload(e){
    const {image} = this.state
    // const file = e.target.files[0]
    // console.log(file)
    const storageRef = firebase.storage().ref(`/data/${image.name}`)
    const task = storageRef.put(image);

    task.on('state_changed', (snapshot) =>{
      let per = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
      this.setState({
        progress: per,
      })
    }, (error)=>{
      console.log(error.message)
    }, ()=>{
      // let fileRef = storageRef.child(file.name)
      // fileRef.getDownloadURL()
      //   .then(url=>{console.log(url)})
      // this.setState({
      //   picture : task.snapshot.downloadURL,
      // });

      firebase.storage().ref('data').child(image.name).getDownloadURL().then(url=>{
        console.log(url);
        this.setState({
          url
        })
      })
      console.log(this.state.url)
    });
  }

   render() {
      return (
         <div>
           <br/>
            <LinearProgress variant="determinate" value={this.state.progress} max="100"/>
            <br/>
            <input type="file" onChange={this.handleChange}/>
            <br/><br/>
            <button onClick={this.handleUpload}>Upload</button>
            <br/>
            {/* <p>{this.state.url}</p> */}
            <br/>
            <img width="320" height="100%" src={this.state.url} alt=""/>
            
         </div>
      )
   }
}

export default (UploadFiles)