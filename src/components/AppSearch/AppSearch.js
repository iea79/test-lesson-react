import React, {Component} from 'react';
import './AppSearch.scss';

export default class AppSearch extends Component {

    state = {
        term: ''
    };

    buttons = [
        {name: 'all', label: 'Все'},
        {name: 'like', label: 'Понравилось'}
    ];

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render() {
        const button = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name;
            const activeClass = active ? 'btn btn_success' : 'btn';
            return (
                <button key={name} onClick={() => this.props.onFilterSelect(name)} className={activeClass}>{label}</button>
            )
        })
        return (
            <div className="container">
                <div className="search">
                    <input
                        className="search__field"
                        type="text"
                        placeholder="Поиск по записям"
                        value={this.state.term}
                        onChange={this.onUpdateSearch}
                    />

                    <div className="search__action">
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}
