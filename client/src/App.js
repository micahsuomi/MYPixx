import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PhotoList from './components/PhotoList';
import AddPhoto from './components/AddPhoto';
import ViewPhoto from './components/ViewPhoto';
import EditPhoto from './components/EditPhoto';
import DeletePhoto from './components/DeletePhoto';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {photos: []}
}

fetchData = () => {
  const url = '/api/photos/';
  axios.get(url)
  .then((res) => {
      console.log(res.data)
      this.setState({photos: res.data})
  })
  .catch((err) => console.log(err))

}

componentDidMount() {
  this.fetchData();

}

deletePhoto = () => {
  this.fetchData();
}

addPhoto = (newPhoto) => {
  this.setState({photos: [newPhoto, ...this.state.photos]})
  this.fetchData();

}

editPhoto = (updatedPhoto) => {
  this.setState({updatedPhoto})
  this.fetchData();

}

  render() {
    return (
        <BrowserRouter>
        <div className="wrapper">
        <Navbar />

        <Switch>
          <Route path="/editphoto/:id" component={(props) => <EditPhoto 
          photos={this.state.photos}
          editPhoto={this.editPhoto}
          {...props}
          />} />

          <Route path="/deletephoto/:id" component={(props) => <DeletePhoto 
          deletePhoto={this.deletePhoto}
          {...props}
          />} />

          <Route path="/addphoto" component={(props)=><AddPhoto 
          addPhoto={this.addPhoto}
          {...props}/>} />

          <Route path="/photos/:id" component={(props)=><ViewPhoto
          id={props.match.params.id}
          photos={this.state.photos}
          {...props} />} />

          <Route path="/photos" component={(props) => <PhotoList 
          key={props.match.params.id}
          photos={this.state.photos} />}  
          />
      
          <Route path="/" component={Home} />
    </Switch>
    </div>
    </BrowserRouter>
    )
  }
}

export default App

