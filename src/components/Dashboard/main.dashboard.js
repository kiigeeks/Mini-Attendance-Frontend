import React, { useEffect, useState } from 'react'
import { Container, Badge, Table } from 'react-bootstrap'
import Navbar from './navbar.dashboard'
import { handleLogout } from '../Utilities/logout'
import { FetchData, SendData } from '../Utilities/customAxios'
import { useNavigate } from 'react-router-dom'
import FormatTime from '../Utilities/formatTime'
import AlertToast from "../Utilities/alertToast"

const Dashboard = ({title}) => {
    const [absensiList, setAbsensiList] = useState([])
    const [absenNotif, setAbsenNotif] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [msgToast, setMsgToast] = useState("")
    const [statusToast, setStatusToast] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("nama") && !localStorage.getItem("nip")){
            navigate('/login')
        }
        FetchData("GET", "absensi").then((res) => setAbsensiList(res.result))
    }, [absenNotif])

    const handleToast = () => setShowToast(!showToast)
    const absen = (params) => {
        const requestData = {
            nip: localStorage.getItem("nip")
        }
        SendData("POST", `absensi/${params}`, requestData).then((res) => {
            setAbsenNotif(!absenNotif)
            if(res.result){
                setShowToast(true)
                setMsgToast(res.message)
                setStatusToast("success")
            }
        }).catch((error) => {
            setShowToast(true)
            setMsgToast(error.response.data.message)
            setStatusToast("danger")
        })
    }

    return (
        <Container className='py-3 vh-full'>
            <Navbar title={title} handleLogout={handleLogout} navigate={navigate}></Navbar> 
            <main>
                <div className="row mb-3 d-flex justify-content-center p-2">
                    <div className="alert alert-dark d-flex justify-content-center flex-column w-auto" role="alert">
                        <p className="fs-5 text-center">
                            Selamat Datang, {localStorage.getItem("nama")} - {localStorage.getItem("nip")}
                        </p>
                        <div className='d-flex justify-content-center gap-3'>
                            <Badge pill bg="success" style={{  cursor: "pointer" }} onClick={() => absen("checkin")}>
                                Checkin
                            </Badge>
                            <Badge pill bg="danger" style={{  cursor: "pointer" }} onClick={() => absen("checkout")}>
                                Checkout
                            </Badge>
                        </div>
                        <span className="text-muted text-center mt-2" style={{ fontSize: 12 }}>*Anda hanya bisa Absen (Checkin & Checkout) 1 Kali dalam 1 Hari </span>
                    </div>
                </div>
                <h2 className="display-6 text-center mb-4">History Absensi</h2>
                <Table striped className='text-center'>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>NIP</th>
                        <th>Status</th>
                        <th>Waktu Absen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            absensiList.map((absensi, i) => {
                                const {users_nip, status, createdAt} = absensi       
                                return (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{users_nip}</td>
                                        <td>{status}</td>
                                        <td>{FormatTime(createdAt)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                    <div className="row">
                        <div className="text-center">
                            <small className="d-block mb-3 text-muted">
                                &copy; Copyright <span className="fw-bold text-black">Marzuki</span> 2022
                            </small>
                        </div>
                    </div>
                </footer>
            </main>
            {showToast && (<AlertToast show={showToast} msg={msgToast} status={statusToast} handleToast={handleToast}></AlertToast>)}
        </Container>
    )
}

export default Dashboard