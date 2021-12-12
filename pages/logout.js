import React, {useEffect} from 'react'

export default function Logout() {
    useEffect(() => {
        window.localStorage.removeItem("weilai_data");
        window.localStorage.removeItem("weilai_user");
        window.location.replace("/");
    }, [])
    return (
        <div>
            Loging out...
        </div>
    )
}
