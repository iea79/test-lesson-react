import React, { Component } from 'react';
import './AppListItem.scss';

export default class AppListItem extends Component {
    render() {
        const {label, onDelete, onToggleImportant, onToggleLiked, important, like} = this.props;
        let importantClass = "posts__item";
        if (important) {
            importantClass += " posts__item_important"
        }
        if (like) {
            importantClass += " posts__item_like"
        }
        return (
            <div className={importantClass}>
                <div className="posts__name">{label}</div>
                <div className="posts__action">
                    <i
                        className="fa fa-star"
                        onClick={onToggleImportant}
                    >
                    </i>
                    <i className="fa fa-trash"
                        onClick={onDelete}>
                    </i>
                    <i
                        className="fa fa-heart"
                        onClick={onToggleLiked}></i>
                </div>
            </div>
        )
    }
}
