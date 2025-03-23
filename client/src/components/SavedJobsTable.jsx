import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from './ui/table';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../src/i18n.jsx';

const SavedJobsTable = () => {
    const { savedJobs } = useSelector((store) => store.auth);
    const { t } = useTranslation();

    // Debug the savedJobs state
    useEffect(() => {
        // console.log('Saved Jobs in SavedJobsTable:', savedJobs);
    }, [savedJobs]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="overflow-x-auto">
                <Table className="table-auto w-full border border-gray-700 rounded-lg bg-gray-800 text-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-900 text-gray-200">
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t('Title')}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t('Location')}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t('Salary')}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t('Positions')}</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">{t('View')}</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {savedJobs && savedJobs.length > 0 ? (
                            savedJobs.map((job, index) => (
                                <motion.tr
                                    key={job?._id || index}
                                    className="hover:bg-gray-700 transition-colors duration-300"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <TableCell className="border-b border-gray-700 px-4 py-3">
                                        {job?.title || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">
                                        {job?.location || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">
                                        {job?.salary || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">
                                        {job?.position || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">
                                        <Link to={`/description/${job?._id}`} onClick={() => window.scrollTo(0, 0)}>
                                            <Eye className="text-gray-400 hover:text-gray-200 transition-colors duration-300" />
                                        </Link>
                                    </TableCell>
                                </motion.tr>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-gray-400">
                                    {t('No saved jobs found')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default SavedJobsTable;