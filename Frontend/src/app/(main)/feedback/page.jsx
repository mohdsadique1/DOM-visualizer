import React, { useState } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Feedback = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    console.log(currentUser);

    const feedData = async (formdata, { resetForm }) => {
        formdata.user = currentUser._id;
        console.log(formdata)
        // resetForm()

        const res = await fetch('http://localhost:5000/feedback/add', {
            method: 'POST',
            body: JSON.stringify( formdata ),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(res.status)

        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Signed Successfully'
            })
        }

    }



    return (
        <div>

            <div className='container my-5'>

                <div className="row">

                    <div className="col-md-6">
                        <img src="https://img.freepik.com/premium-vector/isometric-style-illustration-about-registration-app-login-website-online-game_529804-422.jpg" alt="" style={{ width: '100%' }} />
                    </div>

                    <div className="col-md-6">

                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center">FEEDBACK</h1>

                                <Formik
                                    initialValues={{ feedback: "", user: "" }}
                                    onSubmit={feedData}
                                >
                                    {
                                        ({ values, handleChange, handleSubmit }) => (
                                            <form onSubmit={handleSubmit}>

                                                <div className="mb-3">
                                                    {/* <label className="form-label" htmlFor="textAreaExample">
                                                        <b>Feedback</b>
                                                    </label> */}
                                                    <textarea
                                                        className="form-control"
                                                        id="textAreaExample"
                                                        rows={5}
                                                        name='feedback'
                                                        onChange={handleChange}
                                                        value={values.feedback}
                                                    />
                                                </div>


                                                <button type="submit" className="btn btn-primary w-100 mb-3">Submit</button>
                                            </form>
                                        )
                                    }
                                </Formik>

                                


                            </div>
                        </div>


                    </div>



                </div>

            </div>
        </div>
    )
}

export default Feedback;