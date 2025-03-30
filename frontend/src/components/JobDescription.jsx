import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-6 rounded-md bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700'>
            <Navbar />
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl text-gray-900 dark:text-white'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className="text-[#F83002] dark:text-red-400 font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] dark:text-purple-400 font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 dark:bg-gray-700 cursor-not-allowed' : 'bg-[#7209b7] dark:bg-purple-600 hover:bg-[#5f32ad] dark:hover:bg-purple-500'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 dark:border-b-gray-600 font-medium py-4 text-gray-900 dark:text-white'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Role: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Location: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Description: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Experience: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Salary: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Total Applicants: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Posted Date: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription;
