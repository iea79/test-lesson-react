import React, {Component} from 'react';
import './AppAddPost.scss';

export default class AppAddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: ''
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            post: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.post);
        this.setState({
            post: ''
        })
    }

    render() {
        return (
            <form className="container"
                onSubmit={this.onSubmit}>
                <div className="addPost">
                    <input
                        type="text"
                        placeholder="О чем вы думаете сейчас?"
                        className="addPost__field"
                        value={this.state.post}
                        onChange={this.onValueChange}/>
                    <button
                        type="submit"
                        className="btn addPost__btn" >
                        Добавить
                    </button>
                </div>
            </form>
        )
    }
}
