import React, { useState, useEffect } from "react";
import "./App.css";

import { FaTrash } from "react-icons/fa";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nat, setNat] = useState("uzbek");
  const [desc, setDesc] = useState("");
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [error, setError] = useState("");

  function handleChangeName(event) {
    setUsername(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeNat(event) {
    setNat(event.target.value);
  }

  function handleChangeDesc(event) {
    setDesc(event.target.value);
  }

  function handleSave(event) {
    event.preventDefault();

    if (!username || !email || !desc) {
      setError("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Iltimos, to‘g‘ri email manzilini kiriting.");
      return;
    }

    setError("");

    const newUser = { username, email, nat, desc };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsername("");
    setEmail("");
    setNat("uzbek");
    setDesc("");

    setTimeout(() => {
      const cardElements = document.querySelectorAll(".card");
      cardElements[cardElements.length - 1].classList.add("show");
    }, 0);
  }

  function handleDelete(index) {
    const cardElement = document.querySelectorAll(".card")[index];
    cardElement.classList.add("fade-out");

    setTimeout(() => {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }, 5000);
  }

  return (
    <div className="div">
      <form className="form">
        <li className="list">
          <label htmlFor="ism">Ism:</label>
          <input
            id="ism"
            onChange={handleChangeName}
            value={username}
            type="text"
            placeholder="Enter name..."
          />
        </li>

        <li className="list">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            onChange={handleChangeEmail}
            value={email}
            type="email"
            placeholder="Email..."
          />
        </li>

        <li className="list">
          <label htmlFor="millat">Millat:</label>
          <select id="millat" onChange={handleChangeNat} value={nat}>
            <option value="uzbek">uzbek</option>
            <option value="russian">russian</option>
            <option value="english">english</option>
          </select>
        </li>

        <li className="list">
          <label htmlFor="tavsif">Desc</label>
          <textarea
            id="tavsif"
            onChange={handleChangeDesc}
            value={desc}
            placeholder="Enter description..."
          ></textarea>
        </li>
        <button onClick={handleSave}>Save</button>
      </form>
      {error && <div className="error">{error}</div>}
      <h3>UserList:</h3>
      <div className="cards-container">
        {users.map((user, index) => (
          <div className="card show" key={index}>
            <h4>Ism: {user.username}</h4>
            <p>Email: {user.email}</p>
            <p>Millat: {user.nat}</p>
            <p>Tavsif: {user.desc}</p>
            <button className="btn-delete" onClick={() => handleDelete(index)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
