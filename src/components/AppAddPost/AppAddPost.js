import React, {Component} from 'react';
import './AppAddPost.scss';

export default class AppAddPost extends Component {

    state = {
        title: '',
        post: ''
    };

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    onValueChange = (e) => {
        this.setState({
            post: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.post && this.state.title) {
            this.props.onAdd(this.state.post, this.state.title);
            this.setState({
                title: '',
                post: ''
            });
        }

    }

    render() {
        return (
            <form className="container"
                onSubmit={this.onSubmit}>
                <div className="addPost">
                    <input
                        type="text"
                        placeholder="Enter title"
                        className="addPost__field"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        required/>
                    <input
                        type="text"
                        placeholder="Enter text"
                        className="addPost__field"
                        value={this.state.post}
                        onChange={this.onValueChange}
                        required/>
                    <button
                        type="submit"
                        className="btn addPost__btn" >
                        Add new
                    </button>
                </div>
            </form>
        );
    }
}
