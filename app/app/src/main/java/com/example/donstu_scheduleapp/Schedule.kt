package com.example.donstu_scheduleapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView

class Schedule : AppCompatActivity() {
    private lateinit var lessonView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_schedule)

        lessonView = findViewById(R.id.lesson)

        lessonView.setText("Python:")
    }


}