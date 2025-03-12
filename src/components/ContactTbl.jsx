import React, { useEffect, useState } from "react";
import AddContact from "./AddingContact";

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const contactsPerPage = 5;
    const visiblePages = 5; 

    const fetchContacts = () => {
        fetch("http://www.raydelto.org/agenda.php")
            .then((res) => res.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error("Error fetching contacts: ", error));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const totalPages = Math.ceil(contacts.length / contactsPerPage);
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">

            <h1 className="text-3xl font-bold text-blue-700 mb-2">Welcome to People Explorer</h1>
            <p className="text-lg text-gray-600 mb-6">Here you can find and add anyone!</p>


            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Last Name</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentContacts.map((contact, index) => (
                            <tr key={index} className="text-center border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2">{contact.nombre}</td>
                                <td className="border border-gray-300 px-4 py-2">{contact.apellido}</td>
                                <td className="border border-gray-300 px-4 py-2">{contact.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 space-x-1">

                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        >
                            « First
                        </button>

                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        >
                            Prev
                        </button>

                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border rounded-lg ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        >
                            Next
                        </button>

                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        >
                            Last »
                        </button>
                    </div>
                )}
            </div>

            <button
                onClick={() => setShowForm(!showForm)}
                className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
            >
                {showForm ? "Hide Form" : "Add Contact"}
            </button>

            {showForm && (
                <div className="mt-4 w-full max-w-lg">
                    <AddContact onContactAdded={fetchContacts} />
                </div>
            )}
        </div>
    );
};

export default ContactTable;
