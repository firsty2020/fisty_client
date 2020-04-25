import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ data, action }) => {

    const itemsPerPage = 10;

    if (!data || !data.count || data.count <= itemsPerPage) return null;

    const url = (data.next || data.previous);
    const pageCount = Math.ceil(data.count / itemsPerPage);


    const generatePageItems = (pageCount) => {
        const items = [];
        for (let i = 1; i <= pageCount; i++) {
            items.push(
                <BootstrapPagination.Item
                    active={currentPage() === i}
                    onClick={() => changePage.call(null, i)}
                    key={i}>{i}
                </BootstrapPagination.Item>
            );
        }
        return items;
    };

    const changePage = (pageNumber) => {
        if (!url || pageNumber == currentPage()) return;
        const params = getParams(url);
        const newParams = generateNewParams(params, pageNumber);
        action(newParams);
    };

    const getParams = (url) => {
        const paramsString = url.slice(url.indexOf('?') + 1);
        return new URLSearchParams(paramsString);
    };

    const currentPage = () => {
        if (data.next) {
            return    Number(getParams(data.next).get('page')) - 1;
        } else if (!getParams(data.previous).has('page')) {
            // if the previous page is one, page params is not prepended by backend
            // so if next if null, previous is 1 you're on the 2nd page
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
           <BootstrapPagination >
               <BootstrapPagination.First
                   disabled={!data.previous}
                   onClick={() => changePage(1)}
               />
               <BootstrapPagination.Prev
                   onClick={() => changePage(currentPage() - 1)}
                   disabled={!data.previous}/>
               {generatePageItems(pageCount)}
               <BootstrapPagination.Next
                   onClick={() => changePage(currentPage() + 1)}
                   disabled={!data.next}/>
               <BootstrapPagination.Last
                   disabled={!data.next}
                   onClick={() => changePage(pageCount)}/>
           </BootstrapPagination>
       </div>
    );
};

export default Pagination;
