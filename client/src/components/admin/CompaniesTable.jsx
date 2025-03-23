import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="bg-white rounded-lg shadow-md p-5 transition-all duration-300">
            <Table>
                <TableCaption>{t("ListRegister")}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t("Logo")}</TableHead>
                        <TableHead>{t("CompanyName")}</TableHead>
                        <TableHead>{t("Date")}</TableHead>
                        <TableHead className="text-right">{t("Action")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <motion.tr
                                key={ company._id }
                                className="hover:bg-blue-100 cursor-pointer transition-all duration-300"
                                initial={ { opacity: 0, y: -10 } }
                                animate={ { opacity: 1, y: 0 } }
                                exit={ { opacity: 0, y: -10 } }
                                transition={ { duration: 0.2 } }
                            >
                                <TableCell>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={ company.logo } alt={ company.name } />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{ company.name }</TableCell>
                                {/* <TableCell>{ company.createdAt.split("T")[0] }</TableCell> */}
                                <TableCell>{ company.createdAt ? company.createdAt.split("T")[0] : "N/A" }</TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer text-blue-500" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={ () => navigate(`/admin/companies/${company._id}`) }
                                                className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-300"
                                            >
                                                <Edit2 className="w-4 text-blue-500" />
                                                <span className='text-blue-500'>{t("Edit")}</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
