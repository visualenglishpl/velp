import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import S3ConnectivityTest from '@/components/diagnostics/S3ConnectivityTest';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Book, FileSearch, ArrowLeft, ExternalLink, Home, Settings, Server } from 'lucide-react';

export default function DevToolsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Tools</h1>
            <p className="text-gray-600 mt-2">Testing and diagnostic tools for the Visual English platform</p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home size={16} />
                Home
              </Button>
            </Link>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Content Viewers Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-blue-600" />
                <CardTitle>Content Viewers</CardTitle>
              </div>
              <CardDescription>
                Different ways to access and test the content viewer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <a href="/book/book1/unit/1" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-between">
                    <span>Original Book Viewer</span>
                    <ExternalLink size={16} />
                  </Button>
                </a>
                
                <Link href="/viewer-test/book1/unit1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Viewer Test Page
                  </Button>
                </Link>
                
                <Link href="/standalone-viewer/book1/1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Standalone Viewer (No Auth)
                  </Button>
                </Link>
                
                <Link href="/simple-viewer">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Simple Viewer
                  </Button>
                </Link>
                
                <div className="text-xs text-gray-500 mt-2">
                  Use these tools to test different book viewing experiences.
                  The standalone viewer works without authentication.
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Book/Unit Selector */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-teal-600" />
                <CardTitle>Quick Book Access</CardTitle>
              </div>
              <CardDescription>
                Directly access specific books and units
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/standalone-viewer/book1/1">
                  <Button className="w-full" variant="outline">Book 1, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book2/1">
                  <Button className="w-full" variant="outline">Book 2, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book3/1">
                  <Button className="w-full" variant="outline">Book 3, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book4/1">
                  <Button className="w-full" variant="outline">Book 4, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book5/1">
                  <Button className="w-full" variant="outline">Book 5, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book6/1">
                  <Button className="w-full" variant="outline">Book 6, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book0a/1">
                  <Button className="w-full" variant="outline">Book 0a, Unit 1</Button>
                </Link>
                <Link href="/standalone-viewer/book0b/1">
                  <Button className="w-full" variant="outline">Book 0b, Unit 1</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-orange-600" />
                <CardTitle>S3 Connectivity Test</CardTitle>
              </div>
              <CardDescription>
                Test connectivity to the S3 bucket and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <S3ConnectivityTest />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}