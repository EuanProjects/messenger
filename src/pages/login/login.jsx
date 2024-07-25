import { useEffect, useState } from "react"
import { MessageSquare } from "react-feather"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function authorizeUser() {
            const token = localStorage.getItem("token");
            if (token) {
                const getUserResponse = await fetch(`${API_URL}/profile`, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (getUserResponse.ok) {
                    const user = await getUserResponse.json();
                    if (user.setup) {
                        navigate(`/home/profile/${user.profileId}/chats`);
                    } else {
                        navigate(`/profile/${user.profileId}/setup`);
                    }
                }
            }
        }

        authorizeUser();
    }, [API_URL, navigate])

    async function handleLoginSubmit(e) {
        e.preventDefault();
        let loginBody;
        try {
            if (e.nativeEvent.submitter.name === "login") {
                loginBody = {
                    username,
                    password
                }
            } else {
                loginBody = {
                    username: "demo",
                    password: "demo"
                }
            }

            console.log(loginBody);
            const response = await fetch(`${API_URL}/login/`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginBody)
            });

            const data = await response.json();
            if (!response.ok) {
                setMessage(data.message);
            } else {
                localStorage.setItem('token', data.token);
                if (data.setup) {
                    navigate(`/home/profile/${data.profileId}/chats`);
                } else {
                    navigate(`/profile/${data.profileId}/setup`);
                }
            }
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };



    return (
        <div className="w-screen h-screen flex flex-col justify-center place-items-center">
            <div className="flex place-items-center gap-4">
                <h1 className="text-5xl text-deep-purple font-bold  mb-2">Messenger</h1>
                <MessageSquare className="stroke-deep-purple" size={48} />
            </div>
            <form className="h-[390px] w-[318px] bg-grey rounded-lg shadow-lg p-4 flex flex-col place-items-center"
                onSubmit={handleLoginSubmit}>
                <legend className="text-white text-center text-2xl mb-2 font-bold">Login</legend>
                <span className="text-red-500">{message}</span>
                <div className="text-white grid mb-1">
                    <label className="mr-4" htmlFor="">Username</label>
                    <input type="text" className="w-[250px] px-2 text-dark-grey" onChange={(e) => setUsername(e.target.value)} />
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
                <div className="grid justify-center gap-2 mb-4 text-white">
                    <button className="rounded-lg bg-deep-purple w-[250px] h-[50px] shadow-sm mb-2" type="sumbit" name="login">Login</button>
                    <button className="rounded-lg bg-deep-purple w-[250px] h-[50px] shadow-sm" type="sumbit" name="demo">Demo User</button>
                </div>
                <div className="text-white">
                    New to messenger? <Link to="/createaccount" className="underline">Create an Account</Link>
                </div>
            </form>
        </div>
    )
}

export default Login