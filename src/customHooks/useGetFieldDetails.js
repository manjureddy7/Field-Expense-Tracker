import { useEffect, useState } from "react";
import { firestoreDB } from '../firebase';

const useGetFieldDetails = (collectionName) => {
  const [fieldData, setFieldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // const db = firebaseContext.firestore();
    firestoreDB
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
    // return () => unsubscribe();
  }, [collectionName]);
  return { loading, fieldData, error };
};

export default useGetFieldDetails;
