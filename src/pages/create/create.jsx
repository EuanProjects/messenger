import { useState } from "react"
import { MessageSquare } from "react-feather"
import { Link, useNavigate } from "react-router-dom"

function Create() {
    const API_URL = import.meta.env.VITE_API_URL
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/profile`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center place-items-center">
            <div className="flex place-items-center gap-4">
                <h1 className="text-5xl text-deep-purple font-bold mb-2">Messenger</h1>
                <MessageSquare className="stroke-deep-purple" size={48} />
            </div>
            <form className="h-[390px] w-[318px] bg-grey rounded-lg shadow-lg p-4 flex flex-col place-items-center relative"
                onSubmit={handleSubmit}>
                <legend className="text-white text-center text-2xl mb-2 font-bold">Create Account</legend>
                <div className="text-white grid my-2">
                    <label className="mr-4" htmlFor="">Username</label>
                    <input type="text" className="w-[250px] text-dark-grey px-2" value={username} onChange={e => setUsername(e.target.value)} />
                    <span className="text-red-500">{usernameError}</span>
                </div>
                <div className="relative grid mb-4">
                    <label className="mr-4 text-white" htmlFor="" >Password</label>
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        className="w-[250px] px-2 text-dark-grey"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform"
                    >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="grid justify-center gap-2 mb-4 text-white absolute bottom-28">
                    <button className="rounded-lg bg-deep-purple w-[250px] h-[50px] shadow-sm" type="sumbit">Submit </button>
                </div>
                <div className="text-white absolute bottom-20">
                    Already have an account? <Link to="/" className="underline">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Create