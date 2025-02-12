'use client';
import React, { useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
const ISSERVER = typeof window === 'undefined';

const Profile = () => {

  const token = !ISSERVER ? localStorage.getItem('token') : '';
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuser`, {
      headers: {
        'x-auth-token': token
      }
    });
    console.log(res.data);
    setUserData(res.data);
  }

  useEffect(() => {
    fetchUserData();
  }, [])



  const formSubmit = (values) => {

    console.log(values);
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/` + userData._id, values)
      .then((result) => {
        toast.success('page Updated Successfully');
        fetchUserData();
        // router.back();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to update page');
      });
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Mypreset'); //Folder
    formData.append('cloud_name', 'dwduh2cgq');   //File

    axios.post('https://api.cloudinary.com/v1_1/dwduh2cgq/image/upload', formData)
      .then((result) => {
        console.log(result.data);
        toast.success('File Uploaded Successfully');
        formSubmit({ 'avatar': result.data.url });
      }).catch((err) => {
        console.log(err);
        toast.error('Failed to upload file');
      });
  }
  if (userData === null) {
    return <h1>Loading ... </h1>
  }

  return (
    <div className='bg-violet-300'>
      {/* Card Section */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
          <div className="mb-8">
            <h2 className="text-2xl text-center font-bold text-gray-800 dark:text-neutral-200">
              Profile
            </h2>
            {
              userData !== null ? (
                <Formik initialValues={userData} onSubmit={formSubmit}>
                  {
                    (userForm) => {

                      return (<form className="mt-8 space-y-6" onSubmit={userForm.handleSubmit}>
                        {/* Grid */}
                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                          <div className="sm:col-span-3">
                            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                              Profile photo
                            </label>

                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-9">
                            <div className="flex items-center gap-5">
                              <img
                                className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
                                src={userData.avatar}
                                alt="Avatar"
                              />
                              <div className="flex gap-x-2">
                                <div>
                                  <input
                                    type="file"
                                    onChange={uploadFile}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                    required=""
                                  />

                                </div>
                              </div>
                            </div>
                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="af-account-full-name"
                              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                            >
                              Full name
                            </label>
                            <div className="hs-tooltip inline-block">
                              <svg
                                className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                              <span
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                role="tooltip"
                              >
                                Displayed on public forums, such as Preline
                              </span>
                            </div>
                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-9">
                            <div className="sm:flex">
                              <input
                                id="name"
                                type="text"
                                onChange={userForm.handleChange}
                                value={userForm.values.name}
                                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                placeholder="Enter Your Name"
                              />
                            </div>
                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                            >
                              Email
                            </label>
                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-9">
                            <input
                              id="email"
                              type="email"
                              onChange={userForm.handleChange}
                              value={userForm.values.email}
                              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                              placeholder="your@site.com"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <div className="inline-block">
                              <label
                                htmlFor="city"
                                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                              >
                                City
                              </label>
                            </div>
                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-9">
                            <div className="sm:flex">
                              <input
                                id="city"
                                type="text"
                                onChange={userForm.handleChange}
                                value={userForm.values.city}
                                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="af-account-bio"
                              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                            >
                              Bio
                            </label>
                          </div>
                          {/* End Col */}
                          <div className="sm:col-span-9">
                            <textarea
                              id="af-account-bio"
                              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                              rows={6}
                              placeholder="Type your message..."
                              defaultValue={""}
                            />
                          </div>
                          {/* End Col */}
                        </div>
                        {/* End Grid */}
                        <div className="mt-5 flex justify-end gap-x-2">
                          <button
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Save changes
                          </button>
                        </div>
                      </form>)
                    }
                  }
                </Formik>) : (
                <p>Loading...</p>
              )
            }
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Card Section */}
    </div>
  )
}

export default Profile;

