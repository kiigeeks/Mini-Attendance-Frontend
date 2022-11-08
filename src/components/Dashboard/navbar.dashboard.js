import React from 'react'
import Clock from 'react-live-clock';

const Navbar = ({ title, handleLogout, navigate }) => {
    return (
        <div>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4">{ title }</span>
                    </a>
                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <a href="/" className="me-3 py-2 text-dark text-decoration-none" style={{ cursor: "pointer" }}>
                            Home
                        </a>
                        <a href="/profile" className="me-3 py-2 text-dark text-decoration-none" style={{ cursor: "pointer" }}>
                            Profile
                        </a>
                        <div className="py-2 text-dark text-decoration-none d-flex justify-content-center align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => handleLogout(navigate)}>
                            Logout
                            <img height="15" width="15" src="/img/icon/logout2.png" alt="dashboard" className="me-1"/> 
                        </div>
                    </nav>
                </div>
                <div className='flex justify-content-center align-content-center text-center mb-3'>
                    <span className="me-3 py-2 text-dark text-decoration-none">
                        <Clock
                            format={'dddd, D-M-YYYY, h:mm:ss A'}
                            ticking={true}
                            timezone={'Asia/Jakarta'} />
                    </span>
                </div>
            </header>
        </div>
    )
}

export default Navbar