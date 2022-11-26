import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [tareas, setTareas] = useState([]);
  
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/pzeta")
      .then((response) => response.json())
      .then((data) => setTareas(data));
  }, []);

  const agregarTarea=(tarea)=>{
    setTareas([...tareas, tarea]);

  }
  
  return (
    <div className="container">
      <h1> Todo List</h1>
      <ul>
        <li>
          <input
            placeholder="What needs to be done"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                agregarTarea( {label:e.target.value, done:true})
                e.target.value = "";
              }
            }}
          />
        </li>
        {tareas.map((value, index) => {
          return (
            <li key={index}>
              {value.label}
              <i
                className="fas fa-times float-end my-1 mx-1"
                onClick={() =>
                  setTareas(tareas.filter((value, i) => index != i))
                }
              ></i>
            </li>
          );
        })}
        <div className="left"> {tareas.length} Item left </div>
      </ul>
    </div>
  );
};

export default Home;
