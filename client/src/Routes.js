import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { loadUser } from './redux/actions/authActions';
import { getPhotos } from './redux/actions/photoActions';
import Navbar from './components/Navbar/index';
import Home from './pages/Home';
import Community from './pages/Community/index';
import Register from './components/Register/index';
import Login from './components/Login/index';
import User from './pages/User';
import EditUser from './components/EditUser/index';
import PhotoList from './pages/Photos/index';
import AddPhoto from './components/AddPhoto/index';
import ViewPhoto from './pages/ViewPhoto/index';
import LikePhoto from './components/LikePhoto/index';
import LikesList from './components/LikesList/index';
import PhotoComments from './components/PhotoComments/index';
import Comment from './components/Comment/index';
import LikeComment from './components/LikeComment/index';
import EditPhoto from './components/EditPhoto/index';
import DeletePhoto from './components/DeletePhoto/index';
import Footer from './components/Footer/index';
import useUsers from './hooks/useUsers';
import { getUsers, getUser } from './redux/actions/userActions';

import './App.css';


export const Routes = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);
    const [err, users] = useUsers()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isLoading = useSelector(state => state.auth.isLoading)
    const user = useSelector(state => state.auth);
    const loadedUser = useSelector(state => state.users.user);

    console.log(user, isAuthenticated, isLoading)
    console.log(users)
    // const token  = localStorage.getItem('token');
    // const [initialToken, setToken] = useState(null)
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [user, setUser] = useState(null);
    const [state, setState] = useState({})
    // const [ photos, setPhotos ] = useState([]);
    const [msg, setMsg] = useState('');
    const [isErrorShowing, setIsErrorShowing] = useState(false);
    const [isUserPage, setIsUserPage] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [isPhotoPage, setIsPhotoPage] = useState(true);            
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPhotoAdded, setIsPhotoAdded] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);



    const fetchData = (offset) => {
    /*  
      console.log('calling fetch data', offset)
      const url = '/api/photos/';
      axios.get(url)
      .then((res) => {
        // console.log(res.data)
        let maxWidth = 500;
        let slice
        //if the screen is not a mobile screen
        if(window.innerWidth > maxWidth) {
          if(offset === undefined) {
            slice = res.data.slice(offset, offset + perPage);
            // console.log(this.state.offset, this.state.offset + this.state.perPage)
            // console.log('here', slice)
            
          } else {
            // console.log(offset)
            slice = res.data.slice(offset, offset + perPage);
            // console.log(offset, offset + this.state.perPage)
          }
           
          
            setPageCount(Math.ceil(res.data.length / this.state.perPage));
            setPhotos(slice)
            setIsPageLoading(true)
            setShowPagination(true)
            setShowPullToRefresh(false)
        
    
        } else {
          setPhotos(res.data)
            setIsPageLoading(true)
            setShowPagination(false)
            setShowPullToRefresh(true)
          
        }
        
    
      })
      .catch((err) => {
         
            setIsPageLoading(false)
            setIsErrorShowing(true)
        
      })
      */
    
    }


    useEffect(() => {
      dispatch(getPhotos());
      dispatch(getUsers());


    }, [dispatch]);

    console.log(loadedUser)
    
    
  
    
    /*
    const handlePageClick = (selectedPage) => {
      // console.log('selectedpage from app.js', selectedPage)
      // const selectedPage = e.selected;
      const offset = selectedPage * perPage;
      setCurrentPage(selectedPage)
        setOffset(offset)
        fetchData();
      
    }*/
    
    /*
    const registerUser = (newUser) => {
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
        // console.log(localStorage)
          this.setState({
            isAuthenticated: true,
            isLoading: false,
            redirectLogin: true,
            user: response.data,
            msg: '',
            
          })
          // console.log(this.state)
        
       
    
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
      
    
    }*/
    
    /*
    
    //LOGS in and authenticates the user
    const authenticateUser = (user) => {
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
            setIsAuthenticated(true)
            setIsLoading(false)
            setUser(response.data)
            setToken(response.data.token)
            setMsg('')
            console.log(user)
    
          
          // console.log('localstorage', localStorage, 'config', config)
          //will load the user calling the token and auth route from backend
           loadUser(config);
          
    
        })
        .catch((err) => {
            console.log(err)

          localStorage.removeItem('token');
              setToken(null)
              setIsAuthenticated(false)
              setIsLoading(false)
              setUser(null)
            //   setMsg(err.response.data.msg)
                 
        })
      
    }*/
    
 /*
    
    
    const loadUser = (config) => {
      // console.log('loading user', config)
      setIsLoading(true)

      // console.log(this.tokenConfig())
      // console.log(this.state.isLoading)
    
      axios.get('/api/login/user', tokenConfig(config))
      .then(response => {
        // console.log('response from loadUser', response.data)
        setIsAuthenticated(true)
          // isLoading: false,
          setUser(response.data)
          setRedirectPhotos(true)
        
        
      })
    
    }
    */
    
    const deleteComment = () => {
      fetchData();
    }
    
    
    const refreshPage = () => {
    
      setIsErrorShowing(false)
      fetchData();
      // fetchUsers();
      if(isAuthenticated) {
        loadUser();
    
      }
    
    }
    
    const tokenConfig = () => {
      const token = localStorage.getItem('token')
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
    
    // const doSomething = (loadPhotos) => {
    //   // console.log(loadPhotos)
    //   // this.setState({ userProfile: loadPhotos})
    //   this.state.userProfile = loadPhotos
      
    // }
    
    // const isUserPage = (isUserPage) => {
    //   console.log(isUserPage)
    //   this.state.isUserPage = isUserPage
    // }

    
    const addComment = (newComment) => {
      setState({newComment})
      fetchData();
    }
    
    const closePopup = () => {
      setIsPopupOpen(false); 
      setIsEditPopupOpen(false)
      fetchData();
      // fetchUsers();
      loadUser();
    
    }    
  return (

        <div className="wrapper">
        <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        isLoading={isLoading}
        />   
           
        <Switch>

        <Route path="/community" component={(props) => <Community
        users={users}
        photos={photos}
        {...props} />} />

        <Route path="/register" component={(props) => <Register 
          user={user}
          msg={msg}
          {...props}
          />} />

          <Route path="/login" component={(props) => <Login 
          isAuthenticated={isAuthenticated}
          msg={msg}
          {...props}
          />} />

          <Route path="/edituser/:id" component={(props) => <EditUser 
          id={props.match.params.id}
          users={users}
          user={user}
          tokenConfig={tokenConfig}
          {...props}/>} />
          
          <Route path="/user/:id" component={(props) => <User 
          id={props.match.params.id}
          user={user}
          users={users}
          photos={photos}
          isPopupOpen={isPopupOpen}
          closePopup={closePopup}
          {...props}/>} />
  
          <Route path="/editphoto/:id" component={(props) => <EditPhoto 
          photos={photos}
          tokenConfig={tokenConfig}
          {...props}
          />} />

          <Route path="/deletephoto/:id" component={(props) => <DeletePhoto 
          {...props}
          />} />

          <Route path="/photos/:id/likes" component={(props) => <LikesList 
          photos={photos}
          user={user}
          {...props}
          />} />

          <Route path="/photos/:id/comments" component={(props) => <PhotoComments 
          photos={photos}
          user={user}
          isAuthenticated={isAuthenticated}
          tokenConfig={tokenConfig}
          addComment={addComment}
          {...props}
          />} />
 
          <Route path="/photos/:id/like" component={(props) => <LikePhoto 
          photos={photos}
          user={user}
          {...props}
          />} />

          <Route path="/photos/:id/comments/:id/like" component={(props) => <LikeComment
          photos={photos}
          user={user}
          tokenConfig={tokenConfig}
          {...props}
          />} />

          <Route path="/addphoto" component={(props)=><AddPhoto 
          isAuthenticated={isAuthenticated}
          user={user}
          isLoading={isLoading}
          {...props}/>} />

          

            <Route path="/photos/:id" component={(props)=><ViewPhoto
              photos={photos}
              user={user}
              users={users}
              isAuthenticated={isAuthenticated}
              isUserPage={isUserPage}
              tokenConfig={tokenConfig}
              userProfile={userProfile}
              {...props} />} />
 
        
          <Route path="/photos/:id/comments/:id" component={(props) => 
          <Comment deleteComment={deleteComment}
          {...props}/>}/>
          

          <Route path="/photos" component={(props) => 
          <div>
          <PhotoList 
          key={props.match.params.id}
          photos={photos}
        //   token={token}
          isAuthenticated={isAuthenticated} 
          isErrorShowing={isErrorShowing}
          refreshPage={refreshPage}
          isPhotoAdded={isPhotoAdded}
          isPopupOpen={isPopupOpen}
          isEditPopupOpen={isEditPopupOpen}
          closePopup={closePopup}
          fetchData={fetchData}
          {...props}
          />
        
          </div>
          } 
          />
      
          <Route path="/" component={Home} />
    </Switch>              
    <Footer />
    </div>
  
    )
}

export default Routes;

