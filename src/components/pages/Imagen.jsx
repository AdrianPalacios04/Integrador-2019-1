import React, { Component } from 'react'
import UploadFiles from './UploadFiles';

export default class Imagen extends Component {
   render() {
      return (
         <div>
            <h2>Subiendo imagen a Firebase</h2>
            <UploadFiles/>
         </div>
      )
   }
}
