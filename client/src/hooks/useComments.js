import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useComments() {
  const comments = useSelector((state) => state.comment.comments);

  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if(err) {
      setErr("There was a problem loading the page")
    }
    setData(comments);
  }, [comments, err]);

  return [err, data];
}
