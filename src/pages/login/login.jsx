import { MessageSquare } from "react-feather"
import { Link } from "react-router-dom"

function Login() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center place-items-center">
            <div className="flex place-items-center gap-4">
                <h1 className="text-5xl text-deep-purple font-bold  mb-2">Messenger</h1>
                <MessageSquare className="stroke-deep-purple fill-deep-purple" size={48}/>
            </div>
            <form className="w-1/4 h-1/2 max-h-[350px] max-w-[318px] bg-grey rounded-lg shadow-lg p-4 flex flex-col place-items-center"> 
                <legend className="text-white text-center text-2xl mb-2 font-bold">Login</legend>
                <p className="text-white grid mb-1">
                    <label className="mr-4" htmlFor="">Username</label>
                    <input type="text" className="w-[250px]"/>
                </p>
                <p className="text-white my-2 grid mb-6">
                    <label className="mr-4" htmlFor="" >Password</label>
                    <input type="text" className="w-[250px]"/>
                </p>
                <div className="grid justify-center gap-2 mb-4 text-white">
                    <button className="rounded-lg bg-deep-purple w-[250px] h-[50px] shadow-sm mb-2" type="sumbit">Login</button>
                    <button className="rounded-lg bg-deep-purple w-[250px] h-[50px] shadow-sm" type="sumbit">Demo User</button>
                </div>
                <div className="text-white">
                    New to messenger? <Link to="/createaccount" className="underline">Create an Account</Link>
                </div>
            </form>
        </div>
    )
}

export default Login