import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { Plus } from "react-feather";
import "../home/styles/settings.css"
import ImageCard from "./imageCard";
import images from "./images";

function Setup() {
    const API_URL = import.meta.env.VITE_API_URL
    const { profileId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const [displayImages, setDisplayImage] = useState("");


    async function handleSaveProfile(e) {
        e.preventDefault()
        const update = {
            name,
            picture: profilePicture,
            setup: true
        }
        try {
            const response = await fetch(`${API_URL}/profile/${profileId}`,
                {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(update)
                }
            )
            if (!response.ok) {
                navigate("/");
            }

            const data = await response.json();
            navigate(`/home/profile/${profileId}/chats`);
        } catch (error) {
            console.error("Error saving profile: ", error);
        }
    }

    function handleDisplayImages() {
        setDisplayImage(!displayImages);
    }

    function handleImageClick(imageLink) {
        setProfilePicture(imageLink);
        handleDisplayImages();
    }

    return (
        <>
            <div className="w-screen h-screen p-16
             flex flex-col justify-center items-center">
                <h1 className="text-5xl text-white font-bold">Profile Setup</h1>
                <form onSubmit={handleSaveProfile} className="h-[390px] w-[318px] rounded-lg shadow-lg bg-highlighted-grey p-4">
                    <fieldset className="grid mb-4 place-items-center">
                        <button
                            className={`rounded-full h-36 w-36 grid place-items-center bg-cover ${!profilePicture ? "bg-white" : ""}`}
                            style={{ backgroundImage: profileId !== "" ? `url(${profilePicture})` : 'none' }}
                            type="button"
                            onClick={handleDisplayImages}
                        >

                            <Plus />
                        </button>
                    </fieldset>
                    <fieldset className="mt-4">
                        <label className="mr-4 text-white" htmlFor="">Name (displayed in chat)</label>
                        <input type="text" className="h-6 w-full px-2 rounded-md text-dark-grey" onChange={(e) => setName(e.target.value)} />
                    </fieldset>
                    <div className="w-full mt-4"><button className="bg-deep-purple rounded-lg w-full h-12" type="submit">Save</button></div>
                </form>
            </div>
            {
                displayImages &&
                <div className="h-screen w-screen grid place-items-center shadow-sm bg-black/70 absolute top-0 left-0" onClick={handleDisplayImages}>
                    <div className="settings-grid relative h-[390px] w-[318px] rounded-lg bg-grey opacity-100" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3">
                            <h2 className="text-white text-center">Choose Profile Picture</h2>
                            <button className="absolute top-0 right-0 bg-highlighted-grey rounded-full h-6 w-6 text-white m-3"
                                onClick={handleDisplayImages}>X</button>
                        </div>
                        <div className="overflow-y-auto grid grid-cols-2 place-items-center gap-2 p-4">
                            {
                                images.map((url) => (
                                    <ImageCard imageUrl={url} handleImageClick={handleImageClick} />
                                ))
                            }
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-white p-3">
                            <button className="bg-highlighted-grey rounded-lg" onClick={handleDisplayImages}>
                                Cancel
                            </button>
                            <button className="bg-highlighted-grey rounded-lg" onClick={() => { handleDisplayImages }}>
                                Confirm
                            </button>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Setup