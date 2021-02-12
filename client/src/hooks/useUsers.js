import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUsers } from "../redux/actions/userActions";
export default function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  useEffect(() => {
    if(err) {
      setErr('Something went wrong')
    }
    setData(users);
  }, [users, setData]);

  console.log(users, );
  return [err, data];
}
