import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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
  
  // Function to redirect to auth page for printed book ordering
  const redirectToAuth = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="h-full">
      <div className={`${bgColorClass} rounded-xl overflow-hidden shadow-md h-full flex flex-col`}>
        {/* Book cover with GIF thumbnail */}
        <div className="relative flex items-center justify-center w-full aspect-square overflow-hidden">
          {/* Colored background */}
          <div className={`absolute inset-0 ${getTitleBgClass()}`}></div>
          
          {/* Try to load GIF Thumbnail first */}
          <img 
            src={bookId === '3' ? `/api/direct/content/icons/VISUAL 3 .gif` : `/api/direct/content/icons/VISUAL ${bookId}.gif`} 
            alt={`Book ${formattedBookId}`}
            className="w-full h-full object-cover z-10 relative"
            style={{objectFit: "cover", padding: "0px"}}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Try to load alternative thumbnail format
              const parent = target.parentElement;
              if (parent) {
                // Add PNG thumbnail as alternative
                const pngImg = document.createElement('img');
                pngImg.src = `/api/direct/content/book${bookId}/icons/thumbnailsuni${bookId}-1.png`;
                pngImg.alt = `Book ${formattedBookId}`;
                pngImg.className = "w-full h-full object-cover z-10 relative";
                pngImg.style.objectFit = "cover";
                pngImg.style.padding = "0px";
                pngImg.onerror = () => {
                  pngImg.style.display = 'none';
                  // Finally use the fallback if all else fails
                  const fallback = parent.querySelector('.fallback-content');
                  if (fallback) {
                    (fallback as HTMLElement).style.display = 'flex';
                  }
                };
                parent.insertBefore(pngImg, target.nextSibling);
              }
            }}
          />
          
          {/* Fallback content if GIF fails to load */}
          <div className="fallback-content absolute inset-0 flex-col items-center justify-center text-white hidden">
            <div className="text-5xl font-black">{formattedBookId}</div>
            <div className="text-xs uppercase tracking-wider font-medium px-3 text-center mt-1">{title}</div>
            
            {/* Visual design elements */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-white opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-white opacity-10"></div>
            
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-white opacity-20"></div>
          </div>
        </div>
        
        <div className="p-3 text-center flex-grow flex flex-col bg-white">
          <h3 className={`font-bold text-sm ${textColorClass}`}>VISUAL ENGLISH</h3>
          <p className={`${subTextColorClass} text-xs font-medium mb-2`}>BOOK {formattedBookId}</p>
          <div className="mt-auto space-y-2">
            <Link href={`/books/${bookId}`} className="block w-full">
              <button className={`w-full ${bookId === '1' ? 'text-gray-900' : 'text-white'} py-2 px-3 rounded-md font-medium text-xs shadow-sm flex items-center justify-center gap-1`} style={{ 
                backgroundColor: bookId === '0a' ? '#FF40FF' :  // Pink
                               bookId === '0b' ? '#FF7F27' :  // Orange
                               bookId === '0c' ? '#00CEDD' :  // Teal
                               bookId === '1' ? '#FFFF00' :  // Yellow
                               bookId === '2' ? '#9966CC' :  // Purple
                               bookId === '3' ? '#00CC00' :  // Green
                               bookId === '4' ? '#5DADEC' :  // Blue
                               bookId === '5' ? '#00CC66' :  // Green
                               bookId === '6' ? '#FF0000' :  // Red
                               bookId === '7' ? '#00FF00' :  // Bright Green
                              '#5DADEC'  // Default blue
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                View Book
              </button>
            </Link>
            <Link href="/auth" className="block w-full">
              <button 
                className="w-full text-white py-2 px-3 rounded-md font-medium text-xs shadow-sm flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700"
              >
                <ShoppingBag className="h-3 w-3" />
                Order Printed Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookThumbnail;