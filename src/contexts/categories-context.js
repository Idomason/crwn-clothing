import { createContext, useState, useEffect } from 'react';
// import { addCollectionAndDocuments } from '../utils/firebase/firebase';
// import SHOP_DATA from '../shop-data';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase';

// Actual value you want access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// Actual component
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();

      setCategoriesMap(categoriesMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
