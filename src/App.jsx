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
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-24 sm:pb-32 lg:pb-40 max-w-7xl w-full">
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
