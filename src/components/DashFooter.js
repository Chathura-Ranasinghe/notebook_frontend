import useAuth from "../hooks/useAuth"

const DashFooter = () => {

    const { username, status } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <footer className="dash-footer">

        <   p className='date_time'>{today}</p>

            <div className="user_data">
                <p>Current User: <span>{username}</span></p>
                <p>Status: <span>{status}</span></p>
            </div>

        </footer>
    )
    return content
}
export default DashFooter