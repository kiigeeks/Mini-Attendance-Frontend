import FooterLayouts from "../Layouts/footer.layouts"
import AutoTyping from "../Utilities/autoTyping"
import './css/style.css'

const Home = ({ title }) => {
  const descTyping = [
    "Jika sudah memiliki akun pilih Login",
    "Jika belum memiliki akun pilih Registrasi"
  ]
  
  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">{ title }</h1>
        <p className="fs-3">
          Selamat datang di <span className='fw-bold'>Mini Absensi Apps</span> 🥳
        </p>
        {
          (localStorage.getItem("nama") && localStorage.getItem("nip")) ? (
            <div className="d-flex justify-content-center gap-3 mt-5">
              <a href="/dashboard" className="btn btn-primary d-flex justify-content-center align-items-center">
                  <img height="20" width="20" src="/img/icon/dashboard.png" alt="dashboard" className="me-1"/>
                  Dashboard
              </a>
            </div>
          ) : (
            <div>
              <span className="lead">
                <AutoTyping textTyping={ descTyping } />
              </span>

              <div className="d-flex justify-content-center gap-3 mt-3">
                <a href="/login" className="btn btn-primary">
                    <img height="20" width="20" src="/img/icon/login.png" alt="login" className="me-1"/>
                    Login
                </a>
                <a href="/register" className="btn btn-success">
                    <img height="20" width="20" src="/img/icon/register.png" alt="registrasi" className="me-1"/>
                    Registrasi
                </a>
              </div>
            </div>
          )
        }
        
        
        <div className="mt-5">
          <a href="https://github.com/kiigeeks/Mini-Attendance-Frontend" className="btn btn-dark">
            <div className="d-flex justify-content-center align-items-center">
              <img height="20" width="20" src="/img/icon/github.png" alt="github" className="me-2"/>
              Source Code
            </div>
          </a>
        </div>
      </div>
      <FooterLayouts></FooterLayouts>
    </div>
  )
}

export default Home