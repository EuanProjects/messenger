import { ChevronLeft, ChevronRight, MessageSquare } from "react-feather"
import { Link, useParams } from "react-router-dom"
import images from "./images";
import { useState } from "react";
import "./styles/tutorial.css"

function Tutorial() {
    const profileId = useParams().profileId;
    const [slide, setSlide] = useState(0);

    function handleRightButtonClick() {
        setSlide((slide + 1) % images.length);
    }

    function handleLeftButtonClick() {
        setSlide((slide - 1 + images.length) % images.length);

    }


    return (
        <div className="w-screen h-screen flex flex-col justify-center place-items-center">
            <div className="flex place-items-center gap-4">
                <h1 className="text-5xl text-deep-purple font-bold  mb-2">Messenger</h1>
                <MessageSquare className="stroke-deep-purple" size={48} />
            </div>
            <h2 className="text-white text:md md:text-2xl text-center">Welcome to the Messenger tutorial!</h2>
            <p className="text-center text-white mt-4 text-xl md:text-3xl max-w-[1080px]">{images[slide].instruction}</p>
            <div className="tutorial-grid max-w-[1080px] h-screen w-full bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url(${images[slide].url})` }} >
                <div className="grid place-items-center"
                    onClick={() => handleLeftButtonClick()}>
                    <button className="rounded-full bg-deep-purple"><ChevronLeft className="stroke-white" /></button>
                </div>
                <div className="w-full">

                </div>
                <div className="grid place-items-center">
                    <button 
                        className="rounded-full bg-deep-purple"
                        onClick={() => handleRightButtonClick()}><ChevronRight className="stroke-white" /></button>
                </div>
            </div>
            <Link to={`/home/profile/${profileId}/chats`} className="my-4 bg-deep-purple rounded-lg w-36 h-12 text-center text-white grid place-items-center">
                    <span>{slide === images.length - 1 ? "Done" : "Skip"}</span>
            </Link>
        </div>
    )
}

export default Tutorial