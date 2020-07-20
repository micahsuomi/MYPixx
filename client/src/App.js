import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import EditUser from './components/EditUser';
import PhotoList from './components/PhotoList';
import AddPhoto from './components/AddPhoto';
import ViewPhoto from './components/ViewPhoto';
import EditPhoto from './components/EditPhoto';
import DeletePhoto from './components/DeletePhoto';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
              photos: [],
              users: [],
                token: localStorage.getItem('token'),
                isAuthenticated: false,
                isLoading: false,
                user: null,
                msg: '',
                redirectLogin: false,
                redirectPhotos: false,
                isPageLoading: true,
                isErrorShowing: false
                      
    }
}

tokenConfig = () => {
  const token = this.state.token;
  console.log(token)
  const config = {
    headers: {
        "Content-type": "application/json"
    }
}
  if(token) {
    config.headers['x-auth-token'] = token;

  }
  return config
}

fetchData = () => {
  const url = '/api/photos/';
  axios.get(url)
  .then((res) => {
    // console.log(res.data)
      this.setState({
        photos: res.data,
        isPageLoading: false
      })

  })
  .catch((err) => {
    if(err.response.data.toLowerCase().startsWith('Proxy error')) {
      console.log('there is an err loading the page', err.response.data)
      this.setState({
        isPageLoading: false,
        isErrorShowing: true
      })

    }
  })

}

fetchUsers = () => {
  axios.get(`/api/user`)
  .then(res => {
      // console.log(res.data)
      this.setState({
           users: res.data
      })
  })
}

componentDidMount() {
  this.fetchData();
  this.fetchUsers();

}

registerUser = (newUser) => {
  let {name, email, password} = newUser;
  const config = {
    headers: {
      'Content-Type': 'application/json'

    }
    
  }
  const body = JSON.stringify({name, email, password});
  axios.post('/api/register', body, config)
  .then(response => {
    localStorage.setItem('token', response.data.token);
    console.log(response)
      this.setState({
        isAuthenticated: true,
        isLoading: false,
        redirectLogin: true,
        user: response.data,
        msg: '',
        
      })
      console.log(this.state)
    
   
    // this.props.redirectLogin()
    // this.props.history.push('/login');
  })
  
  .catch((err) => {
    
    console.log(err.response.data.msg)
    localStorage.removeItem('token');
    this.setState({
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,   
        msg: err.response.data.msg

    })
    console.log('I am also going through here')
    // console.log(this.state.msg)
   

  })
  

}

//LOGS in and authenticates the user
authenticateUser = (user) => {
  const { email, password } = user;
  // console.log(user);
  const config = {
    headers: {
      'Content-Type': 'application/json'

    }
    
  }
  const body = JSON.stringify({email, password});
  axios.post('/api/login', body, config) 
    .then((response) => {
      // console.log(response)
      localStorage.setItem('token', response.data.token);
      this.setState({
        isAuthenticated: true,
        isLoading: false,
        user: response.data,
        token: response.data.token,
        msg: ''


      })
      console.log(this.state)
      //will load the user calling the token and auth route from backend
      this.loadUser();
      

    })
    .catch((err) => {
    
      console.log(err.response.data.msg)
      localStorage.removeItem('token');
      this.setState({
          token: null,
          isAuthenticated: false,
          isLoading: false,
          user: null,   
          msg: err.response.data.msg
  
      })
      console.log(this.state.msg)
     
  
    })
  

}


loadUser = (config) => {
  this.setState({
    isLoading: true,
    ...this.state
  })
  axios.get('/api/login/user', this.tokenConfig(config))
  .then(response => {
    console.log('response from loadUser', response.data)
    this.setState({
      isAuthenticated: true,
      isLoading: false,
      user: response.data,
      redirectPhotos: true,
    })
    console.log(this.state)
    
  })

}



logout = () => {
  console.log('logout from app.js')
  localStorage.removeItem('token');
  this.setState({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    redirectLogin: false,
    redirectPhotos: false
  })
  console.log('after logout', this.state)

}


deletePhoto = () => {
  this.fetchData();
}

/*
addPhoto = (newPhoto) => {
  this.setState({photos: [newPhoto, ...this.state.photos]})
  this.fetchData();

}*/



addPhoto = (newPhoto, config) => {
  console.log(newPhoto)
  const url="/api/photos"
        axios.post(url, newPhoto,  this.tokenConfig(config)).then((response) => {
        })
  .catch(err => console.log(err))
  this.fetchData();
  this.setState({photos: [newPhoto, ...this.state.photos]});

}

editPhoto = (updatedPhoto) => {
  this.fetchData();
  this.setState({updatedPhoto});

}

editUser = (updatedUser) => {
  console.log(updatedUser)
  this.fetchUsers();
  this.setState({updatedUser});

}



  render() {
    // console.log(this.tokenConfig())
    // console.log(this.loadUser())


    // console.log(this.state)
    // console.log(this.tokenConfig())
    console.log('page loading', this.state.isPageLoading)
    console.log('error', this.state.isErrorShowing)

    return (
        <BrowserRouter>
        <div className="wrapper">
        <Navbar 
        logout={this.logout}
        isAuthenticated={this.state.isAuthenticated}
        user={this.state.user}
        isLoading={this.state.isLoading}
        />

        <Switch>

        <Route path="/register" component={(props) => <Register 
          user={this.state.user}
          msg={this.state.msg}
          registerUser = {this.registerUser}
          redirectLogin={this.state.redirectLogin}
          {...props}
          />} />

          <Route path="/login" component={(props) => <Login 
          authenticateUser={this.authenticateUser}
          isAuthenticated={this.state.isAuthenticated}
          redirectPhotos={this.state.redirectPhotos}
          msg={this.state.msg}
          {...props}
          />} />

          <Route path="/edituser/:id" component={(props) => <EditUser 
          id={props.match.params.id}
          users={this.state.users}
          user={this.state.user}
          editUser={this.editUser}
          {...props}/>} />
          
          <Route path="/user/:id" component={(props) => <User 
          id={props.match.params.id}
          user={this.state.user}
          {...props}/>} />
  
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
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
          isLoading={this.state.isLoading}
          {...props}/>} />

          <Route path="/photos/:id" component={(props)=><ViewPhoto
          id={props.match.params.id}
          photos={this.state.photos}
          user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
          {...props} />} />

          <Route path="/photos" component={(props) => <PhotoList 
          key={props.match.params.id}
          photos={this.state.photos}
          isAuthenticated={this.state.isAuthenticated} 
          redirectPhotos={this.state.redirectPhotos}
          isPageLoading={this.state.isPageLoading}
          isErrorShowing={this.state.isErrorShowing}
          {...props}
          />}  
          />
      
          <Route path="/" component={Home} />
    </Switch>
    </div>
    </BrowserRouter>
    )
  }
}

export default App

