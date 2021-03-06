import React from 'react';
import './AppHeader.scss';

const AppHeader = ({allPosts, liked, important}) => {
    return (
        <div className="container">
            <header className="header">
                <div className="user">Current user</div>
                <div className="searchRezult">{allPosts} posts of which I liked {liked}, added to favorites {important}</div>
            </header>
        </div>
    )
}

export default AppHeader;
