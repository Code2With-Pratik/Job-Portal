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
                <div>
                    <h1 className="text-2xl font-bold">Job<span className="text-[#7825b8] font-serif">Hunt</span></h1>
                </div>
                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle /> 
                    <Button variant="outline" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
                <div className={`md:flex items-center gap-10 ${menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-white dark:bg-gray-900 py-4 shadow-md" : "hidden"}`}>
                    <ul className="md:flex items-center justify-center gap-8 text-center md:w-full">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className="block py-2 px-4 md:p-0 hover:text-[#7825b8] transition-colors">Companies</Link></li>
                                <li><Link to="/admin/jobs" className="block py-2 px-4 md:p-0 hover:text-[#7825b8] transition-colors">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className="block py-2 px-4 md:p-0 hover:text-[#7825b8] transition-colors">Home</Link></li>
                                <li><Link to="/jobs" className="block py-2 px-4 md:p-0 hover:text-[#7825b8] transition-colors">Jobs</Link></li>
                                <li><Link to="/browse" className="block py-2 px-4 md:p-0 hover:text-[#7825b8] transition-colors">Browse</Link></li>
                                <li><Link to="/mock-interview" className="block py-2 px-4 md:p-0 hover:text-[#7825b8] transition-colors">Mock Interview</Link></li>
                            </>
                        )}
                    </ul>
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3 mt-4 md:mt-0">
                        {!user ? (
                            <>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
