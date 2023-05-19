import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useUser() {
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState({_id: '', email: '', name: '', medium: [], photos: []});
  const [err, setErr] = useState(null);

  useEffect(() => {
    if(err) {
      setErr('Something went wrong')
    } else {
      setUserData(user)
    }
  }, [err, user]);

  return [err, userData];
}
