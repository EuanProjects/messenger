function EmptyChat() {
    return (
        <>
            <div className="hidden order-3  md:grid bg-grey w-full h-full rounded-lg place-items-center shadow-lg">
                <div>
                    <h3 className="text-white text-center text-4xl font-bold text-wrap">Click on a friend to start a message!</h3>
                </div>
            </div>
        </>
    )
}

export default EmptyChat