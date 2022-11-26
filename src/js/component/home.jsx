import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [tareas, setTareas] = useState([]);

  function Actualizar() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(tareas);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/pzeta",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/pzeta")
      .then((response) => response.json())
      .then((data) => setTareas(data));
  }, []);
useEffect(()=>{
  Actualizar();
}, [tareas]);
  
  return (
    <div className="container">
      <h1> Todo List</h1>
      <ul>
        <li>
          <input
            placeholder="What needs to be done"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setTareas([...tareas, {label: e.target.value, done: false }]);
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
