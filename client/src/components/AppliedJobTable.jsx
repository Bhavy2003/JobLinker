import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from './ui/table';
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
const AppliedJobTable = () => {
    // Safely get appliedJobs from state with a fallback to an empty array
    const { allAppliedJobs } = useSelector(state => state.job);
    
    const {t}=useTranslation();
    const getStatusColor = (status) => {
        if (!status) return 'text-gray-400'; // Fallback color for undefined status
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'text-orange-400';
            case 'accepted':
                return 'text-green-400';
            case 'rejected':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <motion.div
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5 } }
        >
            <div className="overflow-x-auto">
                <Table className="table-auto w-full border border-gray-700 rounded-lg bg-gray-800 text-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-900 text-gray-200">
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t("JobTitle")}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t("Company")}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t("AppliedDate")}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t("Status")}</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
    { allAppliedJobs?.length > 0 ? (
        allAppliedJobs
            .filter(appliedJob => appliedJob?.job) // Ensure job exists
            .map((appliedJob, index) => (
                <motion.tr
                    key={ appliedJob._id }
                    className="hover:bg-gray-700 transition-colors duration-300 text-gray-200"
                    initial={ { opacity: 0, y: 10 } }
                    animate={ { opacity: 1, y: 0 } }
                    transition={ { duration: 0.3, delay: index * 0.1 } }
                >
                    <TableCell className="border-b border-gray-700 px-4 py-3">
                        { appliedJob?.job?.title || 'Unknown Title' }
                    </TableCell>
                    <TableCell className="border-b border-gray-700 px-4 py-3">
                        { appliedJob?.job?.company?.name || 'Unknown Company' }
                    </TableCell>
                    <TableCell className="border-b border-gray-700 px-4 py-3">
                        { appliedJob?.createdAt ? new Date(appliedJob.createdAt).toLocaleDateString() : 'N/A' }
                    </TableCell>
                    <TableCell
                        className={ `border-b border-gray-700 px-4 py-3 ${getStatusColor(
                            appliedJob?.status
                        )}` }
                    >
                        { appliedJob?.status || 'Unknown' }
                    </TableCell>
                </motion.tr>
            ))
    ) : (
        <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
                No applied jobs found
            </td>
        </tr>
    ) }
</TableBody>

                </Table>
            </div>
        </motion.div>
    );
};

export default AppliedJobTable;
