// import React from 'react';
import { NavLink } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import ReactPaginate from 'react-paginate';
import { PullToRefresh } from "react-js-pull-to-refresh";
import { PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import '../assets/style/photolist.css';


import React, { Component } from 'react'

export class PhotoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPhotosLoaded: true,
            currentPage: 0,
            offset: 0



        }
    }


    
      /*handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.props.perPage;

        this.setState({
          currentPage: selectedPage,
          offset: offset
        }, () => {
            console.log('offset', this.state.offset, 'currentpage', this.state.currentPage)
            let offset = this.state.offset
        this.props.fetchData(offset);
        //     console.log('offset', this.props.offset, 'currentpage', this.props.currentPage)
        })
      }*/

      



      componentDidMount() {
          this.setState({
              isPhotosLoaded: true,
          })
      }


      handlePageClick = (e) => {
          console.log('working barely!!!')
          const selectedPage = e.selected;
          console.log(selectedPage)
          this.props.handlePageClick(selectedPage)
          console.log('selected page from photolist', selectedPage)
      }
       closePopup = () => {
        this.props.closePopup()
    }

    onRefresh = () => {
        this.props.refreshPage()
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);

        });
    }
 
    render() {

        const photoList = this.props.photos.map((photo) => (
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
                       likePhoto={() => this.props.likePhoto()}
                       {...this.props} />
        ))
       
        return (
            <div className="photo-gallery__container">
                
                {
                    this.props.isPageLoading && !this.props.isErrorShowing ? 
                <div>
                
                <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={200}
                onRefresh={this.onRefresh}
                triggerHeight={50}
                backgroundColor='rgb(247, 239, 239)'
                startInvisible={true}
                className="pull-to-refresh"
                >
                <div style={{mieight: '150vh', textAlign: 'center', backgroundColor: 'rgb(247, 239, 239)'}}>
                    {
                        this.props.showPullToRefresh ?
                        <div className="pull-to-refresh__wrapper">
                        <p>Pull To Refresh</p>
                        <i class="fas fa-chevron-down"></i>
                        </div>
                        : null
                    }
                    
                {/* {
                    this.props.showPagination ? 
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.props.pageCount}
                    perPage={this.props.perPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    
                    /> : null
                }
                 */}
              
           {
           this.props.isAuthenticated ? 
           <div className="add-photo-link__container">
            <NavLink to='/addphoto' 
            className="add-photo-link">
              <i className="fas fa-plus-circle fa-2x"></i> 
              <span className="add">Add New</span>
              </NavLink>
           </div> 
           : 
              <h3 className="login-msg"><NavLink to="/login">Login</NavLink> to Upload Your Pictures</h3>
              }

               {
                   this.props.isPopupOpen ?
                   <div className="photo-added__popup__container">
                   <div className="photo-added__popup">
                   <div className="photo-added__popup__header">
                   <i className="fas fa-times-circle fa-2x grow" onClick={this.closePopup}></i>
                   </div>
                   <div className="photo-added__popup__body">
                       <h3>Photo Added!</h3>
                    </div>
                   </div>
                   </div>
                   :
                   null
               }

               {
                   this.props.isEditPopupOpen ?

                   <div className="photo-added__popup__container">
                   <div className="photo-added__popup">
                   <div className="photo-added__popup__header">
                   <i className="fas fa-times-circle fa-2x grow" onClick={this.closePopup}></i>
                   </div>
                   <div className="photo-added__popup__body">
                       <h3>Photo Edited!</h3>
                    </div>
                   </div>
                   </div>
                   :
                   null
               }
     

               <div>
               <div className="photo-gallery__wrapper">
               {photoList}
               </div>
               <div>
          
               </div>
               </div>
        
                </div>
                </PullToRefresh>
          
     
                    </div>
                    
                    :
                    
                    <div>
                        {
                            !this.props.isPageLoading && this.props.isErrorShowing ?
                            <div className="error-container">
                            <h3>Something went wrong. Click here to refresh the page</h3>
                            <button onClick={this.props.refreshPage} className="btn-refresh grow"><i className="fas fa-redo-alt fa-2x"></i></button>
                            </div>
                            :
                            <div className="loading-container">
                            <h1>Loading Photos...</h1>
                            <div className="lds-circle"><div></div></div>
                            </div>
                        }
                    </div>

                   
                }
       
       </div>
        )
    }
}

export default PhotoList


    
