import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaWallet } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                            <FaWallet className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-semibold text-gray-900">
                            Money Manager
                        </span>
                    </Link>

                    <div className="flex items-center space-x-2">
                        <Link
                            to="/"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/')
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <FaHome />
                            <span className="font-medium">Home</span>
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/dashboard')
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <FaChartLine />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
