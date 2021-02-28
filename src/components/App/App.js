import React, {Component} from 'react';
import  './App.scss';

import AppHeader from '../AppHeader';
import AppSearch from '../AppSearch';
import AppList from '../AppList';
import AppAddPost from '../AppAddPost';
import Tabs from '../Tabs';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', important: true, like: false, id: '1212'},
                {label: 'Thats is so good', important: false, like: false, id: '1217'},
                {label: 'I need a break...', important: false, like: false, id: '1204'}
            ],
            term: '',
            filter: 'all'
        };
        this.newId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.setProp = this.setProp.bind(this);
        this.searchPosts = this.searchPosts.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilteredItem = this.onFilteredItem.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {

        const newEl = {
            label: body,
            important: false,
            id: this.newId++
        }
        console.log(newEl);

        this.setState(({data}) => {
            const updArr = [...data, newEl];

            console.log(updArr);

            return {
                data: updArr
            }
        })
    }

    onToggleImportant(id) {
        this.setProp(this.state.data, id, 'important');
    }

    onToggleLiked(id) {
        this.setProp(this.state.data, id, 'like');
    }

    setProp(data, id, prop) {
        this.setState(({data}) => {
            const newArr = [...data];
            const index = newArr.findIndex(elem => elem.id === id);
            newArr[index][prop] = !newArr[index][prop];

            return {
                data: newArr
            }
        })
    }

    searchPosts(items, prop) {
        if (prop.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(prop) > -1
        })
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilteredItem(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const allPosts = data.length;
        const liked = data.filter(item => item.like).length;
        const important = data.filter(item => item.important).length;
        const visiblePosts = this.onFilteredItem(this.searchPosts(data, term), filter);
        return (
            <>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                    important={important} />
                <AppSearch
                    onUpdateSearch={this.onUpdateSearch}
                    onShowLike={this.onShowLike}
                    filter={filter}
                    onFilterSelect={this.onFilterSelect} />
                <AppList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked} />
                <AppAddPost
                    onAdd={this.addItem} />
                <Tabs/>
            </>
        )
    }
}
