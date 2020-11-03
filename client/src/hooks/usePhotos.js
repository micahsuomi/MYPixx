import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export default function usePhotos(search) {
  const photos = useSelector((state) => state.photos.photos);
  // const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [searchMsg, setSearchMsg] = useState("");

  useEffect(() => {
    setData(photos);
  }, [photos, err]);

  useEffect(() => {
    searchPhotosResults();
  }, [search]);

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
      let resultsMsg = "No results match this search";
      setSearchMsg(resultsMsg);
    } else {
      setSearchMsg("");
    }
    setData(results);
  }, [photos, search]);

  return [err, data];
}
