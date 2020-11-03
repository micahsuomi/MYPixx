import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  PullToRefresh,
  PullDownContent,
  ReleaseContent,
  RefreshContent,
} from "react-js-pull-to-refresh";

import usePhotos from "../../hooks/usePhotos";
import Header from "../../components/Header";
import PhotoItem from "../../components/PhotoItem/index";
import AddPhotoButton from "../../components/AddPhotoButton/index";
import AddPopup from "../../components/AddPopup/index";
import EditPopup from "../../components/EditPopup/index";
import ErrorLoading from "../../components/ErrorLoading/index";
import PhotosLoading from "../../components/PhotosLoading/index";
import Pagination from "../../components/Pagination";

import "./style.scss";

const PhotoList = (props) => {
  const [search, setSearch] = useState("");
  // console.log('coming from photos', props.isAuthenticated)
  const isLoading = useSelector((state) => state.photos.isLoading);
  const errMessage = useSelector((state) => state.photos.err);
  const dispatch = useDispatch();
  const [err, photos] = usePhotos(search);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(9);

  //get current photos
  const indexLastPhoto = currentPage * photosPerPage;
  const indexFirstPhoto = indexLastPhoto - photosPerPage;
  const currentPhotos = photos?.slice(indexFirstPhoto, indexLastPhoto);
  const [showPullToRefresh, setShowPullToRefresh] = useState(false);

  let {
    closePopup,
    refreshPage,
    isErrorShowing,
    isAuthenticated,
    isPopupOpen,
    isEditPopupOpen,
    likePhoto,
    isUserPage,
    userProfile,
  } = props;

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

  const onRefresh = () => {
    refreshPage();
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };
  // useEffect(() => {
  //     isUserPage && userProfile ? props.history.push('/user') : console.log('is photo page')
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const photoList = currentPhotos.map((photo) => (
    <PhotoItem
      key={photo._id}
      id={photo._id}
      title={photo.title}
      image={photo.image}
      type={photo.type}
      camera={photo.camera}
      description={photo.description}
      author={photo.author.name}
      authorId={photo.author.id}
      authorImg={photo.author.avatar}
      likes={photo.likes}
      comments={photo.comments}
      likePhoto={(props) => likePhoto()}
      {...props}
    />
  ));

  console.log("photos", photos);
  return (
    <>
      <Header
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="photo-gallery__container">
        {isLoading && !isErrorShowing ? (
          <div>
            <PullToRefresh
              pullDownContent={<PullDownContent />}
              releaseContent={<ReleaseContent />}
              refreshContent={<RefreshContent />}
              pullDownThreshold={200}
              onRefresh={onRefresh}
              triggerHeight={50}
              startInvisible={true}
              className="pull-to-refresh"
            >
              <div>
                {showPullToRefresh ? (
                  <div className="pull-to-refresh__wrapper">
                    <p>Pull To Refresh</p>
                    <i class="fas fa-chevron-down"></i>
                  </div>
                ) : null}
                {search === "" && (
                  <>
                    <Pagination
                      itemsPerPage={photosPerPage}
                      totalItems={photos?.length}
                      currentPage={currentPage}
                      paginate={paginate}
                    />
                    <div className="add-photo-link__container">
                      {isAuthenticated ? (
                        <AddPhotoButton />
                      ) : (
                        <h3 className="login-msg">
                          <NavLink to="/login">Login</NavLink> to Upload Your
                          Pictures
                        </h3>
                      )}
                    </div>
                  </>
                )}

                {isPopupOpen && <AddPopup closePopup={closePopup} />}
                {isEditPopupOpen && <EditPopup closePopup={closePopup} />}

                <div>
                  <div className="photo-gallery__wrapper">{photoList}</div>
                </div>
              </div>
            </PullToRefresh>
          </div>
        ) : (
          <div>
            {isLoading && isErrorShowing ? (
              <ErrorLoading refreshPage={refreshPage} />
            ) : (
              <PhotosLoading />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoList;
