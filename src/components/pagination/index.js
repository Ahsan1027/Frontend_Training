import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({ style, currentPage, totalPages, onPageChange }) => {
    let items = [];
    const maxVisiblePages = 3;

    const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let number = startPage; number <= endPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => { onPageChange(number); }}>
                {number}
            </Pagination.Item>
        );
    }

    const paginationBasic = (
        <div>
            <Pagination size="sm">

                <Pagination.Item
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Pagination.Item>
                {items}

                <Pagination.Item
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Pagination.Item>
            </Pagination>
        </div>
    );

    return (
        <div style={style}> {paginationBasic}</div>
    );
};

export default Paginations;