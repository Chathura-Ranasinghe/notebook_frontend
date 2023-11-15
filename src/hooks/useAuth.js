import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isTeacher = false
    let isAdmin = false
    let status = "Student"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isTeacher = roles.includes('Teacher')
        isAdmin = roles.includes('Admin')

        if (isTeacher) status = "Teacher"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isTeacher, isAdmin }
    }

    return { username: '', roles: [], isTeacher, isAdmin, status }
}
export default useAuth