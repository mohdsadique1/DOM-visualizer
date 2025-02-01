import React from 'react'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    return (
        <div style={{height: "115vh"}}>
            <div className="card w-50 mx-auto mt-5">
                <img
                    src="https://www.freeiconspng.com/uploads/forgot-password-icon-27.png"
                    className="card-img-top"
                    alt="Fissure in Sandstone"
                />
                <div className="card-body">
                    <h2 className="card-title text-center">FORGOT PASSWORD</h2>
                    <p className="card-text text-center">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                    <div className="input-group mb-4">
                        <span className="input-group-text" id="basic-addon1">
                            <i class="fas fa-envelope    "></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>

                    <button type='submit' className="btn btn-primary w-100 mb-4">
                        Submit
                    </button>
                    <Link to='/signin' className='text-center'>Back to SignIn</Link>
                </div>
            </div>

        </div>
    )
}

export default ForgetPassword;