import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
//   PullToRefresh,
//   PullDownContent,
//   ReleaseContent,
//   RefreshContent,
// } from "react-js-pull-to-refresh";
import PropTypes from "prop-types";

import { getPhotos } from "../../redux/actions/photoActions";
import usePhotos from "../../hooks/usePhotos";
import Header from "../../components/Header";
import PhotoItem from "../../components/PhotoItem/index";
import AddPhotoButton from "../../components/AddPhotoButton/index";
import SelectCategoryForm from "../../components/SelectCategoryForm";
import AddPopup from "../../components/AddPopup/index";
import EditPopup from "../../components/EditPopup/index";
import ErrorLoading from "../../components/ErrorLoading/index";
import Loader from "../../components/PhotosLoading/index";
import Pagination from "../../components/Pagination";

import "./style.scss";

const PhotoList = (
  { closePopup, refreshPage, isAuthenticated, isPopupOpen, isEditPopupOpen },
  props
) => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const isLoading = useSelector((state) => state.photo.isLoading);

  const [err, photos, resultMsg] = usePhotos(search, category);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(9);
  //get current photos
  const indexLastPhoto = currentPage * photosPerPage;
  const indexFirstPhoto = indexLastPhoto - photosPerPage;
  const currentPhotos = photos?.slice(indexFirstPhoto, indexLastPhoto);
  const [isUserPage] = useState(false);

  const checkScreenSize = () => {
    const maxWidth = 500;
    if (window.innerWidth < maxWidth) {
    }
  };

  useEffect(() => {
    checkScreenSize();
    if (err) {
      console.log("err here", err);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const selectCategoryOnClick = (selectedCategory) => {
    setCategory(selectedCategory);
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
          isUserPage={isUserPage}
          {...props}
        />
      ))
 
  return (
    <>
      <Header
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="photo-gallery">
        {isLoading ? (
          <div>
              <div>
                <div className="photo-gallery__add-photo-sort">
                  {isAuthenticated && <AddPhotoButton />}
                  <SelectCategoryForm selectCategory={selectCategoryOnClick} />
                </div>
                <div>
                  {resultMsg ? (
                    <div className="photo-gallery__result-msg">
                      <h2>{resultMsg}</h2>
                    </div>
                  ) : (
                    <div className="photo-gallery__wrapper">{photoList}</div>
                  )}
                </div>
                {!search &&
                  category === "all" && (
                    <>
                      <Pagination
                        itemsPerPage={photosPerPage}
                        totalItems={photos?.length}
                        currentPage={currentPage}
                        paginate={paginate}
                      />
                    </>
                  )}
                {isPopupOpen && <AddPopup closePopup={closePopup} />}
                {isEditPopupOpen && <EditPopup closePopup={closePopup} />}
              </div>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <ErrorLoading refreshPage={refreshPage} />
            ) : (
              <Loader />
            )}
          </div>
        )} 
      </div>
    </>
  );
};

export default PhotoList;

PhotoList.propTypes = {
  closePopup: PropTypes.func,
  refreshPage: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isPopupOpen: PropTypes.bool,
  isEditPopupOpen: PropTypes.bool,
};
