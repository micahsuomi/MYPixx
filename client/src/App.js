import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import EditUser from './components/EditUser';
import PhotoList from './components/PhotoList';
import AddPhoto from './components/AddPhoto';
import ViewPhoto from './components/ViewPhoto';
import LikePhoto from './components/LikePhoto';
import Likes from './components/Likes';
import Comments from './components/Comments';
import Comment from './components/Comment';
import EditPhoto from './components/EditPhoto';
import DeletePhoto from './components/DeletePhoto';
import ReactPaginate from 'react-paginate';
import Footer from './components/Footer';
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
                isErrorShowing: false,
                isUserPage: true,
                isPhotoPage: true,
                currentPage: 0,
                offset: 0,
                perPage: 9,
                pageCount: 0,
                showPagination: false,
                isPopupOpen: false,
                isPhotoAdded: false
                      
    }
}

tokenConfig = () => {
  const token = this.state.token;
  const config = {
    headers: {
        "Content-type": "application/json"
    }
}
  if(token) {
    config.headers['x-auth-token'] = token;
    // console.log('I am calling token config here setting headers', token)

  }
  return config
}


fetchData = () => {
  const url = '/api/photos/';
  axios.get(url)
  .then((res) => {
    const slice = res.data.slice(this.state.offset, this.state.offset + this.state.perPage);
      this.setState({
        pageCount: Math.ceil(res.data.length / this.state.perPage),
        photos: slice,
        isPageLoading: false
      })

  })
  .catch((err) => {
      this.setState({
        isPageLoading: false,
        isErrorShowing: true
      })
    
  })

}

fetchUsers = () => {
  axios.get(`/api/user`)
  .then(res => {
      console.log(res.data)
      this.setState({
           users: res.data
      })
  })
}



componentDidMount() {
  this.fetchData();
  this.fetchUsers();

}


handlePageClick = (selectedPage) => {
  console.log('selectedpage from app.js', selectedPage)
  // const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;
  this.setState({
    currentPage: selectedPage,
    offset: offset
  }, () => {
    this.fetchData();
    // console.log('current page from app.js', this.state.currentPage)
  })
}

registerUser = (newUser) => {
  let { name, email, password } = newUser;
  const config = {
    headers: {
      'Content-Type': 'application/json'

    }
    
  }
  const body = JSON.stringify({name, email, password});
  axios.post('/api/register', body, config)
  .then(response => {
    localStorage.setItem('token', response.data.token);
    console.log(localStorage)
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
      console.log('localstorage', localStorage, 'config', config)
      //will load the user calling the token and auth route from backend
      this.loadUser(config);
      

    })
    .catch((err) => {
      localStorage.removeItem('token');
      this.setState({
          token: null,
          isAuthenticated: false,
          isLoading: false,
          user: null,   
          msg: err.response.data.msg
  
      })
      // console.log(this.state.msg)
       
    })
  
}


