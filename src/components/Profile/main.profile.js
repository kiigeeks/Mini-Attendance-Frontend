import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SendData } from "../Utilities/customAxios"
import { handleLogout } from '../Utilities/logout'
import FooterLayouts from "../Layouts/footer.layouts"
import AlertToast from "../Utilities/alertToast"

const Edit = ({ title }) => {
    const [nama, setNama] = useState(localStorage.getItem("nama"))
    const [password, setPassword] = useState("")
    const [passwordBaru, setPasswordBaru] = useState("")
    const [formWidth,setFormWidth] = useState("30%")
    const [showToast, setShowToast] = useState(false)
    const [msgToast, setMsgToast] = useState("")
    const formStyle = { width: formWidth }
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("nama") && !localStorage.getItem("nip")) navigate('/login')
        if(window.innerWidth <= 480) setFormWidth("90%")
    }, [])

    const handleToast = () => setShowToast(!showToast)
    const updateProfile = (e) => {
        e.preventDefault()
        const requestData = {
            nip: localStorage.getItem("nip"),
            passwordBaru: passwordBaru,
            password: password,
            nama: nama
        }
        SendData("PUT", 'users', requestData).then((res) => {
            if(res.result) {
                const stateMsg = {state:{show:true,message:res.message,status:"success"}}
                handleLogout(navigate, stateMsg)
            }
        }).catch((error) => {
            setShowToast(true)
            setMsgToast(error.response.data.message)
        })
    }
    
    return (
        <Container>
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h3 className="display-4 fw-bold">{ title }</h3>
                </div>
                <div className="bg-white p-4 mt-3 rounded-3" style={formStyle}>
                    <Form className='d-flex flex-column gap-3' onSubmit={updateProfile}>
                        <Form.Group>
                            <Form.Label className="fw-bold">Nama</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Nama Anda" minLength="3" required onChange={(event) => setNama(event.target.value)} defaultValue={localStorage.getItem("nama")}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fw-bold">Password Baru</Form.Label>
                            <Form.Control type="password" placeholder="*****" minLength="5" required onChange={(event) => setPasswordBaru(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fw-bold">Password Lama</Form.Label>
                            <Form.Control type="password" placeholder="*****" minLength="5" required onChange={(event) => setPassword(event.target.value)}/>
                            <Form.Text className='text-muted'>*Setelah memasukkan Password Lama, Anda harus Login Kembali</Form.Text>
                        </Form.Group>
                        <Button variant="success" className="mt-4 w-100" type='submit'>Simpan</Button>
                    </Form>
                </div>
                <a href="/dashboard" className="btn btn-dark text-white mt-3">
                    <div className="d-flex justify-content-center align-items-center">
                        <img height="20" width="20" src="/img/icon/dashboard.png" alt="dashboard" className="me-1"/>
                        Dashboard
                    </div>
                </a>
                <FooterLayouts></FooterLayouts>
            </div>
            {showToast && (<AlertToast show={showToast} msg={msgToast} status={"danger"} handleToast={handleToast}></AlertToast>)}
        </Container>
    )
}

export default Edit