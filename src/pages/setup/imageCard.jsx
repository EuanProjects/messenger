function ImageCard({ imageUrl, handleImageClick }) {
    return (
        <button
            className="h-48 w-48 bg-highlighted-grey rounded-lg bg-cover shadow-sm"
            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
            onClick={() => handleImageClick(imageUrl)}
            aria-label="Image Card"
        >
        </button>
    );
}

export default ImageCard;
