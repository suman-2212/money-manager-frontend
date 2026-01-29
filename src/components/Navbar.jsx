import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaWallet } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">
                            <FaWallet className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-display font-bold text-gradient">
                            Money Manager
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-1">
                        <Link
                            to="/"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/')
                                    ? 'bg-primary-500/20 text-primary-400'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <FaHome />
                            <span className="font-semibold">Home</span>
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/dashboard')
                                    ? 'bg-primary-500/20 text-primary-400'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <FaChartLine />
                            <span className="font-semibold">Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
