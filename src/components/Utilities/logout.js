
export const handleLogout = (navigate, msg) => {
    localStorage.clear()
    navigate('/login', msg)
}