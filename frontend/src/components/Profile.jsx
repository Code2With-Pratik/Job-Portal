import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

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
                        {
                            user?.profile?.skills.length !== 0 
                                ? user?.profile?.skills.map((item, index) => 
                                    <Badge key={index} className="dark:bg-gray-700 dark:text-gray-200">{item}</Badge>) 
                                : <span className="text-gray-500 dark:text-gray-400">NA</span>
                        }
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume 
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

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
