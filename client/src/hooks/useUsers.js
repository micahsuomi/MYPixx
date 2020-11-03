import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUsers } from "../redux/actions/userActions";
export default function useUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  console.log(users);
  useEffect(() => {
    setData(users);
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users);
  return [err, data];
}
