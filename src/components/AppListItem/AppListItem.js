import React, { Component } from 'react';
import './AppListItem.scss';
import GetData from '../../services/getData';

export default class AppListItem extends Component {
    getData = new GetData();
    state = {
        userName: '',
        error: false
    }

    componentDidMount() {
        this.getUdserName(this.props.userId);
    }

    getUdserName(id) {
        this.getData.getUser(id)
            .then(user => this.setState({userName: user.name}))
            .catch(() => this.setState({error: true}));
    }

    showTrash(important) {
        if (important) {
            return <i className="fa fa-trash disabled"></i>
        } else {
            return (
                <i className="fa fa-trash"
                    onClick={this.props.onDelete}>
                </i>
            )
        }
    }

    toggleClass(important, like) {
        let importantClass = "posts__item";
        if (important) {
            importantClass += " posts__item_important";
        }
        if (like) {
            importantClass += " posts__item_like";
        }
        return importantClass;
    }

    render() {
        if (this.state.error) {
            return <div className="container">Error loading</div>
        }
        const {title, body, onToggleImportant, onToggleLiked, important, like} = this.props;
        return (
            <div className={this.toggleClass(important, like)}>
                <div className="posts__name">
                    <h4>{title}</h4>
                    {body}
                    <h6>{this.state.userName}</h6>
                </div>
                <div className="posts__action">
                    <i
                        className="fa fa-star"
                        onClick={onToggleImportant}></i>
                    {this.showTrash(important)}
                    <i
                        className="fa fa-heart"
                        onClick={onToggleLiked}></i>
                </div>
            </div>
        );
    }
}
