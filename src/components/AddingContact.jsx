import React, { useState } from "react";

const AddContact = ({ onContactAdded }) => {
    const [newContact, setNewContact] = useState({ nombre: "", apellido: "", telefono: "" });

    const handleInputChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://www.raydelto.org/agenda.php", {
            method: "POST",
            body: JSON.stringify(newContact),
        })
            .then((res) => res.text())
            .then(() => {
                alert("Contact added successfully.");
                setNewContact({ nombre: "", apellido: "", telefono: "" });
                onContactAdded(); // Llama a la función para actualizar la tabla
            })
            .catch((error) => console.error("API error: ", error));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a New Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="nombre" type="text" value={newContact.nombre} onChange={handleInputChange} placeholder="Name" required />
                <input name="apellido" type="text" value={newContact.apellido} onChange={handleInputChange} placeholder="Last Name" required />
                <input name="telefono" type="text" value={newContact.telefono} onChange={handleInputChange} placeholder="Phone" required />
                <button type="submit" className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
