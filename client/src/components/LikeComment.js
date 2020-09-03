import React, { Component } from 'react'
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import CommentLike from './CommentLike';
import '../assets/style/likephoto.css';
import '../assets/style/likecomment.css'




class LikeComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: [],
            isLikesShowing: false,

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.user) {
            this.props.history.push('/login')
        } else {
            const url = `/api/photos/${this.props.photoId}/comments/${this.props.commentId}/like`
           
            if(this.props.user) {
                console.log('here')
                
                const likedComment = this.props.foundComment;
                console.log(likedComment)
                axios.post(url, likedComment, this.props.tokenConfig())
                .then(res => {
                console.log(res.data, 'liked')
                
              
            })
            .catch(err => console.log(err))
            console.log('likedcomment', likedComment)
            this.props.updateLikesComment(likedComment)
            
            // this.props.history.push(`/photos/${this.props.photoId}/comments`)




            }
            
        }
         

      } 
     
    


      loadLikes = () =>  {
        // const id = this.props.match.params.id
        let {photoId, commentId} = this.props;
        const url = `/api/photos/${photoId}/comments/${commentId}/likes`;
        axios.get(url)
        .then(res => 
            // console.log('loading comment likes', res.data)
            this.setState({
                  likes: res.data,
                  isLikesShowing: true
              })
    
        )
        console.log(this.state.likes)

    
    }

    closeLikes = () => {
        this.setState({
            isLikesShowing: false
        })
    }
      
        
    render() {
        console.log(this.props)
        let { photoId, commentId, user } = this.props;
        console.log(user)
        const { likes, isLikesShowing } = this.state;
        let likedPhotoComment
        if(this.props.user) {
             likedPhotoComment = this.props.likes.some((like) => like === user._id)
             console.log('likedphoto comment here', likedPhotoComment)
        }
        const formattedLikes = likes.map((like) => (
        <CommentLike key={like._id}
              userId={like._id}
              avatar={like.avatar}
              name={like.name}
              />
        ))
        console.log('user here', user, console.log(formattedLikes))

        return (
            <div>
                 <div className="like-comment__form__container">
                  <form className="like-container" onSubmit={this.handleSubmit}>
                {
                    user && likedPhotoComment ?

                    <button className="like-comment__btn grow"><i className="fas fa-heart full-heart"></i> Unlike</button>
                    :
                    <button className="like-comment__btn grow"><i className="far fa-heart empty-heart"></i> Like</button>
                }
            {
                this.props.likes.length > 0 ?
                <NavLink to ={`/photos/${photoId}/comments/${commentId}/likes`} className="likes-number grow" onClick={this.loadLikes}>{this.props.likes.length} 
                
                {
                    this.props.likes.length === 1 ? <span className="like-comments-num"> Like</span> : <span> Likes</span>
                }
                
                </NavLink>
                : null

            } 
            </form>    
            {

                isLikesShowing ? <div className="like-comments__container">
                <div className="likes-comments__header">
                <NavLink to ={`/photos/${this.props.photoId}/comments/`} onClick={this.closeLikes}>
                <i className="fas fa-times-circle grow"></i>
                </NavLink>
                </div>
                <div className="likes-comments__body">
                {formattedLikes}
                </div> 
            </div> : null
            } 
            </div>
            </div>
        )
    }
}

export default LikeComment;


/*
const LikeComment = (props) => {
    console.log(props)
    console.log(props.likes.length)
    const { photoId, commentId, likes } = props;
  
        const handleSubmit = (e) => {
        e.preventDefault();
        if(!props.user) {
            props.history.push('/login')
        } else {
            const url = `/api/photos/${photoId}/comments/${commentId}/like`
           
            if(props.user) {
                console.log('here')
                
                const newLike = props.user._id
                const likeComment = likes;
                console.log('token config for likes', props.tokenConfig())
                axios.post(url, likeComment, props.tokenConfig())
                .then(res => {
                console.log(res.data, 'liked')
              
            })
            .catch(err => console.log(err))
            props.likeComment(likeComment);


            }
            
        }
         

      } 
      
        let likedPhotoComment
        if(props.user) {
             likedPhotoComment = props.likes.some((like) => like._id === props.user._id)
            console.log(likedPhotoComment)
        }
        return (
            <div>
                  <form className="like-container" onSubmit={handleSubmit}>
                {
                    props.user && likedPhotoComment ?

                    <button className="like-btn"><i className="fas fa-heart full-heart grow"></i></button>
                    :
                    <button className="like-btn"><i className="far fa-heart empty-heartgrow"></i></button>
                }
            {
                props.likes.length > 0 ?
                <NavLink to ={`/photos/${photoId}/comments/${commentId}/likes`} className="likes-number grow">{props.likes.length} 
                {
                    props.likes.length === 1 ? <span className="like-comments-num"> Like</span> : <span> Likes</span>
                }
                
                </NavLink>
                : null

            } 
            </form>    
            </div>
        )
    }


export default LikeComment;*/
