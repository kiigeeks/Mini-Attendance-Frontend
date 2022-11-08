import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { SendData } from "../Utilities/customAxios"
import AutoTyping from "../Utilities/autoTyping"
import FooterLayouts from "../Layouts/footer.layouts"
import AlertToast from "../Utilities/alertToast"

//functional component
const Register = ({title, desc}) => {
    const [NIP, setNIP] = useState("")
    const [nama, setNama] = useState("")
    const [password, setPassword] = useState("")
    const [formWidth,setFormWidth] = useState("30%")
    const [showToast, setShowToast] = useState(false)
    const [msgToast, setMsgToast] = useState("")
    const formStyle = { width: formWidth }
    const descTyping = [
        "Inputkan Data dengan Baik dan Benar",
        "Catat dan Ingat Password Anda"
    ]
    const navigate = useNavigate()

    useEffect(() => {
        if(window.innerWidth <= 480){
            setFormWidth("90%")
        }
        if(localStorage.getItem("nama") && localStorage.getItem("nip")){
            navigate('/dashboard')
        }
    }, [])

    const handleNIP = (inputNIP) => setNIP(inputNIP)
    const handleNama = (inputNama) => setNama(inputNama)
    const handlePassword = (inputPassword) => setPassword(inputPassword)
    const handleToast = () => setShowToast(!showToast)
    const userRegister = (e) => {
        e.preventDefault()
        const requestData = {
            nip: NIP, 
            nama: nama,
            password: password
        }
        SendData("POST", 'users', requestData).then((res) => {
            if(res.result) navigate('/login',{state:{show:true,message:res.message,status:"success"}})
        }).catch((error) => {
            setShowToast(true)
            setMsgToast(error.response.data.message)
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
                    <Form className="w-100 mx-auto d-flex flex-column gap-3" onSubmit={userRegister}>
                        <Form.Group>
                            <Form.Label className="fw-bold">NIP</Form.Label>
                            <Form.Control type="number" placeholder="Masukkan NIP Anda" required onChange={(event) => handleNIP(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fw-bold">Nama</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Nama Anda" required onChange={(event) => handleNama(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control type="password" placeholder="*****" required onChange={(event) => handlePassword(event.target.value)}/>
                        </Form.Group>
                        <Button variant="success" className="mt-3 w-100" type="submit">Registrasi</Button>
                    </Form>
                </div>
                <div className="mt-4">
                    <p className="fw-normal fs-6 text-muted">
                        Sudah Memiliki Akun? <a href="/login" className="fw-bold text-black">Login</a>
                    </p>
                </div>
                <FooterLayouts></FooterLayouts>
            </div>
            {showToast && (<AlertToast show={showToast} msg={msgToast} status={"danger"} handleToast={handleToast}></AlertToast>)}
        </Container>
    )
}

export default Register