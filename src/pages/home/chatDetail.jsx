import { useParams } from "react-router-dom";

function ChatDetail() {
    const { chatId } = useParams();
    return (
        <>
            <div className="hidden order-3 md:grid bg-grey w-full h-full rounded-lg place-items-center shadow-lg">
                <div>
                    <h3 className="text-white text-center text-4xl font-bold text-wrap">{chatId}</h3> {/* Display chatId */}
                </div>
            </div>
        </>
    );
}

export default ChatDetail;
