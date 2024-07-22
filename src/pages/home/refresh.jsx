import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Refresh() {
    const navigate = useNavigate();
    const {profileId , chatId} = useParams();
    
    useEffect(() => {
        navigate(`/home/profile/${profileId}/chats/${chatId}`)
    })

    return (
        <>
            <div className="hidden order-3  md:grid bg-grey w-full h-full rounded-lg place-items-center shadow-lg">
            </div>
        </>
    )
}

export default Refresh