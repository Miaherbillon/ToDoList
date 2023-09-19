import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState("");
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      setList(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      await axios.post("http://localhost:3000/create", {
        name: newTask,
        list: newTask,
      });
      fetchData();
      setNewTask("");
    }
  };

  const handleEditTask = async () => {
    if (editTask.trim() !== "") {
      await axios.put(`http://localhost:3000/update/${editingTaskId}`, {
        name: editTask,
        list: editTask,
      });
      fetchData();
      setEditTask("");
      setEditingTaskId("");
    }
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3000/delete/${taskId}`);
    fetchData();
  };

  const handleToggleCheckbox = (taskId) => {
    setCheckedTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <section>
      <div className="Ajout">
        <h1>To do list</h1>
        <h2>Ajouter une tâche :</h2>
        <input
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Ajouter</button>
      </div>

      <ul>
        {list.map((item) => (
          <div key={item._id}>
            {editingTaskId === item._id ? (
              <div>
                <input
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <input
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={handleEditTask}>Valider</button>
              </div>
            ) : (
              <div className="list">
                <li>{item.list}</li>
                <div>
                  <input
                    type="checkbox"
                    checked={checkedTasks[item._id] || false}
                    onChange={() => handleToggleCheckbox(item._id)}
                  />
                  <button onClick={() => setEditingTaskId(item._id)}>
                    Modifier
                  </button>
                  <button onClick={() => handleDeleteTask(item._id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </ul>
    </section>
  );
}

export default App;
