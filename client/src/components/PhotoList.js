import React from 'react';
import { NavLink } from 'react-router-dom';
import PhotoItem from './PhotoItem';
// import ReactPaginate from 'react-paginate';
import '../assets/style/photolist.css';



const PhotoList = (props) => {
    console.log(props)
    let { isAuthenticated, isPageLoading, isErrorShowing } = props;
    const photoList = props.photos.map((photo) => (
        <PhotoItem key={photo._id}
                   id={photo._id}
                   name={photo.name}
                   image={photo.image}
                   description={photo.description}
                   author={photo.author.name}
                   authorId={photo.author.id}
                   authorImg={photo.author.avatar}
                   likes={photo.likes}
                   comments={photo.comments}
                   likePhoto={()=>props.likePhoto()}
                   {...props} />
    ))
  
    return (
            <div className="photo-gallery__container">
                {
                isAuthenticated ? 
                <div className="add-photo-link__container">
                 <NavLink to='/addphoto' 
                 className="add-photo-link">
                   <i className="fas fa-plus-circle fa-2x"></i> 
                   <span className="add">Add New</span>
                   </NavLink>
                </div> 
                : 
                   <h3><NavLink to="/login">Login</NavLink> to Upload Your Pictures</h3>
                   }
                {
                    !isPageLoading && isErrorShowing ?

                    <div className="error-container">
                        <h1>Something went wrong. Click here to refresh the page</h1>
                        <button onClick={props.refreshPage} className="btn-refresh">Refresh</button>
                    </div>

                    : ''
                }
               
                {
                    isPageLoading ? 
                    
                  
                    <div className="lds-circle"><div></div></div>

                    :
                    

                    <div>
                    <div className="photo-gallery__wrapper">
                    {photoList}
                    </div>
                    <div>
                {/* <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={props.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/> */}
                    </div>
                    </div>

                
  
                

            }

          
              
            </div>
    )
}

    
export default PhotoList;
