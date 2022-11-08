import { useEffect, useState } from "react"
import {Button, Container, Form} from "react-bootstrap"
import { useNavigate, useLocation } from 'react-router-dom'
import { SendData } from "../Utilities/customAxios"
import AutoTyping from "../Utilities/autoTyping"
import FooterLayouts from "../Layouts/footer.layouts"
import AlertToast from "../Utilities/alertToast"

//functional component
const Login = ({title, desc}) => {
    const [NIP, setNIP] = useState("")
    const [password, setPassword] = useState("")
    const [formWidth,setFormWidth] = useState("30%")
    const [showToast, setShowToast] = useState(false)
    const [msgToast, setMsgToast] = useState("")
    const [statusToast, setStatusToast] = useState("danger")
    const formStyle = { width: formWidth }
    const descTyping = [
        "Registrasi, Jika belum memiliki akun",
        "Pastikan NIP dan Password Anda sesuai"
    ]
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(window.innerWidth <= 480) setFormWidth("90%")
        if(localStorage.getItem("nama") && localStorage.getItem("nip")) navigate('/dashboard')
        if(location.state) {
            setShowToast(location.state.show)
            setMsgToast(location.state.message)
            setStatusToast(location.state.status)
            window.history.replaceState({}, document.title)
        }
    }, [])

    const handleNIP = (inputNIP) => setNIP(inputNIP)
    const handlePassword = (inputPassword) => setPassword(inputPassword)
    const handleToast = () => setShowToast(!showToast)
    const userLogin = (e) => {
        e.preventDefault()
        const requestData = {
            nip: NIP, 
            password: password
        }
        SendData("POST", 'users/login', requestData).then((res) => {
            localStorage.setItem("nip", res.result.nip)
            localStorage.setItem("nama", res.result.nama)
            navigate('/dashboard')
        }).catch((error) => {
            setShowToast(true)
            setMsgToast(error.response.data.message)
            setStatusToast("danger")
        })
    }
    
    return (
        <Container >
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h3 className="display-4 fw-bold">{ title }</h3>
                    <span className="lead">
                        <AutoTyping textTyping={descTyping} />
                    </span>
                </div>
                <div className="bg-white p-4 mt-5 rounded-3" style={formStyle}>
                    <Form className="w-100 mx-auto d-flex flex-column gap-2" onSubmit={userLogin}>
                        <Form.Group>
                            <Form.Label className="fw-bold">NIP</Form.Label>
                            <Form.Control type="number" placeholder="Masukkan NIP Anda" required onChange={(event) => handleNIP(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control type="password" placeholder="*****" minLength="5" required onChange={(event) => handlePassword(event.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" className="mt-3 w-100" type="submit">Login</Button>
                    </Form>
                </div>
                <div className="mt-5">
                    <p className="fw-normal fs-6 text-muted">
                        Belum Mempunyai Akun? <a href="/register" className="fw-bold text-black">Daftar</a>
                    </p>
                </div>
                <FooterLayouts></FooterLayouts>
            </div>
            {showToast && (<AlertToast show={showToast} msg={msgToast} status={statusToast} handleToast={handleToast}></AlertToast>)}
        </Container>
    )

}

export default Login