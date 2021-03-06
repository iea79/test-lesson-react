// import React, {Component} from 'react';

export default class GetData {

    _resours = 'https://jsonplaceholder.typicode.com';

    async getResours(url) {
        const res = await fetch(this._resours + url);

        if (!res.ok) {
            throw new Error(`Error loaded ${url}`);
        }

        return await res.json();
    }

    async getAllUsers() {
        const users = await this.getResours('/users');
        // console.log(users);
        return users;
    }

    async getAllPosts() {
        const posts = await this.getResours('/posts/');
        // console.log(posts);
        return await posts.filter((post, i) => post.id < 15);
    }

    async getUser(id) {
        const user = await this.getResours(`/users`);
        // console.log(user[id]);
        return user[id];
    }

}
