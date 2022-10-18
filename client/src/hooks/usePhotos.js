import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export default function usePhotos(search, category) {
  const photos = useSelector((state) => state.photo.photos);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [resultMsg, setResultMsg] = useState(null);


  useEffect(() => {
    const errMessage = 'Not Found'
    if (err) {
      setErr(errMessage)
    }
    setData(photos);
  }, [photos, err]);

  useEffect(() => {
    searchPhotosResults();
  }, [search]);

  useEffect(() => {
    selectCategory(category)
  }, [category])

  const searchPhotosResults = useCallback(() => {
    const results = photos.filter((photo) => {
      if (
        photo.title.includes(search) ||
        photo.title.toLowerCase().includes(search) ||
        photo.author.name.includes(search) ||
        photo.author.name.toLowerCase().includes(search) ||
        photo.type.includes(search) ||
        photo.type.toLowerCase().includes(search)
      ) {
        return photo;
      }
    });

    if (results.length < 1) {
      setResultMsg("No results");
    } else {
      setData(results);
      setResultMsg(null);
    }
  }, [photos, search]);

  const selectCategory = useCallback(
    (category) => {
      const selectedPhotos = photos.filter((photo) => {
        const { type } = photo;
        if(type.includes(category)) {
           return photo
        }
        if(category.includes('all')) {
          return photo
        }
      })
      if(selectedPhotos.length < 1) {
        setResultMsg('No results')
      } else {
        setData(selectedPhotos);
        setResultMsg(null);
      }
       
      
    },
    [category],
  )

  return [err, data, resultMsg];
}
