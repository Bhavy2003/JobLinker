import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Menu, LogOut, User2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useTranslation } from "react-i18next";
import "../../i18n.jsx";
import { t } from 'i18next';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                localStorage.removeItem("userId");
                window.location.href = "/login";

                dispatch({ type: 'LOGOUT' });
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {

            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#00040A] to-[#001636] border-b border-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-2">
                <div className="flex items-center justify-between h-16">

                    <div
                        className="text-2xl font-bold text-white cursor-pointer flex items-center xl:ml-[-76px]"
                        onClick={() => { navigate('/'); window.scrollTo(0, 0) }}
                    >
                        Job <span className="text-blue-500">Linker</span>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                        >
                            {menuOpen ? (
                                <X className="h-6 w-6 text-gray-300" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-300" />
                            )}
                        </Button>
                    </div>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-end items-center gap-4 xl:mr-[-100px]">

                        {user ? (
                            <>
                                <ul className="flex font-sans items-center space-x-6 text-gray-300 ">
                                    {user && user.role === 'recruiter' ? (
                                        <>
                                            <Link to='/admin/companies' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("Companies")}</li></Link>
                                            <Link to='/admin/jobs' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold' >{t("Jobs")}</li></Link>
                                            <Link to='/newchat' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("Chat")}</li></Link>
                                        </>
                                    ) : (
                                        <>

                                            <Link to='/' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("Home")}</li></Link>
                                            <Link to='/jobs' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("Jobs")}</li></Link>
                                            <Link to='/browse' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("Browse")}</li></Link>
                                            <Link to='/aboutus' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("About")}</li></Link>
                                            <Link to='/newchat' onClick={() => window.scrollTo(0, 0)} ><li className='cursor-pointer hover:text-white font-bold'>{t("Chat")}</li></Link>
                                        </>
                                    )}
                                </ul>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8T0hZUoX8kuRi3EZpZbUDtZ_WqqN9Ll15Q&s'}
                                                alt="User Avatar"
                                                className="object-cover w-full h-full"
                                            />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-4 bg-gradient-to-r from-[#00040A] to-[#001636] shadow-md rounded-lg w-80">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                                                <AvatarImage
                                                    src={user?.profile?.profilePhoto}
                                                    alt="User Avatar"
                                                    className="object-cover w-full h-full"
                                                />
                                            </Avatar>
                                            <div>
                                                <h1 className="font-semibold text-blue-400">{user?.fullname}</h1>
                                                <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center gap-2">
                                            {(user && (user.role === 'student' || user.role === 'recruiter')) && (
                                                <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
                                                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-400">
                                                        <User2 className="w-4 h-4" />
                                                        {t("ViewProfile")}
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button
                                                onClick={logoutHandler}
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-1 text-red-400"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                {t("Logout")}
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        ) : (
                            <>
                                <ul className="flex font-sans items-center space-x-6 text-gray-300">
                                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                                        <li className="cursor-pointer hover:text-white font-bold">{t("Home")}</li>
                                    </Link>
                                    <Link to="/jobs" onClick={() => window.scrollTo(0, 0)}>
                                        <li className="cursor-pointer hover:text-white font-bold">{t("Jobs")}</li>
                                    </Link>
                                    <Link to="/browse" onClick={() => window.scrollTo(0, 0)}>
                                        <li className="cursor-pointer hover:text-white font-bold">{t("Browse")}</li>
                                    </Link>
                                    <Link to='/aboutus' onClick={() => window.scrollTo(0, 0)}><li className='cursor-pointer hover:text-white font-bold'>{t("About")}</li></Link>
                                </ul>
                                <Link to="/login" onClick={() => window.scrollTo(0, 0)}>
                                    <Button variant="outline" className="border-blue-600 text-blue-600">
                                        {t("Login")}
                                    </Button>
                                </Link>
                                <Link to="/signup" onClick={() => window.scrollTo(0, 0)}>
                                    <Button className="bg-blue-600 hover:bg-blue-800 text-white">{t("SignUp")}</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu */}
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="top-16 left-0 right-0 bg-gradient-to-r from-[#00040A] to-[#001636] p-10 md:hidden z-50">
                    <ul className="space-y-4 text-gray-300">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/admin/companies" onClick={() => window.scrollTo(0, 0)}>{t("Companies")}</Link>
                                </li>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/admin/jobs" onClick={() => window.scrollTo(0, 0)}>{t("Jobs")}</Link>
                                </li>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/newchat" onClick={() => window.scrollTo(0, 0)}>{t("Chat")}</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>{t("Home")}</Link>
                                </li>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/jobs" onClick={() => window.scrollTo(0, 0)}>{t("Jobs")}</Link>
                                </li>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/browse" onClick={() => window.scrollTo(0, 0)}>{t("Browse")}</Link>
                                </li>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)}>{t("About")}</Link>
                                </li>
                                <li className="cursor-pointer hover:text-white font-bold">
                                    <Link to="/newchat" onClick={() => window.scrollTo(0, 0)}>{t("Chat")}</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* ✅ Show Profile Only If User Is Logged In */}
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="w-8 h-8 rounded-full overflow-hidden cursor-pointer mt-5">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8T0hZUoX8kuRi3EZpZbUDtZ_WqqN9Ll15Q&s'}
                                        alt="User Avatar"
                                        className="object-cover w-full h-full"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="p-4 bg-gradient-to-r from-[#00040A] to-[#001636] shadow-md rounded-lg w-80">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="User Avatar"
                                            className="object-cover w-full h-full"
                                        />
                                    </Avatar>
                                    <div>
                                        <h1 className="font-semibold text-blue-400">{user?.fullname}</h1>
                                        <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center gap-2">
                                    {(user && (user.role === 'student' || user.role === 'recruiter')) && (
                                        <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-400">
                                                <User2 className="w-4 h-4" />
                                                {t("ViewProfile")}
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        onClick={logoutHandler}
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1 text-red-400"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {t("Logout")}
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {!user && (
                        <div className="flex -ml-5 mt-5 gap-3">
                            <Link to="/login" onClick={() => window.scrollTo(0, 0)}>
                                <Button variant="outline" className="border-blue-600 text-blue-600">
                                    {t("Login")}
                                </Button>
                            </Link>
                            <Link to="/signup" onClick={() => window.scrollTo(0, 0)}>
                                <Button className="bg-blue-600 hover:bg-blue-800 text-white">
                                    {t("SignUp")}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}



        </nav>
    );
};

export default Navbar;
