import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

const AdminBooks = () => {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  if (!user || user.role !== "admin") {
    navigate("/auth");
    return null;
  }

  // Define the book data with S3 thumbnail paths
  const books = [
    { id: '0a', title: 'Book 0a', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_0a.gif' },
    { id: '0b', title: 'Book 0b', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_0b.gif' },
    { id: '0c', title: 'Book 0c', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_0c.gif' },
    { id: '1', title: 'Book 1', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_1.gif' },
    { id: '2', title: 'Book 2', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_2.gif' },
    { id: '3', title: 'Book 3', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_3.gif' },
    { id: '4', title: 'Book 4', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_4.gif' },
    { id: '5', title: 'Book 5', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_5.gif' },
    { id: '6', title: 'Book 6', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_6.gif' },
    { id: '7', title: 'Book 7', thumbnail: 'https://s3.amazonaws.com/visualenglishmaterial/icons/book_7.gif' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" onClick={() => navigate("/admin")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-gray-500 mx-2 text-sm">{'>'}</span>
              <span className="text-sm">Books</span>
            </div>
          </div>
          <div className="w-72">
            <Input type="text" placeholder="Search..." className="w-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-md shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                {/* S3 thumbnail image */}
                <img 
                  src={book.thumbnail} 
                  alt={`${book.title} thumbnail`} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback in case image fails to load
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-center">{book.title}</h3>
                <Button variant="secondary" className="w-full mt-3 bg-gray-900 text-white hover:bg-gray-800">
                  View Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;