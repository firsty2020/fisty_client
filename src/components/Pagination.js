import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { range } from '../helpers/utils';

const Pagination = ({ data, uid, action }) => {

    const itemsPerPage = 10;

    if (!data || !data.count || data.count <= itemsPerPage) return null;

    const url = (data.next || data.previous);
    const pageCount = Math.ceil(data.count / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        if (!url || pageNumber == currentPage()) return;
        const params = getParams(url);
        const newParams = generateNewParams(params, pageNumber);
        action(newParams, uid);
    };

    const generatePagination = (pageCount) => {
        const pageItemsCount = 3;
        let lastInLeft = pageItemsCount * Math.ceil(currentPage() / pageItemsCount);
        let firstItem = lastInLeft - pageItemsCount + 1;
        lastInLeft = lastInLeft > pageCount ? pageCount : lastInLeft;
        firstItem = firstItem < 1 ? 1 : firstItem;
        const leftRange = range(firstItem, lastInLeft);

        return [
            ...leftRange,
            ...shouldShowDivider(pageItemsCount, lastInLeft),
            ...shouldShowLastPage(lastInLeft) ]
            .map((pageNumber) => (
                <BootstrapPagination.Item
                    disabled={isNaN(Number(pageNumber))}
                    active={currentPage() === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    key={pageNumber}>{pageNumber}
                </BootstrapPagination.Item>
            ));
    };

    const shouldShowLastPage = (lastInLeft) => {
        if (pageCount !== lastInLeft ) {
            return [ pageCount ];
        }
        return [];
    };

    const shouldShowDivider = (pageItemsCount, lastInLeft) => {
        if ((pageCount > pageItemsCount)
            && shouldShowLastPage(lastInLeft).length
            && pageCount - lastInLeft !== 1)
        {
            return ['...'];
        }
        return [];
    };

    const shouldShowFirsLastKeys = () => {
      const breakpoint = 5;
      return pageCount > breakpoint;
    };

    const getParams = (url) => {
        const paramsString = url.slice(url.indexOf('?') + 1);
        return new URLSearchParams(paramsString);
    };

    const currentPage = () => {
        if (data.next) {
            return Number(getParams(data.next).get('page')) - 1;
        } else if (!getParams(data.previous).has('page')) {
            // if the previous page is the first, page param is not appended by server.
            // so if next not exists, previous is 1 you're obviously on the 2nd page.
            return  2;
        }
        return Number(getParams(data.previous).get('page')) + 1;
    };

    const generateNewParams = (params, pageNumber) => {
        params.set('page', pageNumber);
        const newParams = {};
        for (const [key, value] of params.entries()) {
            newParams[key] = value;
        }
        return newParams;
    };


    return (
        <div className="pagination-container">
            <BootstrapPagination>
                {shouldShowFirsLastKeys() ? (
                    <BootstrapPagination.First
                        disabled={!data.previous}
                        onClick={() => handlePageChange(1)}
                    />
                ) : null}
                <BootstrapPagination.Prev
                    onClick={() => handlePageChange(currentPage() - 1)}
                    disabled={!data.previous}/>
                {generatePagination(pageCount)}
                <BootstrapPagination.Next
                    onClick={() => handlePageChange(currentPage() + 1)}
                    disabled={!data.next}/>
                {shouldShowFirsLastKeys() ? (
                    <BootstrapPagination.Last
                        disabled={!data.next}
                        onClick={() => handlePageChange(pageCount)}/>
                ) : null}

            </BootstrapPagination>
        </div>
    );
};

export default Pagination;
