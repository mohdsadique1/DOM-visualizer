'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast';

const Managevisualization = () => {

    const [visualizationList, setvisualizationList] = useState([]);
    const fetchvisualization = () => {
        axios.get('http://localhost:5000/visualization/getall')
            .then((result) => {
                console.table(result.data);
                setvisualizationList(result.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchvisualization();
    }, [])

    const deletevisualization = (id) => {
        axios.delete('http://localhost:5000/visualization/delete/' +id)
            .then((result) => {
                toast.success('visualization Deleted Successfully')
                fetchvisualization();
            }).catch((err) => {
                console.log(err);
                toast.error('Failed to delete visualization')
            });
    }


    return (
        <div className=''>
        <div className='container mx-auto py-1'>
            <h1 className='text-center text-2xl font-bold'>Manage visualizations</h1>

            <table className='w-full'>
                <thead>
                    <tr className='border bg-gray-600'>
                        <th className='p-3'>visualization id</th>
                        <th className='p-3'>visualization Name</th>
                        <th className='p-3'>visualization Model</th>
                        <th className='p-3'>visualization Category</th>
                        <th className='p-3'>Created At</th>
                        <th className='p-3' colSpan={2}></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        visualizationList.map((visualization) => {
                            return (
                                <tr className='border bg-gray-200'>
                                    <td className='p-3'>{visualization._id}</td>
                                    <td className='p-3'>{visualization.name}</td>
                                    <td className='p-3'>{visualization.model}</td>
                                    <td className='p-3'>{visualization.category}</td>
                                    <td className='p-3'>{new Date(visualization.createdAt).toDateString()}</td>
                                    <td className='p-3'>
                                        <button onClick={() => { deletevisualization(visualization._id) }} className='bg-red-500 py-1 px-3 text-white rounded-full'>Delete</button>
                                    </td>
                                    <td className='p-3'>
                                        <Link href={'/updatevisualization/' + visualization._id} className='bg-blue-500 py-1 px-3 text-white rounded-full'>Update</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Managevisualization;