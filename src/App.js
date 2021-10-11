import React,{useState} from 'react';
import './App.css';
import {app} from './Firebase';
function App() {
  const [archivoUrl,setArchivoUrl]=useState(null);
  const archivo= async(e)=>{
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo); 
    console.log("archivo cargado "+archivo.name);
    const enlaceUrl= await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);

  }

  const agregarDatos=async(e)=>{
    const nombre="image";
    e.preventDefault();
    const docRef = app.firestore().collection('imagenes').doc(nombre);

    await docRef.set({
      imagen:archivoUrl
    });
  }
  return (
    <div className="App">
      <form onSubmit={agregarDatos}>
        <input type="file" onChange={archivo} name=""/>
        <input type="text" onChange={archivo} name="nombre" placeholder="Nombre"/>
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
