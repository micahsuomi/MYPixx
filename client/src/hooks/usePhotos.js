import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export default function usePhotos(search, category) {
  const photos = useSelector((state) => state.photo.photos);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [resultMsg, setResultMsg] = useState(null);

  const searchPhotosResults = useCallback(() => {
    const results = photos.filter((photo) => {
      if(category === "all") {
        return photo          
      }      
      if(photo.type === category) {
        if (
          (photo.title.includes(search) ||
          photo.title.toLowerCase().includes(search)) ||
          (photo.author.name.includes(search) ||
          photo.author.name.toLowerCase().includes(search)) ||
          (photo.type.includes(search) ||
          photo.type.toLowerCase().includes(search))
        ) {
          console.log("here here here")
          return photo;
        }
      }
   
    });

    if (results.length < 1) {
      setResultMsg("No results");
    } else {
      setData(results);
      setResultMsg(null);
    }
  }, [photos, search, category]);


  useEffect(() => {
    const errMessage = 'Not Found'
    if (err) {
      setErr(errMessage)
    }
    setData(photos);
  }, [photos, err]);

  useEffect(() => {
    console.log("category", category)
    searchPhotosResults();
  }, [search, category]);

  return [err, data, resultMsg];
}
