import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function useUser() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  /*
  useEffect(() => {
    setData(user);
  }, [dispatch]);

  console.log(user);*/
  return [err, data];
}
