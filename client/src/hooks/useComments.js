import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../redux/actions/photoActions";

export default function useComments() {
  const comments = useSelector((state) => state.comment.comments);
  // const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setData(comments);
  }, [comments, err]);

  return [err, data];
}
