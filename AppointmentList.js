import React, { useState, useEffect } from 'react';

// Assuming updateAppointment is passed as a prop
const AppointmentList = ({ updateAppointment }) => {
    const [appointments, setAppointments] = useState([]); // Local state to manage appointments
    const [editingIndex, setEditingIndex] = useState(null); // Tracks the index of the appointment being edited

    // Handle saving the updated note to the database and update the state
    const handleSave = async (index) => {
        const appointmentToSave = appointments[index];
        const updatedNotes = appointmentToSave.Notes || ''; // Get the updated notes from the state

        try {
            // Call the function to update the database through an API
            await saveAppointmentToDB(appointmentToSave.id, updatedNotes);

            // Update the state with the new notes
            setAppointments((prevAppointments) => {
                const updatedAppointments = [...prevAppointments];
                updatedAppointments[index].Notes = updatedNotes; // Update the Notes field in state
                return updatedAppointments;
            });

            // Exit editing mode
            setEditingIndex(null); // Stop editing after saving
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    const saveAppointmentToDB = async (id, notes) => {
        try {
            const response = await fetch(`http://localhost:5000/api/updateappointment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes }), // Send the updated notes as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to save appointment');
            }

            const data = await response.json();
            console.log(data.message); // Optional: Log success message
        } catch (error) {
            console.error('Error saving appointment:', error);
            throw error; // Rethrow error to handle it in the component
        }
    };

    // Fetch appointments when the component mounts
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getappointments'); // Ensure this is the correct path
            const contentType = response.headers.get("Content-Type");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setAppointments(data.appointments); // Update the state with the fetched appointments
            } else {
                throw new Error(`Expected JSON, but got ${contentType}`);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            alert('There was an issue fetching the appointments. Please try again later.');
        }
    };

    const handleEditClick = (index) => {
        setEditingIndex(index); // Enter editing mode for the selected appointment
    };

    return (
        <div className="appointment-list">
            <h1>Appointment List</h1>
            {appointments.length > 0 ? (
                <div className="grid-container" style={gridContainerStyle}>
                    {appointments.map((appointment, index) => (
                        <div key={appointment.id} className="grid-item" style={gridItemStyle}>
                            <p><strong>Name:</strong> {appointment.Name}</p>
                            <p><strong>Email:</strong> {appointment.Email}</p>
                            <p><strong>Phone:</strong> {appointment.Phone}</p>
                            <p><strong>Service:</strong> {appointment.Service}</p>
                            <p><strong>Date:</strong> {new Date(appointment.TimeBooked).toLocaleString()}</p>
                            <p key={appointment.id}>
                                <strong>Notes:</strong>{' '}
                                {editingIndex === index ? (
                                    <>
                                        <textarea
                                            placeholder="Add session notes here"
                                            value={appointments[index].Notes || ''} // Ensure the value is linked to state
                                            onChange={(e) => {
                                                const updatedNotes = e.target.value; // Capture the updated notes
                                                // Update local state with the new note value
                                                setAppointments((prevAppointments) => {
                                                    const updatedAppointments = [...prevAppointments];
                                                    updatedAppointments[index].Notes = updatedNotes; // Directly update Notes
                                                    return updatedAppointments;
                                                });
                                            }}
                                            rows={3}
                                            style={textareaStyle}
                                        />
                                        {/* <button onClick={() => handleSave(index)} style={updateButtonStyle}>
                                            Save
                                        </button> */}
                                    </>
                                ) : (
                                    <span>{appointment.Notes || 'No notes yet'}</span> // Show the existing notes
                                )}
                            </p>
                            {editingIndex === index ? (
                                <button
                                    onClick={() => handleSave(index)} // Save the updated note
                                    style={updateButtonStyle}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditClick(index)} // Edit button to enter editing mode
                                    style={editButtonStyle}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No appointments booked yet!</p>
            )}
        </div>
    );
};

// Styling for grid container
const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Corrected property to camelCase
    gap: '20px',
    padding: '1rem 6rem',
    marginBottom: '3rem',
};

// Styling for individual grid items
const gridItemStyle = {
    backgroundColor: 'var(--background-white)',
    padding: '15px',
    borderRadius: '8px',
    minWidth: '350px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    // flex: '0 0 calc(33.33% - 20px)', // 3 items per row with space for the gap
    boxSizing: 'border-box', // Include padding and borders in the element's total width
};

// Button and textarea styles (same as before)
const updateButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '5px',
};

const editButtonStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '5px',
};

const textareaStyle = {
    width: '100%',
    padding: '5px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
};

export default AppointmentList;
