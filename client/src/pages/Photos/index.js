import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import usePhotos from '../../hooks/usePhotos';
import { NavLink } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem/index';
import ReactPaginate from 'react-paginate';
import { PullToRefresh } from "react-js-pull-to-refresh";
import { PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import AddPhotoButton from '../../components/AddPhotoButton/index';
import AddPopup from '../../components/AddPopup/index';
import EditPopup from '../../components/EditPopup/index';
import ErrorLoading from '../../components/ErrorLoading/index';
import PhotosLoading from '../../components/PhotosLoading/index';
import './style.css';



const PhotoList = (props) => {   
    // console.log('coming from photos', props.isAuthenticated)
    const isLoading = useSelector(state => state.photos.isLoading);
    const errMessage = useSelector(state => state.photos.err)

    let { closePopup, 
        refreshPage,
        isErrorShowing,
        isAuthenticated,
        isPopupOpen,
        isEditPopupOpen,
        likePhoto,
        isUserPage,
        userProfile

    } = props;

    const dispatch = useDispatch()
    const [err, photos] = usePhotos([])
    const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [showPagination, setShowPagination] = useState(true);
    const [showPullToRefresh, setShowPullToRefresh] = useState(false);

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    // console.log(isAuthenticated)
    //   useEffect(() => {
    //     dispatch(getPhotos())
    //     setIsPhotoLoaded(true)
    //     // props.getPhotos()
    //   })

    // useEffect(() => {
    //      dispatch(getPhotos())

    //    }, [dispatch]);

   /*
      let maxWidth = 500;
      let slice
      //if the screen is not a mobile screen
      if(window.innerWidth > maxWidth) {
        if(offset === undefined) {
          slice = photos.slice(offset, offset + perPage);
          // console.log(this.state.offset, this.state.offset + this.state.perPage)
          // console.log('here', slice)
          
        } else {
          // console.log(offset)
          slice = photos.slice(offset, offset + perPage);
          // console.log(offset, offset + this.state.perPage)
        }
         
        
          setPageCount(Math.ceil(photos.length / perPage));
        //   setPhotos(slice)
          setIsPageLoading(true)
          setShowPagination(true)
          setShowPullToRefresh(false)
      
  
      } else {
          setShowPagination(false)
          setShowPullToRefresh(true)
        
      }*/

      

    const handlePageClick = (e) => {
          console.log('working barely!!!')
          const selectedPage = e.selected;
          console.log(selectedPage)
          handlePageClick(selectedPage)
          console.log('selected page from photolist', selectedPage)
    }
  

    const onRefresh = () => {
        refreshPage()
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);

        });
    }
    // useEffect(() => {
    //     isUserPage && userProfile ? props.history.push('/user') : console.log('is photo page')
    // })
   
        const photoList = photos.map((photo) => (
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
                       likePhoto={(props) => likePhoto()}
                       {...props} />
        ))
       
        return (
            <div className="photo-gallery__container">
                
                {
                    isLoading && !isErrorShowing ? 
                <div>
                
                <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={200}
                onRefresh={onRefresh}
                triggerHeight={50}
                backgroundColor='rgb(247, 239, 239)'
                startInvisible={true}
                className="pull-to-refresh"
                >
                <div style={{mieight: '150vh', textAlign: 'center', backgroundColor: 'rgb(247, 239, 239)'}}>
                    {
                        showPullToRefresh ?
                        <div className="pull-to-refresh__wrapper">
                        <p>Pull To Refresh</p>
                        <i class="fas fa-chevron-down"></i>
                        </div>
                        : null
                    }
                    
                
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    perPage={perPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    
                    /> 
                
                 
              
           {
           isAuthenticated ? 
            <AddPhotoButton />
           : 
              <h3 className="login-msg"><NavLink to="/login">Login</NavLink> to Upload Your Pictures</h3>
              }

               {
                   isPopupOpen ?
                    <AddPopup closePopup={closePopup}/>
                   :
                   null
               }

               {
                   isEditPopupOpen ?
                    <EditPopup closePopup={closePopup}/>
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
                            isLoading && isErrorShowing ?
                            <ErrorLoading refreshPage={refreshPage} />
                            :
                           <PhotosLoading />
                        }
                    </div>
                }
       </div>
        )
    
}


 export default PhotoList;


    
