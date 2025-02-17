'use client';

import React, {Component} from "react";
import {User} from "@/users/api";
import {RootStore} from "@/store/root";
import Link from "next/link";
import {withStore} from "@/store/withStore";

type Props = {
    store: RootStore;
    initialUsers: User[];
}

// eslint-disable-next-line
class Users extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render () {
        const { store } = this.props;
        const users = store.users.users

        return (
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-gray-500">@{user.username}</p>
                                <p className="text-gray-700 mt-2">📧 {user.email}</p>
                                <p className="text-gray-700">📞 {user.phone}</p>
                                <p className="text-gray-700">🌐 <a href={`https://${user.website}`} target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  className="text-blue-600 hover:underline">{user.website}</a>
                                </p>
                                <div className="mt-3 text-sm text-gray-600">
                                    <p className="font-semibold">Company:</p>
                                    <p>{user.company.name}</p>
                                    <p className="italic">{user.company.catchPhrase}</p>
                                </div>
                                <div className="mt-4 text-center">
                                    <Link
                                        href={`/todos?userId=${user.id}`}
                                        className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        View Todos
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        );
    }
}

export const UsersList = withStore(Users, (store, props) => {
    const {initialUsers} = props
    store.users.init(initialUsers)
})