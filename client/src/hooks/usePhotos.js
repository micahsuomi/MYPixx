import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function usePhotos() {
  const photos = useSelector((state) => state.photos.photos);
  // const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setData(photos);
  }, [photos, err]);

  return [err, data];
}
