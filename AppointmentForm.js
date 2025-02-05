import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentForm = ({ addAppointment }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState(''); // New state for selected service

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = { name, email, phone, date: startDate, service };

        try {
            const response = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });

            const result = await response.json();

            if (response.ok) {
                var success = document.getElementById("message");
                // alert('Appointment booked successfully!');
                console.log(result);
                success.innerText = '✔️'+result.message;
                addAppointment(appointment);
                // Reset form fields
                setName('');
                setEmail('');
                setPhone('');
                setService('');
                setStartDate(new Date());
            } else {
                var success = document.getElementById("message");
                // alert('Appointment booked successfully!');
                success.innerText = result.message;
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    return (
        <div className="appointment-form">
            <h1>Book an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Select Service:</label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a service</option>
                        <option value="Individual Therapy">Individual Therapy</option>
                        <option value="Group Therapy">Group Therapy</option>
                        <option value="Medication Management">Medication Management</option>
                        <option value="Stress Management Techniques">Stress Management Techniques</option>
                        <option value="Family Counseling">Family Counseling</option>
                    </select>
                </div>
                <div className="datepicker-container">
                    <div className='datepicker'>
                    <label>Select Date and Time:</label>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} 
                        showTimeSelect 
                        timeFormat="HH:mm" 
                        timeIntervals={30} 
                        dateFormat="MMMM d, yyyy h:mm aa" 
                        timeCaption="time" 
                        minDate={new Date()}
                    />

                    </div>
                <button type="submit">Book Appointment</button>
                </div>
            </form>
            <div className="success-msg">
                <span id="message"></span>
            </div>
        </div>
    );
};

export default AppointmentForm;
