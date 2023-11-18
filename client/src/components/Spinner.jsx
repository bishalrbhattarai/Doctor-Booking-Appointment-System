import React from 'react'

const Spinner = () => {
    return (
        <div className="container"
            style={{
                marginTop: "300px"
            }}
        >
            <div className="row">
                <div className="col-12  m-auto">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Spinner
