function ImageCard({ imageUrl, handleImageClick }) {
    return (
        <button
            className="h-24 w-24 bg-highlighted-grey rounded-lg bg-cover shadow-sm"
            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
            onClick={() => handleImageClick(imageUrl)}
            aria-label="Image Card"
        >
        </button>
    );
}

export default ImageCard;
