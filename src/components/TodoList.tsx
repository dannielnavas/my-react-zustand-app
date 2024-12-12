import React, { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

const emojiMap: { [key: string]: string } = {
  eat: "🍔",
  sleep: "💤",
  code: "💻",
  repeat: "🔁",
};

const TodoList: React.FC = () => {
  const [todoText, setTodoText] = useState("");
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const handleAddTodo = () => {
    const mappedText = emojiMap[todoText.toLowerCase()] || todoText;
    if (mappedText.trim()) {
      addTodo(mappedText);
      setTodoText("");
    }
  };

  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      <em>Made with zustand</em>
      <h1>Emoji todo List</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add new todo"
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handleRemoveTodo(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TodoList };
