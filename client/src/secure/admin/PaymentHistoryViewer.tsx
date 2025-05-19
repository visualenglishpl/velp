import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CreditCard,
  Calendar,
  DollarSign,
  Download,
  Search,
  Filter,
  RefreshCw,
  Eye,
  BarChart,
  Mail
} from "lucide-react";

const PaymentHistoryViewer = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock data for demonstration
  const payments = [
    {
      id: "pay_1NjK2Y",
      amount: 25,
      currency: "EUR",
      status: "completed",
      type: "monthly",
      date: "2025-05-15T09:30:00Z",
      description: "Monthly subscription to Book 3",
      customer: {
        name: "Anna Kowalski",
        email: "anna.k@school.edu.pl"
      }
    },
    {
      id: "pay_4RsT5B",
      amount: 0,
      currency: "EUR",
      status: "completed",
      type: "free_trial",
      date: "2025-05-17T16:20:00Z",
      description: "7-day free trial for Book 2",
      customer: {
        name: "Jan Kowalczyk",
        email: "j.kowalczyk@edulearn.pl"
      }
    },
    {
      id: "pay_0GH1H",
      amount: 30,
      currency: "PLN",
      status: "pending",
      type: "one_time",
      date: "2025-05-17T15:30:00Z",
      description: "Purchase of printed Book 3",
      customer: {
        name: "Zofia Malinowska",
        email: "z.malinowska@gmail.com"
      }
    }
  ];

  // Calculate stats
  const monthlyTotal = payments
    .filter(p => p.status === 'completed' && p.type === 'monthly')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalTransactions = payments.length;

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
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-medium flex items-center">
                <CreditCard className="mr-2 h-4 w-4" /> Payment History
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-indigo-50 border-indigo-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-indigo-700 mr-2" />
                    <p className="text-sm font-medium text-indigo-700">Monthly Subscriptions</p>
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900">€{monthlyTotal}.00</h3>
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
                  <h3 className="text-2xl font-bold text-green-900">€{totalRevenue}.00</h3>
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
                  <h3 className="text-2xl font-bold text-purple-900">{totalTransactions}</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Filters and Tabs */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-2">
                <Tabs defaultValue="all">
                  <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 bg-transparent gap-1">
                    <TabsTrigger value="all">All Payments</TabsTrigger>
                    <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                    <TabsTrigger value="one_time">One-time</TabsTrigger>
                    <TabsTrigger value="trials" className="hidden sm:block">Free Trials</TabsTrigger>
                    <TabsTrigger value="refunds" className="hidden sm:block">Refunds</TabsTrigger>
                    <TabsTrigger value="failed" className="hidden sm:block">Failed</TabsTrigger>
                  </TabsList>
                
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
                    
                    {/* Basic Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          setSearchQuery("");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                
                  <TabsContent value="all" className="py-4">
                    <div className="border rounded-md overflow-hidden bg-white">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                              </th>
                              <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                              </th>
                              <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {payments.map(payment => (
                              <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="py-2 px-3 text-xs">
                                  <a 
                                    href="#" 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toast({
                                        title: "Payment Details",
                                        description: `Viewing details for payment ${payment.id}`,
                                      });
                                    }}
                                    className="text-blue-600 hover:underline font-medium"
                                  >
                                    {payment.id}
                                  </a>
                                </td>
                                <td className="py-2 px-3 text-xs">
                                  <div className="flex flex-col">
                                    <span className="text-gray-900">
                                      May {new Date(payment.date).getDate()}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      {new Date(payment.date).getFullYear()}, {new Date(payment.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                      {new Date(payment.date).getHours() < 12 ? ' AM' : ' PM'}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-2 px-3 text-xs font-medium">
                                  {payment.amount === 0 ? 
                                    <span className="text-gray-900">€0.00</span> : 
                                    payment.currency === 'PLN' ?
                                      <span className="text-gray-900">PLN {payment.amount.toFixed(2)}</span> :
                                      <span className="text-gray-900">€{payment.amount.toFixed(2)}</span>
                                  }
                                </td>
                                <td className="py-2 px-3 text-xs">
                                  <div className="flex flex-col gap-1">
                                    {payment.status === 'completed' ? (
                                      <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Completed
                                      </Badge>
                                    ) : payment.status === 'pending' ? (
                                      <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Pending
                                      </Badge>
                                    ) : (
                                      <Badge className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Failed
                                      </Badge>
                                    )}
                                    
                                    {payment.type === 'free_trial' && (
                                      <Badge variant="outline" className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border-green-200 text-green-700">
                                        Free Trial
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="py-2 px-3 text-xs">
                                  <div className="flex flex-col">
                                    <span className="text-gray-900 font-medium">{payment.customer.name}</span>
                                    <span className="text-gray-500 text-xs">{payment.customer.email}</span>
                                  </div>
                                </td>
                                <td className="py-2 px-3 text-xs text-right">
                                  <div className="flex items-center justify-end space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toast({
                                        title: "Payment Details",
                                        description: `Viewing details for payment ${payment.id}`,
                                      })}
                                      title="View Details"
                                      className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toast({
                                        title: "Invoice Downloaded",
                                        description: `Invoice for payment ${payment.id} has been downloaded.`,
                                      })}
                                      title="Download Invoice"
                                      className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toast({
                                        title: "Receipt Sent",
                                        description: `Receipt for payment ${payment.id} has been sent to ${payment.customer.email}`,
                                      })}
                                      title="Send Receipt"
                                      className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                    >
                                      <Mail className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="subscriptions" className="py-4">
                    <div className="text-center py-12">
                      <p className="text-gray-500">Select a filter option to view subscription payments</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="one_time" className="py-4">
                    <div className="text-center py-12">
                      <p className="text-gray-500">Select a filter option to view one-time payments</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="trials" className="py-4">
                    <div className="text-center py-12">
                      <p className="text-gray-500">Select a filter option to view free trial activations</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="refunds" className="py-4">
                    <div className="text-center py-12">
                      <p className="text-gray-500">Select a filter option to view refunded payments</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="failed" className="py-4">
                    <div className="text-center py-12">
                      <p className="text-gray-500">Select a filter option to view failed payments</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistoryViewer;