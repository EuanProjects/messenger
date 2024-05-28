function Message({message, index}) {
    return (
        <>
            <div>
                {messages.map((message, index) => (
                    <>
                        <div key={`${date}-${index}`} className="rounded-full bg-highlighted-grey w-3/4 my-3 py-2 px-3">
                            {message.text}
                        </div>
                        {index === messages.length - 1 && (
                            <div>grouped</div>
                        )}
                    </>
                ))}
            </div>
        </>
    )
}

export default Message;