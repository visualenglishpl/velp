import { Link } from "wouter";

interface BookThumbnailProps {
  bookId: string;
  title: string;
  color: string;
  bgColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}

const BookThumbnail = ({ 
  bookId, 
  title, 
  color, 
  bgColor, 
  buttonColor, 
  buttonHoverColor 
}: BookThumbnailProps) => {
  // Format the book ID for display (e.g., "0a" -> "0A", "1" -> "1")
  const formattedBookId = bookId.includes('0') 
    ? bookId.replace(/^0([a-c])$/, "0$1").toUpperCase() 
    : bookId;

  // Determine color classes based on provided parameters
  const bgColorClass = `bg-${bgColor}-100`;
  const textColorClass = `text-${color}-800`;
  const subTextColorClass = `text-${color}-700`;
  const buttonColorClass = `bg-${buttonColor}-600 hover:bg-${buttonHoverColor}-700`;
  
  return (
    <div className="">
      <div className={`${bgColorClass} rounded-xl overflow-hidden shadow-md`}>
        <div className="relative">
          {/* Book cover image */}
          <img 
            src={`/api/content/book${bookId}/cover.png`} 
            alt={`Book ${formattedBookId}`} 
            className="w-full h-auto" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `/api/content/book${bookId}/icons/thumbnailsuni${bookId}-1.png`;
            }}
          />
          
          {/* GIF icon overlay */}
          <div className="absolute top-2 right-2 w-12 h-12">
            <img
              src={`/api/content/icons/VISUAL ${bookId}.gif`}
              alt="Book Icon"
              className="w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/api/content/icons/VISUAL 1.gif`;
              }}
            />
          </div>
        </div>
        
        <div className="p-4 text-center">
          <h3 className={`font-extrabold ${textColorClass}`}>VISUAL ENGLISH</h3>
          <p className={`${subTextColorClass} font-medium`}>BOOK {formattedBookId}</p>
          <Link href={`/books/${bookId}`}>
            <button className={`mt-3 w-full ${buttonColorClass} text-white py-2 px-4 rounded-md font-extrabold text-sm shadow-md`}>
              View Units
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookThumbnail;