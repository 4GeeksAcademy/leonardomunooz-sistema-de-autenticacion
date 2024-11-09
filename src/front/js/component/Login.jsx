import React from 'react'

const Login = () => {
    return (


        <div className="container mx-auto " style={{ "width": "800px" }}>
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <label for="formGroupEmail" className="form-label">Email</label>
                        <input type="text" className="form-control" id="formGroupEmail" placeholder="Example input email" />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label for="formGroupPassword" className="form-label">Password</label>
                        <input type="text" className="form-control" id="formGroupPassword" placeholder="Another input password" />
                    </div>
                </div>
                <div className="col-12">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Login