import React from 'react'

const ErrorNotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
        <p className="lead">
          Halaman yang anda kunjungi tidak tersedia
        </p>
        {
          (localStorage.getItem("nama") && localStorage.getItem("nip")) ? (
            <a href="/" className="btn btn-dark text-white">
              <div className="d-flex justify-content-center align-items-center">
                <img height="20" width="20" src="/img/icon/dashboard.png" alt="dashboard" className="me-1"/>
                Dashboard
              </div>
            </a>
          ) : (
            <a href="/" className="btn btn-dark text-white">
              <div className="d-flex justify-content-center align-items-center">
                <img height="20" width="20" src="/img/icon/home.png" alt="home" className="me-1"/>
                Home
              </div>
            </a>
          )
          }
      </div>
    </div>
  )
}

export default ErrorNotFound