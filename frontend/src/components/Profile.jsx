import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [interviewResults, setInterviewResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/interview/results/${user?._id}`);
                const data = await response.json();
                setInterviewResults(data);
            } catch (error) {
                console.error("Error fetching interview results:", error);
            }
        };

        if (user?._id) {
            fetchResults();
        }
    }, [user?._id]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-5 p-8">
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p className="text-gray-600 dark:text-gray-300">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>

                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span className="text-gray-700 dark:text-gray-300">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span className="text-gray-700 dark:text-gray-300">{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className="my-5">
                    <h1 className="font-bold text-lg">Skills</h1>
                    <div className="flex items-center gap-1">
                        {user?.profile?.skills.length !== 0 
                            ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="dark:bg-gray-700 dark:text-gray-200">{item}</Badge>)) 
                            : <span className="text-gray-500 dark:text-gray-400">NA</span>
                        }
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {isResume 
                        ? <a target="_blank" rel="noopener noreferrer" href={user?.profile?.resume} 
                            className="text-blue-500 dark:text-blue-400 hover:underline cursor-pointer">
                            {user?.profile?.resumeOriginalName}
                          </a> 
                        : <span className="text-gray-500 dark:text-gray-400">NA</span>
                    }
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Mock Interview Results Section */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-5">
                <h1 className="font-bold text-lg my-5">Mock Interview Results</h1>
                {interviewResults.length > 0 ? (
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Date</th>
                                <th className="border border-gray-300 p-2">Role</th>
                                <th className="border border-gray-300 p-2">Score</th>
                                <th className="border border-gray-300 p-2">Total Questions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviewResults.map((result, index) => (
                                <tr key={index} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{new Date(result.date).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-2">{result.role}</td>
                                    <td className="border border-gray-300 p-2">{result.score}</td>
                                    <td className="border border-gray-300 p-2">{result.totalQuestions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No interview results available.</p>
                )}
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
