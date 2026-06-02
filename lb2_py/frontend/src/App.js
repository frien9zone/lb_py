import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const [newPostText, setNewPostText] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(1);

    const [commentText, setCommentText] = useState("");
    const [commentAuthor, setCommentAuthor] = useState("");

    const [userId, setUserId] = useState(1);
    const [friendId, setFriendId] = useState(2);

    const loadData = () => {
        axios.get("http://localhost:5000/users")
            .then(response => setUsers(response.data));

        axios.get("http://localhost:5000/posts")
            .then(response => setPosts(response.data));
    };

    useEffect(() => {
        loadData();
    }, []);

    const createPost = () => {
        if (newPostText.trim() === "") {
            alert("Введіть текст поста");
            return;
        }

        axios.post("http://localhost:5000/posts", {
            userId: selectedUserId,
            text: newPostText
        }).then(() => {
            setNewPostText("");
            loadData();
        });
    };

    const addComment = (postId) => {
        if (commentAuthor.trim() === "" || commentText.trim() === "") {
            alert("Заповніть автора і текст коментаря");
            return;
        }

        axios.post(`http://localhost:5000/posts/${postId}/comments`, {
            author: commentAuthor,
            text: commentText
        }).then(() => {
            setCommentAuthor("");
            setCommentText("");
            loadData();
        });
    };

    const addFriend = () => {
        axios.post("http://localhost:5000/friends", {
            userId,
            friendId
        }).then(() => {
            loadData();
            alert("Дружній зв'язок створено");
        });
    };

    return (
        <div className="App">
            <h1>Базова соціальна мережа</h1>

            <section>
                <h2>Користувачі</h2>

                {users.map(user => (
                    <div className="card" key={user.id}>
                        <h3>{user.name}</h3>
                        <p>
                            Друзі: {
                                user.friends.length > 0
                                    ? user.friends.join(", ")
                                    : "немає"
                            }
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Створити пост</h2>

                <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                >
                    {users.map(user => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <br />

                <textarea
                    placeholder="Текст нового поста"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                />

                <br />

                <button onClick={createPost}>
                    Додати пост
                </button>
            </section>

            <section>
                <h2>Пости</h2>

                {posts.map(post => (
                    <div className="card" key={post.id}>
                        <h3>{post.userName}</h3>
                        <p>{post.text}</p>

                        <h4>Коментарі:</h4>

                        {post.comments.length === 0 && (
                            <p>Коментарів поки немає</p>
                        )}

                        {post.comments.map((comment, index) => (
                            <p key={index}>
                                <b>{comment.author}:</b> {comment.text}
                            </p>
                        ))}

                        <input
                            placeholder="Автор коментаря"
                            value={commentAuthor}
                            onChange={(e) => setCommentAuthor(e.target.value)}
                        />

                        <input
                            placeholder="Текст коментаря"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />

                        <button onClick={() => addComment(post.id)}>
                            Додати коментар
                        </button>
                    </div>
                ))}
            </section>

            <section>
                <h2>Додати друга</h2>

                <select
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                >
                    {users.map(user => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <select
                    value={friendId}
                    onChange={(e) => setFriendId(Number(e.target.value))}
                >
                    {users.map(user => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <button onClick={addFriend}>
                    Створити дружній зв'язок
                </button>
            </section>
        </div>
    );
}

export default App;