import { useState } from "react"
import { MessageSquare } from "react-feather"
import { Link, useNavigate } from "react-router-dom"

function Create() {
    const API_URL = import.meta.env.VITE_API_URL
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/profile`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const data = await response;
            if (data.ok) {
                alert("Profile created! Log in with your new account");
                navigate("/");
            } else {
                alert("Username already exists!");
                setUsernameError("Username already exists");
            }


        } catch (error) {
            alert("Profile ")
            console.error("Error creating acccount: ", error);
        }
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center place-items-center">
            <div className="flex place-items-center gap-4">
                <h1 className="text-5xl text-deep-purple font-bold mb-2">Messenger</h1>
                <MessageSquare className="stroke-deep-purple fill-deep-purple" size={48} />
            </div>
            <form className="h-[390px] w-[318px] bg-grey rounded-lg shadow-lg p-4 flex flex-col place-items-center"
                onSubmit={handleSubmit}>
                <legend className="text-white text-center text-2xl mb-2 font-bold">Create Account</legend>
                <p className="text-white grid mb-1">
                    <label className="mr-4" htmlFor="">Username</label>
                    <input type="text" className="w-[250px] text-dark-grey px-2" value={username} onChange={e => setUsername(e.target.value)}/>
                    <span className="text-red-500">{usernameError}</span>
                </p>
                <p className="text-white my-2 grid mb-1">
                    <label className="mr-4" htmlFor="" >Password</label>
                    <input type="text" className="w-[250px] text-dark-grey px-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </p>
                <p className="text-white my-2 grid mb-6">
                    <label className="mr-4" htmlFor="" >Confirm Password</label>
                    <input type="text" className="w-[250px] text-dark-grey px-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </p>
                <div className="grid justify-center gap-2 mb-4 text-white">
                    <button className="rounded-lg bg-deep-purple w-[250px] h-[50px] shadow-sm" type="sumbit">Submit </button>
                </div>
                <div className="text-white">
                    Already have an account? <Link to="/" className="underline">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Create