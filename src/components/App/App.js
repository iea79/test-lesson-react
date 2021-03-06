import React, {Component} from 'react';
import  './App.scss';

import AppHeader from '../AppHeader';
import AppSearch from '../AppSearch';
import AppList from '../AppList';
import AppAddPost from '../AppAddPost';
import Tabs from '../Tabs';

import GetData from '../../services/getData';

export default class App extends Component {

    state = {
        data: [],
        term: '',
        filter: 'all',
        error: false,
        newId: 100
    }

    getData = new GetData();

    dataOffset = 30;

    componentDidMount() {
        this.getAllPosts();
    }

    getAllPosts() {
        this.getData.getAllPosts()
            .then(data => this.setState({data}))
            .catch(() => this.setState({error: true}));

        this.getData.getUser(7);
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

    addItem = (body, title) => {
        let id = this.state.newId;
        const newEl = {
            userId: 8,
            id: ++id,
            title: title,
            body: body
        }
        console.log(newEl);

        this.setState(({data}) => {
            const updArr = [...data, newEl];

            console.log(updArr);

            return {
                data: updArr,
                newId: id
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
            return item.title.indexOf(prop) > -1
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
        const {data, term, filter, error} = this.state;

        if (error) {
            return <div className="container">Error loading service</div>
        }
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
