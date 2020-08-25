import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import {NavLink} from 'react-router-dom';
import '../assets/style/comments.css';

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            isCommentFieldOpened: false,
            isAddButtonShowing: true,
            text: '',
            author: ''

        }
        
    }

    fetchCommentsData = () => {
        const id = this.props.match.params.id
        const url = `/api/photos/${id}/comments`;
        axios.get(url)
        .then(res => 
            this.setState({
                comments: res.data
            })
    
        )
    }
    componentDidMount() {
        this.fetchCommentsData();
        
    }

    openCommentField = () => {
        this.setState({
            isCommentFieldOpened: !this.state.isCommentFieldOpened
        })

    }

    closeCommentField = () => {
        this.setState({
            isCommentFieldOpened: false
        })
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({[name] : value});
        console.log(name, value)

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { text } = this.state;
        const newComment = { text };
        console.log(newComment);
        const id = this.props.match.params.id
        const url = `/api/photos/${id}/comments`;
        axios.post(url, newComment, this.props.tokenConfig()).then((res) => {
            console.log('comment saved')
        })
        this.props.history.push(`/photos/${id}/comments`)
        this.props.addComment(newComment)


    }
    
    deleteComment = () => {
        this.fetchCommentsData();
    }
    editingComment = () => {
        this.setState({
            isAddButtonShowing: false
        })

    }

    closeEditingComment = () => {
        this.setState({
            isAddButtonShowing: true
        })
    }
    
    updateComment = (updatedComment) => {
        this.setState({updatedComment});
        this.fetchCommentsData()
    }
    
    
    render() {
        const { comments } = this.state;
        const { isAuthenticated } = this.props;
        const formattedComments = comments.map((comment) => (
        <Comment key={comment._id}
              commentId={comment._id}
              authorId={comment.author.id}
              name={comment.author.name}
              avatar={comment.author.avatar}
              date={comment.createdAt}
              commentText={comment.text}
              user={this.props.user}
              photoId={this.props.match.params.id}
              isAuthenticated={this.props.isAuthenticated}
              tokenConfig={this.props.tokenConfig}
              deleteComment={this.deleteComment}
              editingComment={this.editingComment}
              closeEditingComment={this.closeEditingComment}
              updateComment={this.updateComment}/>
        ))
        return (
            <div className="comments-container">
                <div className="comments-wrapper">
                <div className="comments-header">
                <NavLink to ={`/photos/${this.props.match.params.id}`}>
                <i className="fas fa-times-circle fa-2x grow"></i>
                </NavLink>
                </div>
                <h3>{comments.length} Comments</h3>
                {
                    comments.length < 1 ?
                    <h4>No Comments Yet</h4>
                    :
                    <div>
                        {formattedComments}
                    </div>
                }
                
                {
                    this.props.user !== null && isAuthenticated ?

                    <div>
                        {
                            this.state.isCommentFieldOpened ? 
                            <form className="add-comment__form animate-modal"
                            onSubmit={this.handleSubmit}>
                            <div className="input-topics">
                            <label htmlFor="description">Comment</label>
                            <textarea type="text" 
                            name="text"
                            value={this.state.ext} 
                            placeholder="write a new comment here"
                            onChange={this.handleChange}/>
                              <div className="btn-save__wrapper">
                    <button className="btn-save">Submit</button>
                    <button className="btn-save" onClick={this.closeCommentField}>Cancel</button>

                    </div>
                    </div>
                    </form>

                    : 
                    <div className="add-comment__btn__wrapper">
                        {
                            !this.state.isAddButtonShowing ? '' :                     
                            <button className="add-comment__btn" onClick={this.openCommentField}>Add Comment</button>
                            
                        }
                    </div>

                        }
                        </div>
                   
                    :

                    null

                }

             
                </div>

               
            </div>
        )
    }
}

export default Comments

