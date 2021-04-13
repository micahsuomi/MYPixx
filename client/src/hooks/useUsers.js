import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useUsers() {
  const users = useSelector((state) => state.user.users);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if(err) {
      setErr('Something went wrong')
    }
    setData(users);
  }, [users, err]);

  return [err, data];
}
