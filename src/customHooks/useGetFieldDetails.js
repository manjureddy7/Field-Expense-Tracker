import { useEffect, useContext, useState } from "react";
import FirebaseContext from "../context/firebaseContext";

const useGetFieldDetails = (collectionName) => {
  const firebaseContext = useContext(FirebaseContext);
  const [fieldData, setFieldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const db = firebaseContext.firestore();
    const unsubscribe = db
      .collection(collectionName)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        if (data.length) {
          setFieldData(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    // avoid memory leak
    return () => unsubscribe();
  }, [firebaseContext, collectionName]);
  return { loading, fieldData, error };
};

export default useGetFieldDetails;
