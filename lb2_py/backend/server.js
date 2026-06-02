const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
    { id: 1, name: "Олег", friends: [2] },
    { id: 2, name: "Марія", friends: [1, 3] },
    { id: 3, name: "Іван", friends: [2] }
];

let posts = [
    {
        id: 1,
        userId: 1,
        text: "Мій перший пост у соціальній мережі",
        comments: []
    },
    {
        id: 2,
        userId: 2,
        text: "Сьогодні вивчаю Node.js та Express",
        comments: []
    }
];


// Отримати всіх користувачів
app.get("/users", (req, res) => {
    res.json(users);
});


// Отримати всі пости
app.get("/posts", (req, res) => {

    const result = posts.map(post => {

        const user = users.find(u => u.id === post.userId);

        return {
            ...post,
            userName: user ? user.name : "Невідомий"
        };
    });

    res.json(result);
});


// Створити новий пост
app.post("/posts", (req, res) => {

    const { userId, text } = req.body;

    const newPost = {
        id: posts.length + 1,
        userId: Number(userId),
        text,
        comments: []
    };

    posts.push(newPost);

    res.json(newPost);
});


// Додати коментар
app.post("/posts/:id/comments", (req, res) => {

    const postId = Number(req.params.id);

    const { author, text } = req.body;

    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({
            message: "Пост не знайдено"
        });
    }

    post.comments.push({
        author,
        text
    });

    res.json(post);
});


// Додати друга
app.post("/friends", (req, res) => {

    const { userId, friendId } = req.body;

    const user = users.find(u => u.id === Number(userId));

    const friend = users.find(u => u.id === Number(friendId));

    if (!user || !friend) {

        return res.status(404).json({
            message: "Користувача не знайдено"
        });
    }

    if (!user.friends.includes(friend.id)) {
        user.friends.push(friend.id);
    }

    if (!friend.friends.includes(user.id)) {
        friend.friends.push(user.id);
    }

    res.json({
        message: "Дружній зв'язок створено"
    });
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});