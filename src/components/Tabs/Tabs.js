import React, {Component} from 'react';
import './Tabs.scss';

export default class Tabs extends Component {

    state = {
        isActive: 1,
        isLoading: true,
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
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then(response => response.json())
            .then(tabs => this.setState({
                tabs,
                isLoading: false
            }))
            .catch(err => console.log(err))
    }

    render() {
        const {tabs, isLoading} = this.state;

        if (isLoading) {
            return <div>Загрузка</div>
        }

        const tabToggle = tabs.map(({id, username}) => {
            return (
                <div
                    key={id}
                    className={this.setActiveClass(id, 'tabs__item')}
                    onClick={() => this.onTabToggle(id)}>
                    {username}
                </div>
            )
        })

        const tabContent = tabs.map(({id, name, phone, email, address: {street, city, zipcode}}) => {
            return (
                <div
                    key={id}
                    className={this.setActiveClass(id, 'tabs__pane')}>
                    <b>Name:</b> {name} <br/>
                    <b>Phone:</b> <a href="tel:">{phone}</a> <br/>
                    <b>Email:</b> <a href="mailto:">{email}</a> <br/>
                    <b>City:</b> {city} <br/>
                    <b>Zip:</b> {zipcode} <br/>
                    <b>Street:</b> {street} <br/>
                </div>
            )
        })
        
        return (
            <div className="container">
                <div className="tabs">
                    <div className="tabs__top">
                        {tabToggle}
                    </div>
                    {tabContent}
                </div>
            </div>
        )
    }
}
