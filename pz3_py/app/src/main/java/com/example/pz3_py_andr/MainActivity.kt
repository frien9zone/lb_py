package com.example.pz3_py_andr

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kotlin.random.Random

class MainActivity : AppCompatActivity() {

    private var randomNumber = Random.nextInt(1, 101)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Різниця чисел

        val number1 = findViewById<EditText>(R.id.number1)
        val number2 = findViewById<EditText>(R.id.number2)
        val subtractButton = findViewById<Button>(R.id.subtractButton)
        val resultText = findViewById<TextView>(R.id.resultText)

        subtractButton.setOnClickListener {

            val num1 = number1.text.toString().toDoubleOrNull()
            val num2 = number2.text.toString().toDoubleOrNull()

            if (num1 != null && num2 != null) {

                val result = num1 - num2

                resultText.text = "Різниця: $result"

            } else {

                resultText.text = "Введіть правильні числа"
            }
        }


        // Гра Вгадай число

        val guessInput = findViewById<EditText>(R.id.guessInput)
        val checkButton = findViewById<Button>(R.id.checkButton)
        val gameResult = findViewById<TextView>(R.id.gameResult)

        checkButton.setOnClickListener {

            val guess = guessInput.text.toString().toIntOrNull()

            if (guess == null) {

                gameResult.text = "Введіть число"

            } else {

                when {

                    guess < randomNumber -> {
                        gameResult.text = "Загадане число більше"
                    }

                    guess > randomNumber -> {
                        gameResult.text = "Загадане число менше"
                    }

                    else -> {

                        gameResult.text = "Вітаємо! Ви вгадали число!"

                        randomNumber = Random.nextInt(1, 101)
                    }
                }
            }
        }
    }
}