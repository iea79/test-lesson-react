import React, {Component} from 'react';
import './Tabs.scss';
import GetData from '../../services/getData';

export default class Tabs extends Component {

    getData = new GetData();

    state = {
        isActive: 1,
        isLoading: true,
        error: false,
        tabs: []
    };

    onTabToggle = (id) => {
        this.setState({
            isActive: id
        })
    }

    setActiveClass = (id, selector) => {
        const active = this.state.isActive === id;
        const activeClass = active ? selector +' active' : selector;

        return activeClass;
    }

    componentDidMount() {
        this.uploadTabsData();
        console.log('Mount');
    }

    uploadTabsData() {
        this.getData.getAllUsers()
            .then(tabs => {
                this.setState({
                    tabs,
                    isLoading: false
                })
            })
            .catch(() => this.showError());
    }

    tabToggle(tabs) {
        return tabs.map(({id, name}) => {
            return (
                <div
                    key={id}
                    className={this.setActiveClass(id, 'tabs__item')}
                    onClick={() => this.onTabToggle(id)}>
                    {name}
                </div>
            )
        })
    }

    tabContent(tabs) {
        return tabs.map(({id, name, username, phone, email, address: {street, city, zipcode, suite}}) => {
            return (
                <div
                    key={id}
                    className={this.setActiveClass(id, 'tabs__pane')}>
                    <b>Name:</b> {name} <br/>
                    <b>Username:</b> {username} <br/>
                    <b>Phone:</b> <a href="tel:">{phone}</a> <br/>
                    <b>Email:</b> <a href="mailto:">{email}</a> <br/>
                    <b>Address:</b> {zipcode}, {city}, {street}, {suite}
                </div>
            )
        })
    }

    showError() {
        this.setState({
            isLoading: false,
            error: true
        })
    }

    render() {
        const {tabs, isLoading, error} = this.state;

        if (error) {
            return <div className="container">Error loading tabs</div>;
        }

        if (isLoading) {
            return <div>Загрузка</div>
        }

        return (
            <div className="container">
                <h2>Autors</h2>
                <div className="tabs">
                    <div className="tabs__top">
                        {this.tabToggle(tabs)}
                    </div>
                    {this.tabContent(tabs)}
                </div>
            </div>
        )
    }
}
