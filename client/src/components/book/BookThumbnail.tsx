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

  // Define color classes based on bookId for consistent styling
  let bgColorClass;
  let textColorClass;
  let subTextColorClass;
  let buttonColorClass;
  
  // Color mapping based on bookId
  switch (bookId) {
    case '0a':
      bgColorClass = 'bg-blue-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-blue-700';
      buttonColorClass = 'bg-blue-600';
      break;
    case '0b':
      bgColorClass = 'bg-orange-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-orange-700';
      buttonColorClass = 'bg-orange-600';
      break;
    case '0c':
      bgColorClass = 'bg-amber-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-amber-700';
      buttonColorClass = 'bg-amber-600';
      break;
    case '1':
      bgColorClass = 'bg-green-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-green-700';
      buttonColorClass = 'bg-green-600';
      break;
    case '2':
      bgColorClass = 'bg-blue-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-blue-700';
      buttonColorClass = 'bg-blue-600';
      break;
    case '3':
      bgColorClass = 'bg-lime-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-lime-700';
      buttonColorClass = 'bg-lime-600';
      break;
    case '4':
      bgColorClass = 'bg-purple-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-purple-700';
      buttonColorClass = 'bg-purple-600';
      break;
    case '5':
      bgColorClass = 'bg-pink-200';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-red-700';
      buttonColorClass = 'bg-white';
      break;
    case '6':
      bgColorClass = 'bg-purple-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-purple-700';
      buttonColorClass = 'bg-purple-600';
      break;
    case '7':
      bgColorClass = 'bg-gray-100';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-gray-700';
      buttonColorClass = 'bg-red-600';
      break;
    default:
      bgColorClass = 'bg-white';
      textColorClass = 'text-gray-900';
      subTextColorClass = 'text-gray-700';
      buttonColorClass = 'bg-blue-600';
  }
  
  return (
    <div className="">
      <div className={`${bgColorClass} rounded-xl overflow-hidden shadow-md`}>
        <div>
          {/* Book cover image */}
          <img 
            src={`/api/direct/content/book${bookId}/cover.png`} 
            alt={`Book ${formattedBookId}`} 
            className="w-full h-auto" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Fallback to static cover if GIFs aren't available
              console.log(`Falling back to regular cover for book ${bookId}`);
            }}
          />
        </div>
        
        <div className="p-4 text-center">
          <h3 className={`font-extrabold ${textColorClass}`}>VISUAL ENGLISH</h3>
          <p className={`${subTextColorClass} font-medium`}>BOOK {formattedBookId}</p>
          <Link href={`/books/${bookId}`}>
            <button className={`mt-3 w-full ${buttonColorClass} ${bookId === '5' ? 'text-red-700 border border-red-300' : 'text-white'} py-2 px-4 rounded-md font-extrabold text-sm shadow-md`}>
              View Units
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookThumbnail;