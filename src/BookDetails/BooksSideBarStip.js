import React from 'react';
//import BooksSidebarBook from './BooksSidebarBook';
import BookSideBar from './BookSideBar';

const BooksSideBarStip = ({ title, books }) => {
    return (
        <>
            <div className="ms-0 mt-0">
                <div className="h3 ms-5">{title}</div>
                <div className="d-flex flex-column">
                    {
                        books.map(books => (
                            <BookSideBar books={books} />
                        ))
                    }
                </div>
            </div>
            <hr className="mt-5" />
        </>
    );
}

export default BooksSideBarStip;