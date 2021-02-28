import React, {Component} from 'react';
import './Tabs.scss';

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 1,
            tabs: [
                {id: 1, name: 'Tab 1', content: '<b>1</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
                {id: 2, name: 'Tab 2', content: '<img class="float" src="./logo192.png" alt=""/> <b>2</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
                {id: 3, name: 'Tab 3', content: '<b>3</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            ]
        };

        this.onTabToggle = this.onTabToggle.bind(this);
        this.setActiveClass = this.setActiveClass.bind(this);
    }

    onTabToggle(id) {
        this.setState({
            isActive: id
        })
    }

    setActiveClass(id, selector) {
        const active = this.state.isActive === id;
        const activeClass = active ? selector +' active' : selector;

        return activeClass;
    }

    render() {
        const {tabs} = this.state;

        const tabToggle = tabs.map(({id, name}) => {
            return (
                <div
                    key={id}
                    className={this.setActiveClass(id, 'tabs__item')}
                    onClick={() => this.onTabToggle(id)}>
                    {name}
                </div>
            )
        })
        const tabContent = tabs.map(({id, content}) => {
            return (
                <div
                    key={id}
                    className={this.setActiveClass(id, 'tabs__pane')}
                    dangerouslySetInnerHTML={{__html: content}}>
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
