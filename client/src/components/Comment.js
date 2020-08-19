import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import '../assets/style/comment.css';

export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            comment: {
                text: ''
            }

        }
    }
    deleteComment = () => {
        const url = `/api/photos/${this.props.photoId}/comments/${this.props.commentId}`
        axios.delete(url, this.props.tokenConfig())
        .then(res => {
        })
        .catch((err) => console.log('err showing', err))
        this.props.deleteComment()
        
    }

    fetchCommentData = () => {
        const url = `/api/photos/${this.props.photoId}/comments`;
        axios.get(url)
        .then(res => {
            let foundComment = res.data.find(comment => comment._id === this.props.commentId);
            this.setState({
                comment: foundComment
            })
        }) 

    }

    openEditComment = () => {
        this.fetchCommentData();
        this.setState({isEditing: true});

    }

    closeEditComment = () => {
        this.setState({isEditing: false});

    }

    handleChange = (e) => {
        let { name, value } = e.target;
        const comment = {...this.state.comment, [name] : value}
        this.setState({comment});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let updatedComment = this.state.comment;
        console.log(updatedComment)
        const url = `/api/photos/${this.props.photoId}/comments/${this.props.commentId}`
        axios.put(url, updatedComment, this.props.tokenConfig())
        .then((res) => {
        })
        .catch((err) => console.log(err))
        this.props.updateComment(updatedComment);
        this.setState({isEditing: false})
        
    }
    render() {
        let { avatar, authorId, name, date, commentText, user, isAuthenticated } = this.props; 
        let { text } = this.state.comment;
        return (
            <div className="comment-user__container">
        <div className="comment-user__header">
               <div className="comment-image-container">  
              {
                    avatar === undefined || avatar === ''
                    ?
                    <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={avatar}/>
                    :
                    <img src={avatar} alt={avatar}/>

                }              
              </div>
            <div>
            <NavLink to ={`/user/${authorId}`} className="comment-user__name grow">
                <p>{name}</p>
            </NavLink>
            <p className="comment-date">{date}</p>
            {
                !this.state.isEditing ?  
            <div>
                <p className="comment-text">{commentText}</p>
            <div>
            {
                user && isAuthenticated && authorId === user._id ?   <i className="fas fa-trash delete-comment__btn grow" onClick={this.deleteComment}></i>
                : null
            }
            {
                user && isAuthenticated && authorId === user._id ?   
                <i className="fas fa-edit edit-comment__btn grow" onClick={this.openEditComment}></i>
                : null
            }
            </div>
            </div>

            :
            <form className="edit-comment__form" onSubmit={this.handleSubmit}>
                <textarea type="text"
                    value={text}
                    name="text"
                    placeholder='write comment here'
                    onChange={this.handleChange}>
                </textarea>
                <div className="submit-cancel__btn__wrapper">
                <button className="edit-delete__comment-btn"><i className="fas fa-check-circle fa-2x edit-comment__btn"></i></button>
                <button  className="edit-delete__comment-btn"onClick={this.closeEditComment}><i className="fas fa-times-circle fa-2x delete-comment__btn"></i></button>
                </div>
            </form>
            
            }
            
            </div>

           



        </div>
        
        </div>
        )
    }
}

export default Comment

/*
const Comment = (props) => {
    console.log(props)
    let { commentId, authorId, name, date, avatar, text, photoId, user, isAuthenticated } = props;
    
    const deleteComment = () => {
        const url = `/api/photos/${photoId}/comments/${commentId}`
        axios.delete(url, props.tokenConfig())
        .then(res => {
            console.log(res.data)
        })
        .catch((err) => console.log('err showing', err))
        props.deleteComment()
        
    }

    const openEditComment = () => {

    }
    return (
        
        <div className="comment-user__container">
        <div className="comment-user__header">
               <div className="comment-image-container">  
              {
                    avatar === undefined || avatar === ''
                    ?
                    <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={avatar}/>
                    :
                    <img src={avatar} alt={avatar}/>

                }              
              </div>
            <div>
            <NavLink to ={`/user/${authorId}`} className="comment-user__name grow">
                <p>{name}</p>
            </NavLink>
            <p>{date}</p>
            <p className="comment-text">{text}</p>
            <div>
            {
                user && isAuthenticated && authorId === user._id ?   <i className="fas fa-trash delete-comment__btn grow" onClick={deleteComment}></i>
                : null
            }
            {
                user && isAuthenticated && authorId === user._id ?   
                <i className="fas fa-edit edit-comment__btn grow" onClick={openEditComment}></i>
                : null
            }
            </div>
            </div>

           



        </div>
        
        </div>
    )
}
export default Comment;*/
