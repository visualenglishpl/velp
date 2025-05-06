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
  
  // Get a deeper color variant for title backgrounds
  const getTitleBgClass = () => {
    if (bookId === '0a') return 'bg-blue-600';
    if (bookId === '0b') return 'bg-orange-600';
    if (bookId === '0c') return 'bg-amber-600';
    if (bookId === '1') return 'bg-green-600';
    if (bookId === '2') return 'bg-blue-600';
    if (bookId === '3') return 'bg-lime-600';
    if (bookId === '4') return 'bg-purple-600';
    if (bookId === '5') return 'bg-red-600';
    if (bookId === '6') return 'bg-purple-600';
    if (bookId === '7') return 'bg-gray-600';
    return 'bg-blue-600';
  };

  return (
    <div className="h-full">
      <div className={`${bgColorClass} rounded-xl overflow-hidden shadow-lg h-full flex flex-col`}>
        {/* Custom designed book cover */}
        <div className={`relative ${getTitleBgClass()} flex items-center justify-center h-48 overflow-hidden`}>
          {/* Book ID and title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-6xl font-black mb-1">{formattedBookId}</div>
            <div className="text-sm uppercase tracking-wider font-medium px-4 text-center">{title}</div>
          </div>
          
          {/* Visual design elements */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-white opacity-10"></div>
          
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white opacity-20"></div>
        </div>
        
        <div className="p-4 text-center flex-grow flex flex-col bg-white">
          <h3 className={`font-extrabold ${textColorClass}`}>VISUAL ENGLISH</h3>
          <p className={`${subTextColorClass} font-medium mb-3`}>BOOK {formattedBookId}</p>
          <div className="mt-auto">
            <Link href={`/books/${bookId}`} className="block w-full">
              <button className={`w-full ${buttonColorClass} ${bookId === '5' ? 'text-red-700 border border-red-300' : 'text-white'} py-3 px-4 rounded-md font-extrabold text-sm shadow-md`}>
                View Units
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookThumbnail;