import { useEffect, useState } from "react";
import { firestoreDB } from '../firebase';

const useDataFromFirestore = (collectionName, userUID, subCollectionName) => {
  const [dbdata, setDbData] = useState([]);
  const [dbLoadingStatus, setDbLoadingStatus] = useState(true);
  const [dbError, setDbError] = useState();

  const getData = async() => {
    if(userUID) {
      return await firestoreDB
      .collection(collectionName)
      .doc(userUID)
      .collection(subCollectionName)
      .get()
      .then((querySnapshot) => {
        setDbLoadingStatus(true)
        const data = querySnapshot.docs.map((doc) => doc.data());
        if (data.length) {
          setDbData(data);
        }
        setDbLoadingStatus(false);
      })
      .catch(() => {
        setDbError('Error while getting data from DB');
        setDbLoadingStatus(false);
      });
    }
  }

  useEffect(() => {
   getData();
  }, [collectionName]);
  return { dbdata, dbLoadingStatus, dbError };
};

export default useDataFromFirestore;
