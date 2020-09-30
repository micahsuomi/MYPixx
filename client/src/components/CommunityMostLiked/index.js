import React from 'react';

const CommunityMostLiked = ({ image, name, author, likes}) => {
    
    return (
        <div className="photo-sorted__card grow">
        <div className="photo-sorted__image__container">
            <img src={image} alt={name}/>
        </div>
            <h4>{name}</h4>
            <h5>{author.name}</h5>
                <p className="photo-sorted__likes"><i className="fas fa-heart full-heart"> 
                    <span className="photo-sorted__likes">
                        {likes.length} 
                            {
                                likes.length > 1 ? " Likes" : " Like"
                            }
                        </span></i>
                    </p> 
            </div>
    )
}

export default CommunityMostLiked;