import React from 'react';
import './AppList.scss';

import AppListItem from '../AppListItem';

const AppList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map((item) => {
        const {id, ...otherProps} = item;
        return (
            <AppListItem
                key={id}
                {...otherProps}
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleLiked={() => onToggleLiked(id)} />
        )
    })

    return (
        <div className="container">
            <div className="posts">
                {elements}
            </div>
        </div>
    )
}

export default AppList;
