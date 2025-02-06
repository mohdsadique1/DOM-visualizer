'use client'
import React from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password required')
    .matches(/[a-z]/, 'Lower case letter is required')
    .matches(/[A-Z]/, 'Upper case letter is required')
    .matches(/[0-9]/, 'Number is required')
    .matches(/\W/, 'Special character is required'),
  confirmPassword: Yup.string().required(' Confirm Password Required')
    .oneOf([Yup.ref('password'), null], 'Password must match')
});

const Signup = () => {

  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      console.log(values);

      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          toast.success('User added successfully');
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || 'some error occured');
        });
    },
    validationSchema: SignupSchema
  });

  return (
    <div><div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Sign up
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-800 md:text-lg">
            This is a section of some simple filler text, also known as placeholder
            text. It shares some characteristics of a real written text but is
            random or otherwise generated.
          </p>
        </div>
        {/* text - end */}
        {/* form - start */}
        <form onSubmit={signupForm.handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Name
            </label>
            <input
              name="name"
              onChange={signupForm.handleChange}
              value={signupForm.values.name}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Company
            </label>
            <input
              name="company"
              onChange={signupForm.handleChange}
              value={signupForm.values.company}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Email*
            </label>
            <input
              name="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Password
            </label>
            <input
              name="password"
              type='password'
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="confirm-password"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type='password'
              onChange={signupForm.handleChange}
              value={signupForm.values.confirmPassword}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div className="flex items-center justify-between sm:col-span-2">
            <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
              Send
            </button>
            <span className="text-sm text-gray-500">*Required</span>
          </div>
          <p className="text-xs text-gray-800">
            By signing up to our newsletter you agree to our{" "}
            <a
              href="/signup"
              className="underline transition duration-100 hover:text-indigo-500 active:text-blue-800"
            >
              Privacy Policy
            </a>
            <Link href="/Login" className="text-blue-700 hover:underline">
              Login here
            </Link>
          </p>
        </form>
        {/* form - end */}
      </div>
    </div>
    </div>
  )
}

export default Signup;