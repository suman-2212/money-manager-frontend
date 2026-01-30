import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaWallet } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass-card sticky top-0 z-50 animate-slide-down border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group py-2 flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                            }}>
                            <FaWallet className="text-white text-lg sm:text-xl" />
                        </div>
                        <span className="text-xl sm:text-2xl font-extrabold gradient-text whitespace-nowrap">
                            Money Manager
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base whitespace-nowrap ${isActive('/')
                                ? 'glass-dark text-white shadow-lg'
                                : 'text-gray-700 hover:bg-white/50'
                                }`}
                            style={isActive('/') ? {
                                background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                            } : {}}
                        >
                            <FaHome className="text-base sm:text-lg" />
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base whitespace-nowrap ${isActive('/dashboard')
                                ? 'glass-dark text-white shadow-lg'
                                : 'text-gray-700 hover:bg-white/50'
                                }`}
                            style={isActive('/dashboard') ? {
                                background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                            } : {}}
                        >
                            <FaChartLine className="text-base sm:text-lg" />
                            <span>Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
