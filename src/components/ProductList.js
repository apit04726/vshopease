import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import Pagination from "./Pagination";

const ProductList = () => {
  const { 
    currentProducts, 
    grid_view, 
    totalPages, 
    currentPage, 
    setCurrentPage,
    totalProducts 
  } = useFilterContext();

  if (grid_view === true) {
    return (
      <>
        <GridView products={currentProducts} />
        {totalProducts > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </>
    );
  }

  if (grid_view === false) {
    return (
      <>
        <ListView products={currentProducts} />
        {totalProducts > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </>
    );
  }

  return null;
};

export default ProductList;









  // else (grid_view===false)
  // return <GridView products={filter_products}/>

  // ========================================
  //  New Added GridView
  // if (grid_view === true) {
  //   return <GridView products={filter_products} />
  // }

  // if (grid_view === false) {
  //   return <GridView products={filter_productsList} />
  // }

  // ===========================================

  // if (grid_view === false) {
  //   return <ListView products={filter_productsListView} />;
  // }
