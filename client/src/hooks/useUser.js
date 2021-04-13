import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../redux/actions/userActions"

export default function useUser(userId) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState({_id: '', email: '', name: '', medium: [], photos: []});
  const [err, setErr] = useState(null);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if(err) {
      setErr('Something went wrong')
    }
    setData(user)
  }, [user, err]);

  return [err, data];
}
