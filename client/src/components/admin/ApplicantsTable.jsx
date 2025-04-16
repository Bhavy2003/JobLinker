import React from 'react';
import { motion } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { useTranslation } from "react-i18next";
import "../../i18n.jsx";
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { updateApplicationStatus } from '@/redux/applicationSlice'; // ✅ Import Redux action

const shortlistingStatus = ['Accepted', 'Rejected'];

const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ApplicantsTable = () => {
    const dispatch = useDispatch(); // ✅ Use Redux Dispatch
    const { applicants } = useSelector((store) => store.application);
    const {t} = useTranslation();
    
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });

            if (res.data.success) {
                toast.success(res.data.message);

                // ✅ Update Redux Store to reflect status change
                dispatch(updateApplicationStatus({ id, status }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='my-[75px] '
        >
            <div className='flex justify-end pb-3 -pt-[10px] pr-4'>
            <Button className='bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 '>
                <Link to='/admin/jobs' onClick={() => window.scrollTo(0, 0)} >{t("Gobacktojobs")}</Link>
            </Button>
            </div>
            <Table className="bg-white shadow-md rounded-lg">
                <TableCaption className="text-blue-600">{t("ListUser")}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-blue-500">{t("FullName")}</TableHead>
                        <TableHead className="text-blue-500">{t("EmailAddress")}</TableHead>
                        <TableHead className="text-blue-500">{t("PhoneNumber")}</TableHead>
                        <TableHead className="text-blue-500">{t("Resumek")}</TableHead>
                        <TableHead className="text-blue-500">{t("Date")}</TableHead>
                        <TableHead className="text-blue-500">{t("Status")}</TableHead>
                        <TableHead className="text-right text-blue-500">{t("Action")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item, index) => (
                        <motion.tr
                            key={item._id}
                            variants={tableRowVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-blue-50"
                        >
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 cursor-pointer"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            {/* <TableCell>
  {item?.applicant?.createdAt ? item.applicant.createdAt.split("T")[0] : "N/A"}
</TableCell> */}
                            <TableCell>{item?.applicant.createdAt.split('T')[0]}</TableCell>
                            <TableCell className="font-bold text-sm">
                                <span
                                    className={`px-2 py-1 rounded-md ${
                                        item.status === "Accepted"
                                            ? "bg-green-100 text-green-700"
                                            : item.status === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {item.status || "Pending"}
                                </span>
                            </TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortlistingStatus.map((status, index) => (
                                            <motion.div
                                                key={index}
                                                onClick={() => statusHandler(status, item?._id)}
                                                whileHover={{ scale: 1.05 }}
                                                className={`${
                                                    status === "Accepted" ? "text-green-700" : "text-red-700"
                                                } flex w-fit items-center my-2 cursor-pointer text-blue-500`}
                                            >
                                                <span>{status}</span>
                                            </motion.div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
            
        </motion.div>
    );
};

export default ApplicantsTable;
