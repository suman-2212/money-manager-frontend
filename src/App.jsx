import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTransactionChange = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <Router>
            <div className="min-h-screen">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home onTransactionChange={handleTransactionChange} refreshTrigger={refreshTrigger} />}
                        />
                        <Route
                            path="/dashboard"
                            element={<Dashboard refreshTrigger={refreshTrigger} />}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
