import React from 'react';
import './AppHeader.scss';

const AppHeader = ({allPosts, liked, important}) => {
    return (
        <div className="container">
            <header className="header">
                <div className="user">Евгений Иванов</div>
                <div className="searchRezult">{allPosts} записей, из них понравилось {liked}, добавлено в избранное {important}</div>
            </header>
        </div>
    )
}

export default AppHeader;
