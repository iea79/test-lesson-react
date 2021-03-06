import React, {Component} from 'react';
import  './App.scss';

import AppHeader from '../AppHeader';
import AppSearch from '../AppSearch';
import AppList from '../AppList';
import AppAddPost from '../AppAddPost';
import Tabs from '../Tabs';

export default class App extends Component {

    state = {
        data: [],
        term: '',
        filter: 'all',
    }

    newId = this.state.data.length;
    dataOffset = 10;

    componentDidMount() {
        this.getAllPosts();
    }

    getAllPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response => response.json())
            .then(data => this.setState({data}))
            .catch(err => {console.log(err)})

    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem = (body) => {

        const newEl = {
            title: 'New post',
            body: body,
            important: false,
            id: ++this.newId
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

    onToggleImportant = (id) => {
        this.setProp(this.state.data, id, 'important');
    }

    onToggleLiked = (id) => {
        this.setProp(this.state.data, id, 'like');
    }

    setProp = (data, id, prop) => {
        this.setState(({data}) => {
            const newArr = [...data];
            const index = newArr.findIndex(elem => elem.id === id);
            newArr[index][prop] = !newArr[index][prop];

            return {
                data: newArr
            }
        })
    }

    searchPosts = (items, prop) => {
        if (prop.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.body.indexOf(prop) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilteredItem = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like).slice(0, this.dataOffset);
        } else {
            return items.slice(0, this.dataOffset);
        }
    }

    onFilterSelect = (filter) => {
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
