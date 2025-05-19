import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Package,
  Download,
  Clock,
  Calendar,
  Search,
  User,
  Settings,
  Edit,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Filter,
  ShoppingCart,
  BookOpen,
  PlusCircle,
  CalendarPlus
} from "lucide-react";

// Define types
type ProductType = 'ebook' | 'lesson_plan' | 'worksheet' | 'activity' | 'full_book';

type DigitalProduct = {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  price: number;
  currency: string;
  downloadLimit: number;
  hasExpiryDate: boolean;
  defaultExpiryDays: number | null;
  totalSold: number;
  activeUserCount: number;
  expiredUserCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  fileSize?: string;
  fileType?: string;
};

type UserLicense = {
  id: string;
  userId: string;
  username: string;
  userEmail: string;
  productId: string;
  productName: string;
  purchaseDate: string;
  expiryDate: string | null;
  isActive: boolean;
  isExpired: boolean;
  remainingDownloads: number;
  totalDownloads: number;
  lastDownloadDate: string | null;
  lastDownloadIp: string | null;
  notes: string | null;
  transactionId: string;
};

type DownloadRecord = {
  id: string;
  userId: string;
  username: string;
  productId: string;
  productName: string;
  downloadDate: string;
  ipAddress: string;
  deviceInfo: string;
  licenseId: string;
  status: 'success' | 'failed' | 'blocked';
  failureReason?: string;
};

const DigitalInventoryPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State for data
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [licenses, setLicenses] = useState<UserLicense[]>([]);
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<UserLicense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for UI
  const [activeTab, setActiveTab] = useState<string>("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState<string | null>(null);
  const [expiryFilter, setExpiryFilter] = useState<string | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isLicenseDialogOpen, setIsLicenseDialogOpen] = useState(false);
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form states
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState<ProductType>("ebook");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productCurrency, setProductCurrency] = useState("EUR");
  const [downloadLimit, setDownloadLimit] = useState<number>(3);
  const [hasExpiryDate, setHasExpiryDate] = useState(false);
  const [expiryDays, setExpiryDays] = useState<number | null>(null);
  
  // Extension form states
  const [extensionDays, setExtensionDays] = useState<number>(30);
  const [additionalDownloads, setAdditionalDownloads] = useState<number>(0);
  const [extensionNote, setExtensionNote] = useState("");
  
  // Load data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, these would be API calls
        // const productsResponse = await fetch('/api/admin/digital-products');
        // const licensesResponse = await fetch('/api/admin/user-licenses');
        // const downloadsResponse = await fetch('/api/admin/download-records');
        
        // Mock data for development
        const mockProducts: DigitalProduct[] = [
          {
            id: "prod_ebook_b1",
            name: "Visual English Book 1 - Digital Version",
            type: "ebook",
            description: "Complete digital version of Book 1 with all 18 units",
            price: 25,
            currency: "EUR",
            downloadLimit: 3,
            hasExpiryDate: true,
            defaultExpiryDays: 365,
            totalSold: 145,
            activeUserCount: 127,
            expiredUserCount: 18,
            createdAt: "2024-09-15T10:00:00Z",
            updatedAt: "2025-04-10T14:30:00Z",
            thumbnailUrl: "/images/products/book1-cover.jpg",
            fileSize: "210 MB",
            fileType: "PDF"
          },
          {
            id: "prod_ebook_b2",
            name: "Visual English Book 2 - Digital Version",
            type: "ebook",
            description: "Complete digital version of Book 2 with all 18 units",
            price: 25,
            currency: "EUR",
            downloadLimit: 3,
            hasExpiryDate: true,
            defaultExpiryDays: 365,
            totalSold: 118,
            activeUserCount: 112,
            expiredUserCount: 6,
            createdAt: "2024-09-15T10:15:00Z",
            updatedAt: "2025-04-10T14:35:00Z",
            thumbnailUrl: "/images/products/book2-cover.jpg",
            fileSize: "238 MB",
            fileType: "PDF"
          },
          {
            id: "prod_lesson_plan_b1u1",
            name: "Teacher Lesson Plan - Book 1 Unit 1",
            type: "lesson_plan",
            description: "Detailed teaching plan for Book 1 Unit 1",
            price: 5,
            currency: "EUR",
            downloadLimit: 5,
            hasExpiryDate: false,
            defaultExpiryDays: null,
            totalSold: 67,
            activeUserCount: 67,
            expiredUserCount: 0,
            createdAt: "2024-10-05T09:20:00Z",
            updatedAt: "2025-03-12T11:45:00Z",
            fileSize: "2.5 MB",
            fileType: "PDF"
          },
          {
            id: "prod_worksheet_b1u3",
            name: "Book 1 Unit 3 - Student Worksheets",
            type: "worksheet",
            description: "Printable worksheets for Book 1 Unit 3",
            price: 3.50,
            currency: "EUR",
            downloadLimit: 10,
            hasExpiryDate: false,
            defaultExpiryDays: null,
            totalSold: 83,
            activeUserCount: 83,
            expiredUserCount: 0,
            createdAt: "2024-10-10T14:45:00Z",
            updatedAt: "2025-02-20T09:30:00Z",
            fileSize: "1.8 MB",
            fileType: "PDF"
          },
          {
            id: "prod_activity_colors",
            name: "Interactive Colors Activity Pack",
            type: "activity",
            description: "Interactive activities focusing on colors vocabulary",
            price: 4.99,
            currency: "EUR",
            downloadLimit: 5,
            hasExpiryDate: true,
            defaultExpiryDays: 180,
            totalSold: 94,
            activeUserCount: 85,
            expiredUserCount: 9,
            createdAt: "2024-11-15T13:10:00Z",
            updatedAt: "2025-01-08T15:20:00Z",
            fileSize: "45 MB",
            fileType: "ZIP"
          },
          {
            id: "prod_full_book_teacher",
            name: "Complete Teacher Resource Pack - All Books",
            type: "full_book",
            description: "Complete set of teaching resources for all Visual English books",
            price: 99.99,
            currency: "EUR",
            downloadLimit: 5,
            hasExpiryDate: true,
            defaultExpiryDays: 730,
            totalSold: 32,
            activeUserCount: 31,
            expiredUserCount: 1,
            createdAt: "2024-09-15T10:30:00Z",
            updatedAt: "2025-04-18T09:45:00Z",
            fileSize: "1.2 GB",
            fileType: "ZIP"
          }
        ];
        
        const mockLicenses: UserLicense[] = [
          {
            id: "lic_1",
            userId: "user_1",
            username: "emma.johnson",
            userEmail: "emma.j@school.edu",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            purchaseDate: "2025-03-15T09:30:00Z",
            expiryDate: "2026-03-15T09:30:00Z",
            isActive: true,
            isExpired: false,
            remainingDownloads: 1,
            totalDownloads: 2,
            lastDownloadDate: "2025-05-10T14:30:00Z",
            lastDownloadIp: "192.168.1.105",
            notes: null,
            transactionId: "tx_1234567890"
          },
          {
            id: "lic_2",
            userId: "user_2",
            username: "michael.smith",
            userEmail: "m.smith@academy.edu",
            productId: "prod_ebook_b2",
            productName: "Visual English Book 2 - Digital Version",
            purchaseDate: "2025-02-20T11:45:00Z",
            expiryDate: "2026-02-20T11:45:00Z",
            isActive: true,
            isExpired: false,
            remainingDownloads: 2,
            totalDownloads: 1,
            lastDownloadDate: "2025-03-15T16:20:00Z",
            lastDownloadIp: "172.16.254.1",
            notes: null,
            transactionId: "tx_2345678901"
          },
          {
            id: "lic_3",
            userId: "user_3",
            username: "sarah.williams",
            userEmail: "s.williams@school.edu",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            purchaseDate: "2024-08-10T13:15:00Z",
            expiryDate: "2025-08-10T13:15:00Z",
            isActive: true,
            isExpired: false,
            remainingDownloads: 0,
            totalDownloads: 3,
            lastDownloadDate: "2025-05-11T10:30:00Z",
            lastDownloadIp: "85.203.12.45",
            notes: "Reached download limit",
            transactionId: "tx_3456789012"
          },
          {
            id: "lic_4",
            userId: "user_4",
            username: "robert.chen",
            userEmail: "r.chen@academy.edu",
            productId: "prod_lesson_plan_b1u1",
            productName: "Teacher Lesson Plan - Book 1 Unit 1",
            purchaseDate: "2025-04-05T09:20:00Z",
            expiryDate: null,
            isActive: true,
            isExpired: false,
            remainingDownloads: 3,
            totalDownloads: 2,
            lastDownloadDate: "2025-05-02T15:40:00Z",
            lastDownloadIp: "77.111.246.78",
            notes: null,
            transactionId: "tx_4567890123"
          },
          {
            id: "lic_5",
            userId: "user_5",
            username: "lisa.parker",
            userEmail: "l.parker@school.edu",
            productId: "prod_activity_colors",
            productName: "Interactive Colors Activity Pack",
            purchaseDate: "2024-12-01T14:30:00Z",
            expiryDate: "2025-06-01T14:30:00Z",
            isActive: true,
            isExpired: false,
            remainingDownloads: 2,
            totalDownloads: 3,
            lastDownloadDate: "2025-04-15T11:25:00Z",
            lastDownloadIp: "88.156.136.42",
            notes: null,
            transactionId: "tx_5678901234"
          },
          {
            id: "lic_6",
            userId: "user_6",
            username: "james.wilson",
            userEmail: "j.wilson@academy.edu",
            productId: "prod_full_book_teacher",
            productName: "Complete Teacher Resource Pack - All Books",
            purchaseDate: "2024-10-12T10:15:00Z",
            expiryDate: "2026-10-12T10:15:00Z",
            isActive: true,
            isExpired: false,
            remainingDownloads: 3,
            totalDownloads: 2,
            lastDownloadDate: "2025-03-20T09:40:00Z",
            lastDownloadIp: "91.227.43.84",
            notes: null,
            transactionId: "tx_6789012345"
          },
          {
            id: "lic_7",
            userId: "user_7",
            username: "david.thompson",
            userEmail: "d.thompson@school.edu",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            purchaseDate: "2024-05-15T11:30:00Z",
            expiryDate: "2025-05-15T11:30:00Z",
            isActive: false,
            isExpired: true,
            remainingDownloads: 0,
            totalDownloads: 3,
            lastDownloadDate: "2025-01-20T16:45:00Z",
            lastDownloadIp: "192.168.10.45",
            notes: "License expired",
            transactionId: "tx_7890123456"
          }
        ];
        
        const mockDownloads: DownloadRecord[] = [
          {
            id: "dl_1",
            userId: "user_1",
            username: "emma.johnson",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2025-03-16T10:30:00Z",
            ipAddress: "192.168.1.105",
            deviceInfo: "Windows / Chrome",
            licenseId: "lic_1",
            status: "success"
          },
          {
            id: "dl_2",
            userId: "user_1",
            username: "emma.johnson",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2025-05-10T14:30:00Z",
            ipAddress: "192.168.1.105",
            deviceInfo: "Windows / Chrome",
            licenseId: "lic_1",
            status: "success"
          },
          {
            id: "dl_3",
            userId: "user_2",
            username: "michael.smith",
            productId: "prod_ebook_b2",
            productName: "Visual English Book 2 - Digital Version",
            downloadDate: "2025-03-15T16:20:00Z",
            ipAddress: "172.16.254.1",
            deviceInfo: "iOS / Safari",
            licenseId: "lic_2",
            status: "success"
          },
          {
            id: "dl_4",
            userId: "user_3",
            username: "sarah.williams",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2024-09-12T11:45:00Z",
            ipAddress: "85.203.12.45",
            deviceInfo: "macOS / Safari",
            licenseId: "lic_3",
            status: "success"
          },
          {
            id: "dl_5",
            userId: "user_3",
            username: "sarah.williams",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2025-01-18T14:30:00Z",
            ipAddress: "85.203.12.45",
            deviceInfo: "macOS / Safari",
            licenseId: "lic_3",
            status: "success"
          },
          {
            id: "dl_6",
            userId: "user_3",
            username: "sarah.williams",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2025-05-11T10:30:00Z",
            ipAddress: "85.203.12.45",
            deviceInfo: "macOS / Safari",
            licenseId: "lic_3",
            status: "success"
          },
          {
            id: "dl_7",
            userId: "user_3",
            username: "sarah.williams",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2025-05-18T09:15:00Z",
            ipAddress: "85.203.12.45",
            deviceInfo: "macOS / Safari",
            licenseId: "lic_3",
            status: "blocked",
            failureReason: "Download limit reached"
          },
          {
            id: "dl_8",
            userId: "user_4",
            username: "robert.chen",
            productId: "prod_lesson_plan_b1u1",
            productName: "Teacher Lesson Plan - Book 1 Unit 1",
            downloadDate: "2025-04-10T12:20:00Z",
            ipAddress: "77.111.246.78",
            deviceInfo: "iOS / Chrome",
            licenseId: "lic_4",
            status: "success"
          },
          {
            id: "dl_9",
            userId: "user_4",
            username: "robert.chen",
            productId: "prod_lesson_plan_b1u1",
            productName: "Teacher Lesson Plan - Book 1 Unit 1",
            downloadDate: "2025-05-02T15:40:00Z",
            ipAddress: "77.111.246.78",
            deviceInfo: "iOS / Chrome",
            licenseId: "lic_4",
            status: "success"
          },
          {
            id: "dl_10",
            userId: "user_7",
            username: "david.thompson",
            productId: "prod_ebook_b1",
            productName: "Visual English Book 1 - Digital Version",
            downloadDate: "2025-05-16T11:30:00Z",
            ipAddress: "192.168.10.45",
            deviceInfo: "Windows / Edge",
            licenseId: "lic_7",
            status: "blocked",
            failureReason: "License expired"
          }
        ];
        
        setProducts(mockProducts);
        setLicenses(mockLicenses);
        setDownloads(mockDownloads);
      } catch (err) {
        console.error("Error fetching digital inventory data:", err);
        setError("Failed to load digital inventory data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter products
  const getFilteredProducts = () => {
    return products.filter(product => {
      // Filter by type
      if (productTypeFilter && product.type !== productTypeFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  // Filter licenses
  const getFilteredLicenses = () => {
    return licenses.filter(license => {
      // Filter by expiry
      if (expiryFilter) {
        if (expiryFilter === 'active' && !license.isActive) {
          return false;
        }
        if (expiryFilter === 'expired' && !license.isExpired) {
          return false;
        }
        if (expiryFilter === 'limitReached' && license.remainingDownloads > 0) {
          return false;
        }
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          license.username.toLowerCase().includes(query) ||
          license.userEmail.toLowerCase().includes(query) ||
          license.productName.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  // Filter downloads
  const getFilteredDownloads = () => {
    return downloads.filter(download => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          download.username.toLowerCase().includes(query) ||
          download.productName.toLowerCase().includes(query) ||
          download.ipAddress.includes(query)
        );
      }
      
      return true;
    }).sort((a, b) => new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime());
  };

  const filteredProducts = getFilteredProducts();
  const filteredLicenses = getFilteredLicenses();
  const filteredDownloads = getFilteredDownloads();

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate days left until expiry
  const calculateDaysLeft = (expiryDate: string | null) => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    
    // Set both dates to midnight for accurate day calculation
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Handle creating a new product
  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setProductName("");
    setProductType("ebook");
    setProductDescription("");
    setProductPrice(0);
    setProductCurrency("EUR");
    setDownloadLimit(3);
    setHasExpiryDate(false);
    setExpiryDays(null);
    setIsProductDialogOpen(true);
  };

  // Handle editing a product
  const handleEditProduct = (product: DigitalProduct) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setProductType(product.type);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setProductCurrency(product.currency);
    setDownloadLimit(product.downloadLimit);
    setHasExpiryDate(product.hasExpiryDate);
    setExpiryDays(product.defaultExpiryDays);
    setIsProductDialogOpen(true);
  };

  // Handle saving a product
  const handleSaveProduct = async () => {
    try {
      const isNew = !selectedProduct;
      
      // Prepare product data
      const productData = {
        name: productName,
        type: productType,
        description: productDescription,
        price: productPrice,
        currency: productCurrency,
        downloadLimit: downloadLimit,
        hasExpiryDate: hasExpiryDate,
        defaultExpiryDays: hasExpiryDate ? expiryDays : null
      };
      
      // In a real app, this would be an API call
      // const response = await fetch(
      //   isNew ? '/api/admin/digital-products' : `/api/admin/digital-products/${selectedProduct.id}`,
      //   {
      //     method: isNew ? 'POST' : 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(productData)
      //   }
      // );
      
      if (isNew) {
        // Create new product
        const newProduct: DigitalProduct = {
          id: `prod_${Date.now()}`,
          name: productName,
          type: productType,
          description: productDescription,
          price: productPrice,
          currency: productCurrency,
          downloadLimit: downloadLimit,
          hasExpiryDate: hasExpiryDate,
          defaultExpiryDays: hasExpiryDate ? expiryDays : null,
          totalSold: 0,
          activeUserCount: 0,
          expiredUserCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          fileSize: "0 KB",
          fileType: "PDF"
        };
        
        setProducts(prev => [...prev, newProduct]);
        
        toast({
          title: "Product Created",
          description: "The digital product has been created successfully.",
        });
      } else {
        // Update existing product
        const updatedProduct: DigitalProduct = {
          ...selectedProduct!,
          name: productName,
          type: productType,
          description: productDescription,
          price: productPrice,
          currency: productCurrency,
          downloadLimit: downloadLimit,
          hasExpiryDate: hasExpiryDate,
          defaultExpiryDays: hasExpiryDate ? expiryDays : null,
          updatedAt: new Date().toISOString()
        };
        
        setProducts(prev => 
          prev.map(prod => prod.id === selectedProduct!.id ? updatedProduct : prod)
        );
        
        toast({
          title: "Product Updated",
          description: "The digital product has been updated successfully.",
        });
      }
      
      setIsProductDialogOpen(false);
    } catch (err) {
      console.error("Error saving product:", err);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle viewing license details
  const handleViewLicense = (license: UserLicense) => {
    setSelectedLicense(license);
    setIsLicenseDialogOpen(true);
  };

  // Handle extending a license
  const handleExtendLicense = (license: UserLicense) => {
    setSelectedLicense(license);
    setExtensionDays(30);
    setAdditionalDownloads(0);
    setExtensionNote("");
    setIsExtendDialogOpen(true);
  };

  // Save license extension
  const handleSaveExtension = async () => {
    if (!selectedLicense) return;
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/user-licenses/${selectedLicense.id}/extend`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ extensionDays, additionalDownloads, note: extensionNote })
      // });
      
      // Calculate new expiry date if applicable
      let newExpiryDate = selectedLicense.expiryDate;
      if (extensionDays > 0 && selectedLicense.expiryDate) {
        const currentExpiry = new Date(selectedLicense.expiryDate);
        currentExpiry.setDate(currentExpiry.getDate() + extensionDays);
        newExpiryDate = currentExpiry.toISOString();
      }
      
      // Calculate new download count
      const newRemainingDownloads = selectedLicense.remainingDownloads + additionalDownloads;
      
      // Update license in state
      const updatedLicense: UserLicense = {
        ...selectedLicense,
        expiryDate: newExpiryDate,
        isExpired: newExpiryDate ? new Date(newExpiryDate) < new Date() : false,
        isActive: true,
        remainingDownloads: newRemainingDownloads,
        notes: extensionNote || selectedLicense.notes
      };
      
      setLicenses(prev => 
        prev.map(lic => lic.id === selectedLicense.id ? updatedLicense : lic)
      );
      
      toast({
        title: "License Extended",
        description: `License for ${selectedLicense.username} has been extended successfully.`,
      });
      
      setIsExtendDialogOpen(false);
    } catch (err) {
      console.error("Error extending license:", err);
      toast({
        title: "Error",
        description: "Failed to extend license. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get product type badge
  const getProductTypeBadge = (type: ProductType) => {
    switch (type) {
      case 'ebook':
        return <Badge className="bg-blue-100 text-blue-800"><BookOpen className="h-3 w-3 mr-1" /> E-Book</Badge>;
      case 'lesson_plan':
        return <Badge className="bg-green-100 text-green-800"><FileText className="h-3 w-3 mr-1" /> Lesson Plan</Badge>;
      case 'worksheet':
        return <Badge className="bg-purple-100 text-purple-800"><FileText className="h-3 w-3 mr-1" /> Worksheet</Badge>;
      case 'activity':
        return <Badge className="bg-amber-100 text-amber-800"><FileText className="h-3 w-3 mr-1" /> Activity</Badge>;
      case 'full_book':
        return <Badge className="bg-red-100 text-red-800"><Package className="h-3 w-3 mr-1" /> Complete Pack</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  // Get license status badge
  const getLicenseStatusBadge = (license: UserLicense) => {
    if (license.isExpired) {
      return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> Expired</Badge>;
    } else if (license.remainingDownloads <= 0) {
      return <Badge className="bg-amber-100 text-amber-800"><AlertTriangle className="h-3 w-3 mr-1" /> Limit Reached</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Active</Badge>;
    }
  };

  // Get download status badge
  const getDownloadStatusBadge = (status: string, reason?: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Success</Badge>;
      case 'failed':
        return (
          <div className="flex flex-col">
            <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> Failed</Badge>
            {reason && <span className="text-xs text-red-600 mt-1">{reason}</span>}
          </div>
        );
      case 'blocked':
        return (
          <div className="flex flex-col">
            <Badge className="bg-amber-100 text-amber-800"><AlertTriangle className="h-3 w-3 mr-1" /> Blocked</Badge>
            {reason && <span className="text-xs text-amber-600 mt-1">{reason}</span>}
          </div>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-red-500 text-lg mb-4">{error}</div>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Package className="mr-2 h-5 w-5" /> Digital Product Inventory
              </CardTitle>
              <CardDescription>
                Manage digital products, licenses, and download limits
              </CardDescription>
            </div>
            <div>
              {activeTab === "products" && (
                <Button onClick={handleCreateProduct} className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> New Product
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="licenses">User Licenses</TabsTrigger>
              <TabsTrigger value="downloads">Download History</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              {activeTab === "products" && (
                <Select value={productTypeFilter || ''} onValueChange={(value) => setProductTypeFilter(value || null)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="ebook">E-Books</SelectItem>
                    <SelectItem value="lesson_plan">Lesson Plans</SelectItem>
                    <SelectItem value="worksheet">Worksheets</SelectItem>
                    <SelectItem value="activity">Activities</SelectItem>
                    <SelectItem value="full_book">Complete Packs</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {activeTab === "licenses" && (
                <Select value={expiryFilter || ''} onValueChange={(value) => setExpiryFilter(value || null)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="limitReached">Limit Reached</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {/* Products Tab */}
            <TabsContent value="products" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Download Limits</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 truncate max-w-xs">
                              {product.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getProductTypeBadge(product.type)}
                            <div className="text-xs text-muted-foreground mt-1">
                              {product.fileSize} • {product.fileType}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {product.price} {product.currency}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {product.totalSold} sold
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <span>{product.downloadLimit} downloads</span>
                            </div>
                            {product.hasExpiryDate && product.defaultExpiryDays && (
                              <div className="flex items-center space-x-2 mt-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{product.defaultExpiryDays} days access</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-green-600" />
                              <span>{product.activeUserCount} active</span>
                            </div>
                            {product.expiredUserCount > 0 && (
                              <div className="flex items-center space-x-2 mt-1 text-muted-foreground">
                                <Clock className="h-4 w-4 text-red-400" />
                                <span>{product.expiredUserCount} expired</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* User Licenses Tab */}
            <TabsContent value="licenses" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLicenses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No licenses found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLicenses.map((license) => (
                        <TableRow 
                          key={license.id}
                          className={license.isExpired ? "bg-red-50" : license.remainingDownloads <= 0 ? "bg-amber-50" : ""}
                        >
                          <TableCell>
                            <div className="font-medium">{license.username}</div>
                            <div className="text-xs text-muted-foreground">
                              {license.userEmail}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium truncate max-w-xs">{license.productName}</div>
                            <div className="text-xs text-muted-foreground">
                              Purchased: {formatDate(license.purchaseDate)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getLicenseStatusBadge(license)}
                            {license.notes && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {license.notes}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Remaining:</span>
                                <span className={`font-medium ${license.remainingDownloads === 0 ? "text-red-600" : ""}`}>
                                  {license.remainingDownloads}
                                </span>
                              </div>
                              <Progress 
                                value={(license.remainingDownloads / (license.remainingDownloads + license.totalDownloads)) * 100} 
                                className="h-2"
                              />
                              <div className="text-xs text-muted-foreground">
                                Used: {license.totalDownloads}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {license.expiryDate ? (
                              <>
                                <div className={`font-medium ${license.isExpired ? "text-red-600" : ""}`}>
                                  {formatDate(license.expiryDate)}
                                </div>
                                {!license.isExpired && (
                                  <div className="text-xs text-muted-foreground">
                                    {calculateDaysLeft(license.expiryDate)} days left
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="text-muted-foreground">No expiry</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewLicense(license)}
                                className="h-8 w-8 p-0"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleExtendLicense(license)}
                                className="h-8 w-8 p-0 text-green-600"
                                title="Extend License"
                              >
                                <CalendarPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Downloads Tab */}
            <TabsContent value="downloads" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>IP & Device</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDownloads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No download records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDownloads.map((download) => (
                        <TableRow 
                          key={download.id}
                          className={download.status === 'blocked' ? "bg-amber-50" : download.status === 'failed' ? "bg-red-50" : ""}
                        >
                          <TableCell>
                            <div className="font-medium">{download.username}</div>
                            <div className="text-xs text-muted-foreground">
                              ID: {download.userId}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium truncate max-w-xs">
                              {download.productName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {download.productId}
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatDateTime(download.downloadDate)}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{download.ipAddress}</div>
                            <div className="text-xs text-muted-foreground">
                              {download.deviceInfo}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getDownloadStatusBadge(download.status, download.failureReason)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create/Edit Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Digital Product' : 'Create New Digital Product'}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct 
                ? 'Update the product details below.'
                : 'Define a new digital product with download limits and expiry settings.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., Visual English Book 1 - Digital Version"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-type">Product Type</Label>
                <Select value={productType} onValueChange={(value) => setProductType(value as ProductType)}>
                  <SelectTrigger id="product-type">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ebook">E-Book</SelectItem>
                    <SelectItem value="lesson_plan">Lesson Plan</SelectItem>
                    <SelectItem value="worksheet">Worksheet</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="full_book">Complete Pack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Input
                  id="product-description"
                  placeholder="Brief description of the product"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price</Label>
                  <Input
                    id="product-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={productPrice}
                    onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-currency">Currency</Label>
                  <Select value={productCurrency} onValueChange={setProductCurrency}>
                    <SelectTrigger id="product-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="PLN">PLN (zł)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Access Restrictions</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="download-limit">Download Limit</Label>
                    <Input
                      id="download-limit"
                      type="number"
                      min="1"
                      step="1"
                      value={downloadLimit}
                      onChange={(e) => setDownloadLimit(parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of downloads per user
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has-expiry"
                        checked={hasExpiryDate}
                        onCheckedChange={(checked) => {
                          setHasExpiryDate(checked === true);
                          if (checked && !expiryDays) {
                            setExpiryDays(365);
                          }
                        }}
                      />
                      <Label htmlFor="has-expiry">Enable expiry date</Label>
                    </div>
                    
                    {hasExpiryDate && (
                      <div className="space-y-2">
                        <Label htmlFor="expiry-days">Days until expiry</Label>
                        <Input
                          id="expiry-days"
                          type="number"
                          min="1"
                          step="1"
                          value={expiryDays || ''}
                          onChange={(e) => setExpiryDays(parseInt(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground">
                          Access expires this many days after purchase
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProductDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {selectedProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* License Details Dialog */}
      {selectedLicense && (
        <Dialog open={isLicenseDialogOpen} onOpenChange={setIsLicenseDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                License Details
              </DialogTitle>
              <DialogDescription>
                Viewing license for {selectedLicense.username}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">User Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Username:</span>
                      <span className="text-sm font-medium">{selectedLicense.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium">{selectedLicense.userEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">User ID:</span>
                      <span className="text-sm font-medium">{selectedLicense.userId}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Product Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Product:</span>
                      <span className="text-sm font-medium">{selectedLicense.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Product ID:</span>
                      <span className="text-sm font-medium">{selectedLicense.productId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Transaction ID:</span>
                      <span className="text-sm font-medium">{selectedLicense.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Purchase Date:</span>
                      <span className="text-sm font-medium">{formatDate(selectedLicense.purchaseDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">License Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">License ID:</span>
                      <span className="text-sm font-medium">{selectedLicense.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <span className="text-sm font-medium">{getLicenseStatusBadge(selectedLicense)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expiry Date:</span>
                      <span className="text-sm font-medium">{selectedLicense.expiryDate ? formatDate(selectedLicense.expiryDate) : "No expiry"}</span>
                    </div>
                    {selectedLicense.expiryDate && !selectedLicense.isExpired && (
                      <div className="flex justify-between">
                        <span className="text-sm">Days Remaining:</span>
                        <span className="text-sm font-medium">{calculateDaysLeft(selectedLicense.expiryDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Download Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Downloads:</span>
                      <span className="text-sm font-medium">{selectedLicense.totalDownloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Remaining Downloads:</span>
                      <span className="text-sm font-medium">{selectedLicense.remainingDownloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Download:</span>
                      <span className="text-sm font-medium">{selectedLicense.lastDownloadDate ? formatDateTime(selectedLicense.lastDownloadDate) : "Never"}</span>
                    </div>
                    {selectedLicense.lastDownloadIp && (
                      <div className="flex justify-between">
                        <span className="text-sm">Last IP:</span>
                        <span className="text-sm font-medium">{selectedLicense.lastDownloadIp}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedLicense.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                    <div className="bg-gray-50 p-2 rounded-md text-sm">
                      {selectedLicense.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsLicenseDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsLicenseDialogOpen(false);
                  handleExtendLicense(selectedLicense);
                }}
              >
                Extend License
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* License Extension Dialog */}
      {selectedLicense && (
        <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Extend License
              </DialogTitle>
              <DialogDescription>
                Extend the license for {selectedLicense.username}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-2">
                  <span>Current expiry date:</span>
                  <span className="font-medium">
                    {selectedLicense.expiryDate ? formatDate(selectedLicense.expiryDate) : "No expiry"}
                  </span>
                </div>
                
                <Label htmlFor="extension-days">Add Days</Label>
                <Input
                  id="extension-days"
                  type="number"
                  min="0"
                  value={extensionDays}
                  onChange={(e) => setExtensionDays(parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Number of days to extend the license
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-2">
                  <span>Current downloads remaining:</span>
                  <span className="font-medium">
                    {selectedLicense.remainingDownloads}
                  </span>
                </div>
                
                <Label htmlFor="additional-downloads">Add Downloads</Label>
                <Input
                  id="additional-downloads"
                  type="number"
                  min="0"
                  value={additionalDownloads}
                  onChange={(e) => setAdditionalDownloads(parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Additional downloads to grant
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="extension-note">Note</Label>
                <Input
                  id="extension-note"
                  placeholder="Reason for extension (optional)"
                  value={extensionNote}
                  onChange={(e) => setExtensionNote(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsExtendDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveExtension}
                disabled={extensionDays === 0 && additionalDownloads === 0}
              >
                Extend License
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DigitalInventoryPage;