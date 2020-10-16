import { useEffect, useState } from "react";
import { firestoreDB } from '../firebase';

const useFieldsFromData = (collectionName, userUID) => {
  const [fieldData, setFieldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getData = async() => {
    if(userUID) {
      return await firestoreDB
      .collection(collectionName)
      .doc(userUID)
      .collection("fields")
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
    }
  }

  useEffect(() => {
   getData();
    // avoid memory leak
    // return () => unsubscribe();
  }, [collectionName]);
  return { loading, fieldData, error };
};

export default useFieldsFromData;
