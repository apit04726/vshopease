import React from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      scrollToTop();
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination logic
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, and last page
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1);
        pages.push("ellipsis");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Wrapper>
      <div className="pagination-container">
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>

        <div className="page-numbers">
          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span key={`ellipsis-${index}`} className="ellipsis">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                className={`page-number ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : null}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 2rem;

  .pagination-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.6rem;

    &:hover:not(.disabled) {
      background-color: ${({ theme }) => theme.colors.btn};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.btn};
      transform: translateY(-0.2rem);
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-number {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 4rem;
    height: 4rem;
    padding: 0 1rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.6rem;
    font-weight: 500;

    &:hover {
      background-color: ${({ theme }) => theme.colors.btn};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.btn};
      transform: translateY(-0.2rem);
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.btn};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.btn};
      font-weight: 700;
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    }
  }

  .ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
    font-weight: 600;
  }

  .page-info {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 3rem 0;

    .pagination-btn,
    .page-number {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.4rem;
    }

    .ellipsis {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.4rem;
    }

    .page-info {
      font-size: 1.2rem;
    }
  }
`;

export default Pagination;


