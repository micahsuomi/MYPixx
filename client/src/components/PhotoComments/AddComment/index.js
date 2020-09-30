import React, {Component} from 'react';
import axios from 'axios';

class AddComment extends Component{
    constructor(props) {
        super(props)
        this.state = {
            text: ''

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { text } = this.state;
        let { photoId } = this.props;
        const newComment = { text };
        console.log(newComment);
        // const id = this.props.match.params.id
        const url = `/api/photos/${photoId}/comments`;
        axios.post(url, newComment, this.props.tokenConfig()).then((res) => {
            console.log('comment saved')
        })
        this.props.history.push(`/photos/${photoId}/comments`)
        this.props.addComment(newComment)
        
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({[name] : value});
        console.log(name, value)

    }
    render() {
        console.log(this.props)
        return (
            <form className="add-comment__form animate-modal"
                onSubmit={this.handleSubmit}>
                    <div className="input-topics">
                        <label htmlFor="description">Comment</label>
                        <textarea type="text" 
                        name="text"
                        value={this.state.text} 
                        placeholder="write a new comment here"
                        onChange={this.handleChange}/>
                    <div className="btn-save__wrapper">
                    <button className="btn-save">Submit</button>
                <button className="btn-save" onClick={this.closeCommentField}>Cancel</button>
                </div>
            </div>
        </form>
        )
    }
    
}

export default AddComment;
