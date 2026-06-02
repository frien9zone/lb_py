package com.example.lb3_py_andr

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private var profileName = ""
    private val friends = mutableListOf<String>()
    private val posts = mutableListOf<String>()
    private val comments = mutableListOf<String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val profileNameInput = findViewById<EditText>(R.id.profileNameInput)
        val createProfileButton = findViewById<Button>(R.id.createProfileButton)
        val profileText = findViewById<TextView>(R.id.profileText)

        val addOlegButton = findViewById<Button>(R.id.addOlegButton)
        val addMariaButton = findViewById<Button>(R.id.addMariaButton)
        val friendsText = findViewById<TextView>(R.id.friendsText)

        val postInput = findViewById<EditText>(R.id.postInput)
        val createPostButton = findViewById<Button>(R.id.createPostButton)

        val commentInput = findViewById<EditText>(R.id.commentInput)
        val addCommentButton = findViewById<Button>(R.id.addCommentButton)
        val postsText = findViewById<TextView>(R.id.postsText)

        createProfileButton.setOnClickListener {
            profileName = profileNameInput.text.toString()

            if (profileName.isNotEmpty()) {
                profileText.text = "Мій профіль: $profileName"
            } else {
                profileText.text = "Введіть ім'я профілю"
            }
        }

        addOlegButton.setOnClickListener {
            if (!friends.contains("Олег")) {
                friends.add("Олег")
            }
            friendsText.text = "Друзі: ${friends.joinToString(", ")}"
        }

        addMariaButton.setOnClickListener {
            if (!friends.contains("Марія")) {
                friends.add("Марія")
            }
            friendsText.text = "Друзі: ${friends.joinToString(", ")}"
        }

        createPostButton.setOnClickListener {
            val post = postInput.text.toString()

            if (post.isNotEmpty()) {
                posts.add(post)
                postInput.text.clear()
                updatePosts(postsText)
            }
        }

        addCommentButton.setOnClickListener {
            val comment = commentInput.text.toString()

            if (comment.isNotEmpty() && posts.isNotEmpty()) {
                comments.add(comment)
                commentInput.text.clear()
                updatePosts(postsText)
            }
        }
    }

    private fun updatePosts(postsText: TextView) {
        var result = ""

        posts.forEachIndexed { index, post ->
            result += "Пост ${index + 1}: $post\n"

            if (comments.isNotEmpty()) {
                result += "Коментарі:\n"
                comments.forEach {
                    result += "- $it\n"
                }
            }

            result += "\n"
        }

        postsText.text = result
    }
}