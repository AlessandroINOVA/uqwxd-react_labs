import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos && Object.keys(loadedTodos).length !== 0) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");
    
    } else {
        
        alert("Enter Valid Task");
        setTodo("");
    }
  }
  
  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  // Add the submitEdits code here
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id && editingText !== '') {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
      setEditingText("");
  }
  
return(
<div className ="App">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
<input type ="text" onChange={(e) => setTodo(e.target.value)} 
placeholder="Add a new task"
value={todo}
align ="right" />
<button type ="submit">Add Todo</button>
</form>
{todos.map((todo) => 
<div className="todo" key={todo.id}>
    <div style={{margin: "20px"}}>
        <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}>
        </input>
        {todo.id === todoEditing ? (
        <input type="text" placeholder={todo.text} defaultValue={todo.text} onChange={(e) => setEditingText(e.target.value)} />
        ) : (
        <span>{todo.text}</span>
        )}
    </div>
    <div className="todo-actions">
        {todo.id === todoEditing ? (
        <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
        ) : (
        <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
</div>)}
</div>
);
};
export default App;
