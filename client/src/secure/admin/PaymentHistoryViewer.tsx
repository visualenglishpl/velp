import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  CreditCard,
  Calendar,
  Clock,
  User,
  DollarSign,
  Download,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart,
  Printer,
  Mail,
  Book,
  Tag
} from "lucide-react";

// Define types
type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded' | 'disputed';
type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal' | 'other';
type SubscriptionType = 'monthly' | 'annual' | 'one_time' | 'free_trial';
type Currency = 'EUR' | 'PLN' | 'USD';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  country?: string;
  school?: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  method: PaymentMethod;
  subscriptionType: SubscriptionType;
  date: string;
  description: string;
  user: User;
  invoice?: string;
  receiptUrl?: string;
  lastFour?: string;
  items: PaymentItem[];
  metadata?: Record<string, any>;
}

interface PaymentItem {
  id: string;
  name: string;
  type: 'book' | 'unit' | 'subscription' | 'physical_book';
  quantity: number;
  unitPrice: number;
  currency: Currency;
  bookId?: string;
  unitIds?: string[];
}

const PaymentHistoryViewer = () => {
  const { toast } = useToast();
  
  // State for data
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for UI
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>("all");
  
  // Revenue statistics
  const [revenueStats, setRevenueStats] = useState({
    monthly: 0,
    annual: 0,
    oneTime: 0,
    totalAmount: 0,
    totalTransactions: 0,
    averageAmount: 0
  });
  
  // Load payment data
  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/payments');
        // const data = await response.json();
        
        // Example mock data for development
        const mockPayments: Payment[] = [
          {
            id: "pay_1NjK2Y",
            amount: 25,
            currency: "EUR",
            status: "completed",
            method: "credit_card",
            subscriptionType: "monthly",
            date: "2025-05-15T09:30:00Z",
            description: "Monthly subscription to Book 3",
            user: {
              id: "user_123",
              name: "Anna Kowalski",
              email: "anna.k@school.edu.pl",
              role: "teacher",
              country: "Poland",
              school: "International School of Warsaw"
            },
            invoice: "INV-2025-0532",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0532",
            lastFour: "4242",
            items: [
              {
                id: "item_1",
                name: "Book 3 Monthly Access",
                type: "subscription",
                quantity: 1,
                unitPrice: 25,
                currency: "EUR",
                bookId: "3"
              }
            ]
          },
          {
            id: "pay_2MlP3Z",
            amount: 40,
            currency: "EUR",
            status: "completed",
            method: "credit_card",
            subscriptionType: "annual",
            date: "2025-05-12T14:15:00Z",
            description: "Annual subscription to Book 1",
            user: {
              id: "user_456",
              name: "Marek Nowak",
              email: "m.nowak@primaryschool.pl",
              role: "school_admin",
              country: "Poland",
              school: "Wrocław Primary School"
            },
            invoice: "INV-2025-0518",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0518",
            lastFour: "1234",
            items: [
              {
                id: "item_2",
                name: "Book 1 Annual Access",
                type: "subscription",
                quantity: 1,
                unitPrice: 40,
                currency: "EUR",
                bookId: "1"
              }
            ]
          },
          {
            id: "pay_3OpQ4A",
            amount: 20,
            currency: "EUR",
            status: "completed",
            method: "paypal",
            subscriptionType: "one_time",
            date: "2025-05-10T11:45:00Z",
            description: "Purchase of printed Book 0a",
            user: {
              id: "user_789",
              name: "Katarzyna Wiśniewska",
              email: "k.wisniewska@gmail.com",
              role: "teacher",
              country: "Poland"
            },
            invoice: "INV-2025-0510",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0510",
            items: [
              {
                id: "item_3",
                name: "Printed Book 0a",
                type: "physical_book",
                quantity: 1,
                unitPrice: 20,
                currency: "EUR",
                bookId: "0a"
              }
            ],
            metadata: {
              shipping_address: "ul. Kwiatowa 10, 00-001 Warszawa, Poland",
              tracking_number: "PL123456789"
            }
          },
          {
            id: "pay_4RsT5B",
            amount: 0,
            currency: "EUR",
            status: "completed",
            method: "credit_card",
            subscriptionType: "free_trial",
            date: "2025-05-17T16:20:00Z",
            description: "7-day free trial for Book 2",
            user: {
              id: "user_101",
              name: "Jan Kowalczyk",
              email: "j.kowalczyk@edulearn.pl",
              role: "teacher",
              country: "Poland"
            },
            invoice: "INV-2025-0542",
            lastFour: "5678",
            items: [
              {
                id: "item_4",
                name: "Book 2 Free Trial (7 days)",
                type: "subscription",
                quantity: 1,
                unitPrice: 0,
                currency: "EUR",
                bookId: "2"
              }
            ]
          },
          {
            id: "pay_5UvW6C",
            amount: 5,
            currency: "EUR",
            status: "completed",
            method: "credit_card",
            subscriptionType: "monthly",
            date: "2025-05-14T10:10:00Z",
            description: "Single Unit Access - Book 4, Unit 7",
            user: {
              id: "user_202",
              name: "Aleksandra Lewandowska",
              email: "a.lewandowska@school.edu.pl",
              role: "teacher",
              country: "Poland",
              school: "Warsaw Language School"
            },
            invoice: "INV-2025-0527",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0527",
            lastFour: "9012",
            items: [
              {
                id: "item_5",
                name: "Single Unit Access - Book 4, Unit 7",
                type: "unit",
                quantity: 1,
                unitPrice: 5,
                currency: "EUR",
                bookId: "4",
                unitIds: ["7"]
              }
            ]
          },
          {
            id: "pay_6XyZ7D",
            amount: 40,
            currency: "EUR",
            status: "refunded",
            method: "credit_card",
            subscriptionType: "annual",
            date: "2025-05-08T09:25:00Z",
            description: "Annual subscription to Book 2 (Refunded)",
            user: {
              id: "user_303",
              name: "Tomasz Wójcik",
              email: "t.wojcik@school.edu.pl",
              role: "teacher",
              country: "Poland",
              school: "Kraków International School"
            },
            invoice: "INV-2025-0503",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0503",
            lastFour: "3456",
            items: [
              {
                id: "item_6",
                name: "Book 2 Annual Access",
                type: "subscription",
                quantity: 1,
                unitPrice: 40,
                currency: "EUR",
                bookId: "2"
              }
            ],
            metadata: {
              refund_reason: "Customer requested cancellation within 14-day period",
              refund_date: "2025-05-09T14:30:00Z"
            }
          },
          {
            id: "pay_7AB8E",
            amount: 15,
            currency: "EUR",
            status: "failed",
            method: "credit_card",
            subscriptionType: "monthly",
            date: "2025-05-16T18:05:00Z",
            description: "Monthly subscription to Book 5 (Failed)",
            user: {
              id: "user_404",
              name: "Piotr Kowalski",
              email: "p.kowalski@gmail.com",
              role: "teacher",
              country: "Poland"
            },
            lastFour: "7890",
            items: [
              {
                id: "item_7",
                name: "Book 5 Monthly Access",
                type: "subscription",
                quantity: 1,
                unitPrice: 15,
                currency: "EUR",
                bookId: "5"
              }
            ],
            metadata: {
              failure_reason: "Card declined",
              failure_code: "card_declined"
            }
          },
          {
            id: "pay_8CD9F",
            amount: 65,
            currency: "EUR",
            status: "completed",
            method: "bank_transfer",
            subscriptionType: "one_time",
            date: "2025-05-11T13:40:00Z",
            description: "Purchase of multiple books (0a, 1, 2)",
            user: {
              id: "user_505",
              name: "Maria Dąbrowska",
              email: "m.dabrowska@school.edu.pl",
              role: "school_admin",
              country: "Poland",
              school: "Lublin Language Center"
            },
            invoice: "INV-2025-0515",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0515",
            items: [
              {
                id: "item_8a",
                name: "Printed Book 0a",
                type: "physical_book",
                quantity: 1,
                unitPrice: 20,
                currency: "EUR",
                bookId: "0a"
              },
              {
                id: "item_8b",
                name: "Printed Book 1",
                type: "physical_book",
                quantity: 1,
                unitPrice: 20,
                currency: "EUR",
                bookId: "1"
              },
              {
                id: "item_8c",
                name: "Printed Book 2",
                type: "physical_book",
                quantity: 1,
                unitPrice: 25,
                currency: "EUR",
                bookId: "2"
              }
            ],
            metadata: {
              shipping_address: "ul. Szkolna 5, 20-001 Lublin, Poland",
              tracking_number: "PL987654321"
            }
          },
          {
            id: "pay_9EF0G",
            amount: 120,
            currency: "EUR",
            status: "completed",
            method: "credit_card",
            subscriptionType: "annual",
            date: "2025-05-13T09:15:00Z",
            description: "School annual package - 3 teachers",
            user: {
              id: "user_606",
              name: "Adam Nowicki",
              email: "a.nowicki@international.edu.pl",
              role: "school_admin",
              country: "Poland",
              school: "Gdańsk International School"
            },
            invoice: "INV-2025-0520",
            receiptUrl: "https://visualenglish.com/receipts/INV-2025-0520",
            lastFour: "1122",
            items: [
              {
                id: "item_9",
                name: "School Annual Package - 3 Teacher Licenses",
                type: "subscription",
                quantity: 3,
                unitPrice: 40,
                currency: "EUR"
              }
            ],
            metadata: {
              teacher_ids: ["teacher_101", "teacher_102", "teacher_103"],
              access_level: "full_platform"
            }
          },
          {
            id: "pay_0GH1H",
            amount: 30,
            currency: "PLN",
            status: "pending",
            method: "bank_transfer",
            subscriptionType: "one_time",
            date: "2025-05-17T15:30:00Z",
            description: "Purchase of printed Book 3 (Pending)",
            user: {
              id: "user_707",
              name: "Zofia Malinowska",
              email: "z.malinowska@gmail.com",
              role: "teacher",
              country: "Poland"
            },
            invoice: "INV-2025-0544",
            items: [
              {
                id: "item_10",
                name: "Printed Book 3",
                type: "physical_book",
                quantity: 1,
                unitPrice: 30,
                currency: "PLN",
                bookId: "3"
              }
            ],
            metadata: {
              shipping_address: "ul. Długa 15, 00-001 Warszawa, Poland"
            }
          }
        ];
        
        setPayments(mockPayments);
        
        // Calculate revenue statistics
        calculateRevenueStats(mockPayments);
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to load payment data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentData();
  }, []);

  // Calculate revenue statistics
  const calculateRevenueStats = (paymentData: Payment[]) => {
    const completedPayments = paymentData.filter(payment => payment.status === 'completed');
    
    const monthly = completedPayments
      .filter(p => p.subscriptionType === 'monthly')
      .reduce((sum, p) => sum + p.amount, 0);
      
    const annual = completedPayments
      .filter(p => p.subscriptionType === 'annual')
      .reduce((sum, p) => sum + p.amount, 0);
      
    const oneTime = completedPayments
      .filter(p => p.subscriptionType === 'one_time')
      .reduce((sum, p) => sum + p.amount, 0);
      
    const totalAmount = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalTransactions = completedPayments.length;
    const averageAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;
    
    setRevenueStats({
      monthly,
      annual,
      oneTime,
      totalAmount,
      totalTransactions,
      averageAmount
    });
  };

  // Filter payments based on active tab, search, and filters
  const filteredPayments = payments.filter(payment => {
    // Filter by tab (payment type)
    if (activeTab === "subscriptions" && 
        (payment.subscriptionType !== 'monthly' && payment.subscriptionType !== 'annual')) {
      return false;
    }
    if (activeTab === "one_time" && payment.subscriptionType !== 'one_time') {
      return false;
    }
    if (activeTab === "trials" && payment.subscriptionType !== 'free_trial') {
      return false;
    }
    if (activeTab === "refunds" && payment.status !== 'refunded') {
      return false;
    }
    if (activeTab === "failed" && payment.status !== 'failed') {
      return false;
    }
    
    // Filter by date
    if (dateFilter !== "all") {
      const paymentDate = new Date(payment.date);
      const now = new Date();
      
      if (dateFilter === "today") {
        const today = new Date();
        if (paymentDate.getDate() !== today.getDate() ||
            paymentDate.getMonth() !== today.getMonth() ||
            paymentDate.getFullYear() !== today.getFullYear()) {
          return false;
        }
      } else if (dateFilter === "this_week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        if (paymentDate < oneWeekAgo) {
          return false;
        }
      } else if (dateFilter === "this_month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        if (paymentDate < oneMonthAgo) {
          return false;
        }
      }
    }
    
    // Filter by status
    if (statusFilter !== "all" && payment.status !== statusFilter) {
      return false;
    }
    
    // Filter by method
    if (methodFilter !== "all" && payment.method !== methodFilter) {
      return false;
    }
    
    // Filter by subscription type
    if (subscriptionFilter !== "all" && payment.subscriptionType !== subscriptionFilter) {
      return false;
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.description.toLowerCase().includes(query) ||
        payment.user.name.toLowerCase().includes(query) ||
        payment.user.email.toLowerCase().includes(query) ||
        (payment.invoice && payment.invoice.toLowerCase().includes(query)) ||
        (payment.items.some(item => item.name.toLowerCase().includes(query)))
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency for display
  const formatCurrency = (amount: number, currency: Currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    
    return formatter.format(amount);
  };

  // Get status badge for details view
  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Refunded</Badge>;
      case "disputed":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Disputed</Badge>;
      default:
        return null;
    }
  };

  // Get method badge for details view
  const getMethodBadge = (method: PaymentMethod) => {
    switch (method) {
      case "credit_card":
        return <Badge variant="outline" className="border-indigo-200 text-indigo-800">Credit Card</Badge>;
      case "bank_transfer":
        return <Badge variant="outline" className="border-green-200 text-green-800">Bank Transfer</Badge>;
      case "paypal":
        return <Badge variant="outline" className="border-blue-200 text-blue-800">PayPal</Badge>;
      case "other":
        return <Badge variant="outline" className="border-gray-200 text-gray-800">Other</Badge>;
      default:
        return null;
    }
  };

  // Get subscription type badge for details view
  const getSubscriptionBadge = (type: SubscriptionType) => {
    switch (type) {
      case "monthly":
        return <Badge variant="outline" className="border-purple-200 text-purple-800">Monthly</Badge>;
      case "annual":
        return <Badge variant="outline" className="border-blue-200 text-blue-800">Annual</Badge>;
      case "one_time":
        return <Badge variant="outline" className="border-amber-200 text-amber-800">One-time</Badge>;
      case "free_trial":
        return <Badge variant="outline" className="border-green-200 text-green-800">Free Trial</Badge>;
      default:
        return null;
    }
  };

  // View payment details
  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailDialogOpen(true);
  };

  // Send receipt via email
  const handleSendReceipt = (payment: Payment) => {
    toast({
      title: "Receipt Sent",
      description: `Receipt for payment ${payment.id} has been sent to ${payment.user.email}`,
    });
  };

  // Process refund
  const handleRefund = () => {
    if (!selectedPayment) return;
    
    toast({
      title: "Refund Processed",
      description: `Refund of ${formatCurrency(selectedPayment.amount, selectedPayment.currency)} for payment ${selectedPayment.id} has been processed.`,
    });
    
    // Update payment status
    const updatedPayments = payments.map(payment => 
      payment.id === selectedPayment.id 
        ? { ...payment, status: 'refunded' as PaymentStatus } 
        : payment
    );
    
    setPayments(updatedPayments);
    setSelectedPayment({ ...selectedPayment, status: 'refunded' });
    setIsRefundDialogOpen(false);
  };

  // Download invoice
  const handleDownloadInvoice = (payment: Payment) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${payment.invoice} has been downloaded.`,
    });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
      <Helmet>
        <title>Payment History | Visual English Admin</title>
      </Helmet>
      
      <div className="flex justify-start mb-4">
        <Link href="/admin">
          <Button variant="outline" className="flex items-center">
            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Admin
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <CreditCard className="mr-2 h-6 w-6" /> Payment History
              </CardTitle>
              <CardDescription>
                Track and manage payments, subscriptions, and transactions
              </CardDescription>
            </div>
            <div>
              <Button onClick={() => window.location.reload()} variant="outline" className="bg-white hover:bg-gray-50">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Revenue Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card className="bg-indigo-50 border-indigo-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-indigo-700 mr-2" />
                    <p className="text-sm font-medium text-indigo-700">Monthly Subscriptions</p>
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900">{formatCurrency(revenueStats.monthly, "EUR")}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-blue-700 mr-2" />
                    <p className="text-sm font-medium text-blue-700">Annual Subscriptions</p>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">{formatCurrency(revenueStats.annual, "EUR")}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-amber-700 mr-2" />
                    <p className="text-sm font-medium text-amber-700">One-time Payments</p>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900">{formatCurrency(revenueStats.oneTime, "EUR")}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-green-700 mr-2" />
                    <p className="text-sm font-medium text-green-700">Total Revenue</p>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">{formatCurrency(revenueStats.totalAmount, "EUR")}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-5 w-5 text-purple-700 mr-2" />
                    <p className="text-sm font-medium text-purple-700">Transactions</p>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">{revenueStats.totalTransactions}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <BarChart className="h-5 w-5 text-gray-700 mr-2" />
                    <p className="text-sm font-medium text-gray-700">Average Sale</p>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(revenueStats.averageAmount, "EUR")}</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            {/* Filters and Tabs */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-2">
                <TabsList className="w-full grid grid-cols-6 bg-transparent gap-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    All Payments
                  </TabsTrigger>
                  <TabsTrigger value="subscriptions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Subscriptions
                  </TabsTrigger>
                  <TabsTrigger value="one_time" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    One-time
                  </TabsTrigger>
                  <TabsTrigger value="trials" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Free Trials
                  </TabsTrigger>
                  <TabsTrigger value="refunds" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Refunds
                  </TabsTrigger>
                  <TabsTrigger value="failed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Failed
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search payments..."
                      className="pl-8 pr-4 py-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9 ml-2">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                </div>
                
                {/* Advanced Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Date:</span>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="h-9 flex-1">
                        <SelectValue placeholder="All Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="this_week">This Week</SelectItem>
                        <SelectItem value="this_month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 flex-1">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="disputed">Disputed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Method:</span>
                    <Select value={methodFilter} onValueChange={setMethodFilter}>
                      <SelectTrigger className="h-9 flex-1">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Type:</span>
                    <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                      <SelectTrigger className="h-9 flex-1">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="one_time">One-time</SelectItem>
                        <SelectItem value="free_trial">Free Trial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => {
                      setDateFilter("all");
                      setStatusFilter("all");
                      setMethodFilter("all");
                      setSubscriptionFilter("all");
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
              
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value={activeTab} className="space-y-4">
                {filteredPayments.length === 0 ? (
                  <div className="bg-white rounded-md border p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <CreditCard className="h-12 w-12 text-gray-300 mb-3" />
                      <h3 className="text-xl font-medium text-gray-700 mb-1">No payments found</h3>
                      <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                        {searchQuery || dateFilter !== "all" || statusFilter !== "all" || methodFilter !== "all" || subscriptionFilter !== "all" ? 
                          "No payments match your current filters. Try adjusting your search criteria or clearing filters." : 
                          "There are no payment records to display in this category."
                        }
                      </p>
                      
                      {(searchQuery || dateFilter !== "all" || statusFilter !== "all" || methodFilter !== "all" || subscriptionFilter !== "all") && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setDateFilter("all");
                            setStatusFilter("all");
                            setMethodFilter("all");
                            setSubscriptionFilter("all");
                            setSearchQuery("");
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="text-left hidden lg:table-cell py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredPayments.map(payment => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                              <td className="py-4 px-4 text-sm">
                                <a 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleViewPayment(payment);
                                  }}
                                  className="text-blue-600 hover:underline font-medium"
                                >
                                  {payment.id}
                                </a>
                              </td>
                              <td className="py-4 px-4 text-sm">
                                <div className="flex flex-col">
                                  <span className="text-gray-900">
                                    {new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {new Date(payment.date).getFullYear()},&nbsp;
                                    {new Date(payment.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4 font-medium text-sm">
                                {payment.amount === 0 ? 
                                  <span className="text-gray-900">€0.00</span> : 
                                  payment.currency === 'PLN' ?
                                    <span className="text-gray-900">PLN {payment.amount.toFixed(2)}</span> :
                                    <span className="text-gray-900">{formatCurrency(payment.amount, payment.currency)}</span>
                                }
                              </td>
                              <td className="py-4 px-4 text-sm">
                                <div className="flex flex-col gap-1">
                                  {payment.status === 'completed' ? (
                                    <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Completed
                                    </Badge>
                                  ) : payment.status === 'pending' ? (
                                    <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      Pending
                                    </Badge>
                                  ) : payment.status === 'failed' ? (
                                    <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Failed
                                    </Badge>
                                  ) : payment.status === 'refunded' ? (
                                    <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      Refunded
                                    </Badge>
                                  ) : null}
                                  
                                  {payment.subscriptionType === 'free_trial' && (
                                    <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                      Free Trial
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm">
                                <div className="flex flex-col">
                                  <span className="text-gray-900 font-medium">{payment.user.name}</span>
                                  <span className="text-gray-500 text-xs">{payment.user.email}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm hidden lg:table-cell max-w-xs truncate">
                                {payment.description}
                              </td>
                              <td className="py-4 px-4 text-sm text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleViewPayment(payment)}
                                    title="View Details"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {payment.invoice && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDownloadInvoice(payment)}
                                      title="Download Invoice"
                                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSendReceipt(payment)}
                                    title="Send Receipt"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                                  >
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Payment Detail Dialog */}
      {selectedPayment && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                Payment Details 
                <span className="text-blue-600">{selectedPayment.id}</span>
              </DialogTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {getStatusBadge(selectedPayment.status)}
                {getMethodBadge(selectedPayment.method)}
                {getSubscriptionBadge(selectedPayment.subscriptionType)}
              </div>
            </DialogHeader>
            
            {/* Payment Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Amount</h3>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                  <p className="text-base font-medium">{formatDate(selectedPayment.date)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-base">{selectedPayment.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Customer</h3>
                  <div className="flex items-start space-x-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                      <User className="h-4 w-4 text-indigo-700" />
                    </div>
                    <div>
                      <p className="text-base font-medium">{selectedPayment.user.name}</p>
                      <p className="text-sm text-gray-500">{selectedPayment.user.email}</p>
                      {selectedPayment.user.school && (
                        <p className="text-sm text-gray-500">{selectedPayment.user.school}</p>
                      )}
                      {selectedPayment.user.country && (
                        <p className="text-sm text-gray-500">{selectedPayment.user.country}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-indigo-700" />
                    </div>
                    <div>
                      <p className="text-base font-medium">
                        {selectedPayment.method === 'credit_card' ? 'Credit Card' : 
                         selectedPayment.method === 'bank_transfer' ? 'Bank Transfer' :
                         selectedPayment.method === 'paypal' ? 'PayPal' : 'Other'}
                      </p>
                      {selectedPayment.lastFour && (
                        <p className="text-sm text-gray-500">Card ending in {selectedPayment.lastFour}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Items */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Items</h3>
                <div className="bg-gray-50 rounded-md border p-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPayment.items.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{item.name}</span>
                              <div className="flex gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {item.type === 'book' ? 'Book' :
                                   item.type === 'unit' ? 'Unit' :
                                   item.type === 'subscription' ? 'Subscription' :
                                   'Physical Book'}
                                </Badge>
                                {item.bookId && (
                                  <Badge variant="outline" className="text-xs">
                                    Book {item.bookId}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.unitPrice, item.currency)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.unitPrice * item.quantity, item.currency)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Additional Information */}
              {selectedPayment.metadata && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h3>
                  <div className="bg-gray-50 rounded-md border p-3 text-sm">
                    {Object.entries(selectedPayment.metadata).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 mb-1">
                        <div className="font-medium text-gray-700">{key.replace(/_/g, ' ')}</div>
                        <div className="text-gray-600">{value as string}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t mt-4">
              <div className="flex flex-wrap gap-2 sm:justify-start justify-center">
                {selectedPayment.invoice && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailDialogOpen(false);
                      handleDownloadInvoice(selectedPayment);
                    }}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Invoice
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDetailDialogOpen(false);
                    handleSendReceipt(selectedPayment);
                  }}
                  className="flex items-center"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Send Receipt
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedPayment.user.email}`)}
                  className="flex items-center"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email Customer
                </Button>
                
                {selectedPayment.status === 'completed' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailDialogOpen(false);
                      setIsRefundDialogOpen(true);
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50 flex items-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Process Refund
                  </Button>
                )}
              </div>
              
              <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Refund Confirmation Dialog */}
      {selectedPayment && (
        <AlertDialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to refund {formatCurrency(selectedPayment.amount, selectedPayment.currency)} to {selectedPayment.user.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRefund}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Process Refund
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default PaymentHistoryViewer;