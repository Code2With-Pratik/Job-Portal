import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-4 md:p-5 rounded-md shadow-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 
            cursor-pointer transition-all hover:shadow-2xl w-full max-w-lg mx-auto"
        >
            {/* Company Logo & Name */}
            <div className='flex items-center gap-2 md:gap-4 my-2'>
                <Button className="p-4 md:p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div className="truncate">
                    <h1 className='font-medium text-base md:text-lg text-black dark:text-white truncate'>{job?.company?.name}</h1>
                    <p className='text-xs md:text-sm text-gray-500 dark:text-gray-400'>India</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-base md:text-lg my-2 text-black dark:text-white truncate">{job?.title}</h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{job?.description}</p>
            </div>

            {/* Job Details Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 dark:text-blue-400 font-bold text-xs md:text-sm px-2 py-1" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] dark:text-red-500 font-bold text-xs md:text-sm px-2 py-1" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] dark:text-purple-400 font-bold text-xs md:text-sm px-2 py-1" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