loadUser = (config) => {
  console.log('loading user', config)
  this.setState({
    isLoading: true,
  })
  console.log(this.tokenConfig())
  console.log(this.state.isLoading)

  axios.get('/api/login/user', this.tokenConfig(config))
  .then(response => {
    console.log('response from loadUser', response.data)
    this.setState({
      isAuthenticated: true,
      // isLoading: false,
      user: response.data,
      redirectPhotos: true,
    })
    
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

}


deletePhoto = () => {
  this.fetchData();
}

deleteComment = () => {
  console.log('calling delete comment from app.js')
  this.fetchData();
}


addPhoto = (newPhoto) => {
  this.fetchData();
  this.setState({photos: [newPhoto, ...this.state.photos], isPhotoAdded: true, isPopupOpen: true});
  console.log('open popup', this.state.isPopupOpen)

}

editPhoto = (updatedPhoto) => {
  console.log('calling edit photo from app.js')
  this.fetchData();
  this.setState({updatedPhoto});


}

editUser = (updatedUser) => {
  console.log('calling edit user from here')
  this.setState({updatedUser});
  this.fetchUsers();
  this.fetchData();


}

refreshPage = () => {
  this.setState({
    isErrorShowing: false,
  })
  this.fetchData();
  this.fetchUsers();
}


likePhoto = (likedPhoto) => {
  this.setState({likedPhoto})
  console.log(likedPhoto)
  this.fetchData();
}

addComment = (newComment) => {
  this.setState({newComment});
  this.fetchData();
}

closePopup = () => {
  this.setState({isPopupOpen: false})
  this.fetchData();
}


  render() {
    // console.log(this.state.users)

    return (
        <BrowserRouter>
        <div className="wrapper">
        <Navbar 
        logout={this.logout}
        isAuthenticated={this.state.isAuthenticated}
        user={this.state.user}
        isLoading={this.state.isLoading}
        />   
            <div>
                {
                 this.state.showPagination ? 
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    : null
                } 
            </div> 
        <Switch>

        <Route path="/about" component={(props) => <About
        users={this.state.users}
        {...props} />} />

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
          tokenConfig={this.tokenConfig}
          {...props}/>} />
          
          <Route path="/user/:id" component={(props) => <User 
          id={props.match.params.id}
          user={this.state.user}
          users={this.state.users}
          photos={this.state.photos}
          isUserPage={this.state.isUserPage}
          {...props}/>} />
  
          <Route path="/editphoto/:id" component={(props) => <EditPhoto 
          photos={this.state.photos}
          editPhoto={this.editPhoto}
          tokenConfig={this.tokenConfig}
          {...props}
          />} />

          <Route path="/deletephoto/:id" component={(props) => <DeletePhoto 
          deletePhoto={this.deletePhoto}
          tokenConfig={this.tokenConfig}
          {...props}
          />} />

          <Route path="/photos/:id/likes" component={(props) => <Likes 
          photos={this.state.photos}
          user={this.state.user}
          {...props}
          />} />

          <Route path="/photos/:id/comments" component={(props) => <Comments 
          photos={this.state.photos}
          user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
          tokenConfig={this.tokenConfig}
          addComment={this.addComment}
          {...props}
          />} />
 
          <Route path="/photos/:id/like" component={(props) => <LikePhoto 
          photos={this.state.photos}
          user={this.state.user}
          likePhoto={this.likePhoto}
          tokenConfig={this.tokenConfig}
          {...props}
          />} />

          <Route path="/addphoto" component={(props)=><AddPhoto 
          addPhoto={this.addPhoto}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
          isLoading={this.state.isLoading}
          tokenConfig={this.tokenConfig}
          {...props}/>} />

          <Route path="/photos/:id" component={(props)=><ViewPhoto
          photos={this.state.photos}
          user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
          token={this.state.token}
          likePhoto={this.likePhoto}
          tokenConfig={this.tokenConfig}
          {...props} />} />

          <Route path="/photos/:id/comments/:id" component={(props) => 
          <Comment deleteComment={this.deleteComment}
          {...props}/>}/>
          

          <Route path="/photos" component={(props) => 
          <div>
          {/* <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          {...props}/> */}
          <PhotoList 
          key={props.match.params.id}
          photos={this.state.photos}
          token={this.state.token}
          isAuthenticated={this.state.isAuthenticated} 
          redirectPhotos={this.state.redirectPhotos}
          isPageLoading={this.state.isPageLoading}
          isErrorShowing={this.state.isErrorShowing}
          pageCount={this.state.pageCount}
          refreshPage={this.refreshPage}
          isPhotoAdded={this.state.isPhotoAdded}
          offset={this.state.offset}
          perPage={this.state.perPage}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          likePhoto={this.likePhoto}
          isPopupOpen={this.state.isPopupOpen}
          closePopup={this.closePopup}
          fetchData={this.fetchData}
          loadPagination={this.loadPagination}
          {...props}
          />
        
          </div>
          } 
          />
      
          <Route path="/" component={Home} />
    </Switch>
    <Footer />
    </div>
    </BrowserRouter>
    )
  }
}


export default App

