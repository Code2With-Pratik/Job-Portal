import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white drop-shadow-sm sticky top-0 z-50">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
                {/* Branding */}
                <h1 className="text-2xl font-bold">Job<span className="text-[#7825b8] font-serif">Hunt</span></h1>
                
                {/* Navigation (Hidden in Mobile) */}
                <ul className="hidden md:flex items-center gap-6 text-lg">
                    {user && user.role === 'recruiter' ? (
                        <>
                            <li><Link to="/admin/companies" className="nav-link">Companies</Link></li>
                            <li><Link to="/admin/jobs" className="nav-link">Jobs</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
                            <li><Link to="/browse" className="nav-link">Browse</Link></li>
                            <li><Link to="/mock-interview" className="nav-link">Mock Interview</Link></li>
                        </>
                    )}
                </ul>
                
                {/* Right Section */}
                <div className="flex items-center gap-8">
                    <ThemeToggle />
                    {!user ? (
                        <div className="hidden md:flex gap-3">
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        {user?.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        {!user ? (
                            <Button variant="outline" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                                <Menu className="w-6 h-6" />
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && !user && (
                <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-white dark:bg-gray-900 shadow-md">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/jobs" className="nav-link">Jobs</Link>
                    <Link to="/browse" className="nav-link">Browse</Link>
                    <Link to="/mock-interview" className="nav-link">Mock Interview</Link>
                    <Link to="/login"><Button variant="outline">Login</Button></Link>
                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;

/* Additional CSS */
const styles = `
.nav-link {
    transition: transform 0.2s ease, color 0.2s ease;
}
.nav-link:hover {
    color: #7825b8;
    transform: scale(1.1);
}`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
