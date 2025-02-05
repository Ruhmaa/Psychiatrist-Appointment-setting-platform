import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Services from './Services';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import LoginPage from './LoginPage';
import './styles.css';

const App = () => {
    const [appointments, setAppointments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);

    // Load appointments from localStorage on initial render
    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
        if (storedAppointments) {
            setAppointments(storedAppointments);
        }
    }, []);

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    // Add a new appointment
    const addAppointment = (appointment) => {
        setAppointments([...appointments, { ...appointment, notes: '', tempNotes: '' }]);
        console.log("Confirmation email sent to:", appointment.email);
    };

    // Remove an appointment
    const removeAppointment = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
    };

    // Update an appointment's notes
    const updateAppointment = (index, updatedFields) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment, i) =>
                i === index ? { ...appointment, ...updatedFields } : appointment
            )
        );
    };

    // Handle psychiatrist login
    const handleLogin = () => {
        setIsAuthenticated(true);
        setRedirectTo('/appointment-list');
    };

    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        setRedirectTo('/');
    };

    // Clear redirect state after navigating
    useEffect(() => {
        if (redirectTo) {
            setRedirectTo(null);
        }
    }, [redirectTo]);

    return (
        <Router>
            <div className="app">
                {!isAuthenticated ? (
                    <>
                        <nav>
                            <ul className="nav-left">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/appointments">Book Appointment</Link></li>
                            </ul>
                            <ul className="nav-right">
                                <li><Link to="/loginPage">Login</Link></li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/appointments" element={<AppointmentForm addAppointment={addAppointment} />} />
                            <Route path="/loginPage" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </>
                ) : (
                    <>
                        <nav>
                            <ul className="nav-right">
                                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="/appointment-list" element={<AppointmentList
                                appointments={appointments}
                                removeAppointment={removeAppointment}
                                updateAppointment={updateAppointment}
                                onLogout={handleLogout}
                            />} />
                            <Route path="*" element={<Navigate to="/appointment-list" replace />} />
                        </Routes>
                    </>
                )}
            </div>

            {/* Footer Section */}
            <footer>
                <ul>
                    <li>Copyright 2024 ©</li>
                    <li>Created by Huda, Ruhma & Mahrose</li>
                </ul>
            </footer>
        </Router>
        // <Router>
        //     <div className="app">
        //         {!isAuthenticated ? (
        //             <>
        //                 {/* Navigation for non-authenticated users */}
        //                 <nav>
        //                     <ul className="nav-left">
        //                         <li><Link to="/">Home</Link></li>
        //                         <li><Link to="/contact">Contact</Link></li>
        //                         <li><Link to="/services">Services</Link></li>
        //                         <li><Link to="/appointments">Book Appointment</Link></li>
        //                     </ul>
        //                     <ul className="nav-right">
        //                         <li><Link to="/loginPage">Login</Link></li>
        //                     </ul>
        //                 </nav>

        //                 {/* Sections for non-authenticated users */}
        //                 <section id="home">
        //                     <Home />
        //                 </section>

        //                 <section id="services">
        //                     <Services />
        //                 </section>

        //                 <section id="appointments">
        //                     <AppointmentForm />
        //                 </section>
                        
        //                 <section id="contact">
        //                     <Contact />
        //                 </section>

        //                 <section id="login">
        //                     {/* Update with your LoginPage component content */}
        //                 </section>
        //             </>
        //         ) : (
        //             <>
        //                 {/* Navigation for authenticated users */}
        //                 <nav>
        //                     <ul className="nav-right">
        //                         <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        //                     </ul>
        //                 </nav>

        //                 {/* Sections for authenticated users */}
        //                 <section id="appointment-list">
        //                     {/* Update with your AppointmentList component content */}
        //                 </section>
        //             </>
        //         )}
        //     </div>

        //     {/* Footer Section */}
        //     <footer>
        //         <ul>
        //             <li>Copyright 2024 ©</li>
        //             <li>Created by Huda, Ruhma & Mahrose</li>
        //         </ul>
        //     </footer>
        // </Router>
    );
};

export default App;
