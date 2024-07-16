import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

function Setup() {
    /*
        getId from the url
            update the profile with name
    */
   const API_URL = import.meta.env.VITE_API_URL
   const { profileId } = useParams();
   const [name, setName] = useState("");
   const navigate = useNavigate();


   async function handleSaveProfile(e) {
    e.preventDefault()
    const update = {
        name,
        setup: true
    }
    try {
        const response = await fetch(`http://${API_URL}/profile/${profileId}`,
            {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            }
        )
        const data = await response.json();
        navigate(`/home/profile/${profileId}/chats`);
    } catch (error) {
        console.error("Error saving profile: ", error);
    }
   }


    return (
        <>
            <div className="w-screen h-screen p-16
             flex flex-col justify-center items-center">
                <h1 className="text-4xl text-white font-bold">Profile Setup</h1>
                <form onSubmit={handleSaveProfile} className="w-1/4 h-1/8 rounded-lg shadow-lg bg-highlighted-grey p-4">
                    <fieldset className="grid mb-4 place-items-center">
                        <div className="rounded-full bg-white h-36 w-36">
                        </div>
                    </fieldset>
                    <fieldset className="mt-4">
                        <label className="mr-4 text-white" htmlFor="">Name</label>
                        <input type="text" className="h-6 w-full px-2 rounded-md text-dark-grey" onChange={(e) => setName(e.target.value)} />
                    </fieldset>
                    <div className="w-full mt-4"><button className="bg-deep-purple rounded-lg w-full h-12" type="submit">Save</button></div>
                </form>

            </div>
        </>
    )
}

export default Setup