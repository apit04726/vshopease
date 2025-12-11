import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  const { totalProducts, grid_view, setGridView, setListView, sorting } =
    useFilterContext();
  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}
      <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}>
          < BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : " sort-btn"}
          onClick={setListView}>
          <BsList className="icon" />
        </button>

      </div>
      {/* 2nd column  */}
      <div className="product-data">
        <p>{`${totalProducts || 0} Product${totalProducts !== 1 ? 's' : ''} Available`}</p>
      </div>

      {/* 3rd column  */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={sorting}>
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.7rem 1.2rem;
    cursor: pointer;
    border-radius: 12px;
    border: 1.5px solid rgb(98 84 243 / 50%);
    background: #f8f9fa;
    font-size: 14px;
    color: #222;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    min-width: 160px;
    margin-left: 1rem;
  }
  .sort-selection .sort-selection--style:focus {
    border-color: rgb(98 84 243 / 50%);
    box-shadow: 0 0 0 2px #007bff33;
  }
  .sort-selection .sort-selection--style option {
    padding: 0.7rem 1rem;
    font-size: 1rem;
    background: #fff;
    color: #222;
  }
  @media (max-width: 600px) {
    .sort-selection .sort-selection--style {
      min-width: 120px;
      font-size: 1rem;
      padding: 0.5rem 0.7rem;
      margin-left: 0.5rem;
    }
  }
`;

export default Sort;
