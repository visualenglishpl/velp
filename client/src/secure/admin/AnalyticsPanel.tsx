import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon,
  Download,
  Calendar,
  Users,
  BookOpen,
  Eye,
  Clock,
  TrendingUp,
  Filter
} from "lucide-react";

// Define types for analytics data
type UserAnalytics = {
  totalUsers: number;
  totalTeachers: number;
  totalSchools: number;
  activeUsers: number;
  newUsers: number;
  usersByRole: { name: string; value: number }[];
  userRegistrationsByMonth: { name: string; count: number }[];
  userEngagementByDay: { name: string; active: number }[];
  userRetention: { name: string; value: number }[];
};

type ContentAnalytics = {
  totalViews: number;
  totalBooks: number;
  totalUnits: number;
  totalSlides: number;
  viewsByBook: { name: string; views: number }[];
  viewsByUnit: { book: string; unit: string; views: number }[];
  viewsOverTime: { date: string; views: number }[];
  popularContent: { id: string; title: string; type: string; views: number }[];
};

type SubscriptionAnalytics = {
  totalSubscriptions: number;
  activeSubscriptions: number;
  subscriptionsByType: { name: string; value: number }[];
  subscriptionsByMonth: { name: string; count: number }[];
  subscriptionRetention: { name: string; value: number }[];
  revenue: { name: string; monthly: number; yearly: number; total: number }[];
  conversionRate: { name: string; rate: number }[];
};

type PerformanceData = {
  date: string;
  pageLoadTime: number;
  apiResponseTime: number;
  errorRate: number;
  serverCpu: number;
  serverMemory: number;
};

const AnalyticsPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Tab state
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filter states
  const [dateRange, setDateRange] = useState("last30days");
  const [bookFilter, setBookFilter] = useState("all");
  
  // Data states
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null);
  const [contentAnalytics, setContentAnalytics] = useState<ContentAnalytics | null>(null);
  const [subscriptionAnalytics, setSubscriptionAnalytics] = useState<SubscriptionAnalytics | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];
  
  // Load analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Mock API calls for development - in production, these would be actual API calls
        // const userResponse = await fetch(`/api/admin/analytics/users?timeframe=${dateRange}`);
        // const contentResponse = await fetch(`/api/admin/analytics/content?timeframe=${dateRange}&book=${bookFilter}`);
        // const subscriptionResponse = await fetch(`/api/admin/analytics/subscriptions?timeframe=${dateRange}`);
        // const performanceResponse = await fetch(`/api/admin/analytics/performance?timeframe=${dateRange}`);
        
        // Mock data for development
        const mockUserAnalytics: UserAnalytics = {
          totalUsers: 358,
          totalTeachers: 215,
          totalSchools: 43,
          activeUsers: 187,
          newUsers: 27,
          usersByRole: [
            { name: 'Teachers', value: 215 },
            { name: 'Schools', value: 43 },
            { name: 'Admins', value: 3 },
            { name: 'Students', value: 97 }
          ],
          userRegistrationsByMonth: [
            { name: 'Jan', count: 12 },
            { name: 'Feb', count: 19 },
            { name: 'Mar', count: 23 },
            { name: 'Apr', count: 29 },
            { name: 'May', count: 34 },
            { name: 'Jun', count: 45 },
            { name: 'Jul', count: 47 },
            { name: 'Aug', count: 38 },
            { name: 'Sep', count: 32 },
            { name: 'Oct', count: 27 },
            { name: 'Nov', count: 29 },
            { name: 'Dec', count: 23 }
          ],
          userEngagementByDay: [
            { name: 'Mon', active: 145 },
            { name: 'Tue', active: 156 },
            { name: 'Wed', active: 172 },
            { name: 'Thu', active: 168 },
            { name: 'Fri', active: 154 },
            { name: 'Sat', active: 85 },
            { name: 'Sun', active: 72 }
          ],
          userRetention: [
            { name: '1 Month', value: 92 },
            { name: '3 Months', value: 84 },
            { name: '6 Months', value: 78 },
            { name: '12 Months', value: 65 }
          ]
        };
        
        const mockContentAnalytics: ContentAnalytics = {
          totalViews: 15792,
          totalBooks: 10,
          totalUnits: 182,
          totalSlides: 2735,
          viewsByBook: [
            { name: 'Book 1', views: 3854 },
            { name: 'Book 2', views: 2982 },
            { name: 'Book 3', views: 2541 },
            { name: 'Book 4', views: 1975 },
            { name: 'Book 5', views: 1607 },
            { name: 'Book 6', views: 1293 },
            { name: 'Book 7', views: 987 },
            { name: 'Book 0a', views: 178 },
            { name: 'Book 0b', views: 210 },
            { name: 'Book 0c', views: 165 }
          ],
          viewsByUnit: [
            { book: 'Book 1', unit: 'Unit 1', views: 457 },
            { book: 'Book 1', unit: 'Unit 2', views: 384 },
            { book: 'Book 1', unit: 'Unit 3', views: 412 },
            { book: 'Book 2', unit: 'Unit 1', views: 389 },
            { book: 'Book 2', unit: 'Unit 2', views: 357 },
            { book: 'Book 3', unit: 'Unit 1', views: 342 },
            { book: 'Book 3', unit: 'Unit 4', views: 321 },
            { book: 'Book 4', unit: 'Unit 2', views: 305 },
            { book: 'Book 5', unit: 'Unit 1', views: 287 },
            { book: 'Book 6', unit: 'Unit 3', views: 251 }
          ],
          viewsOverTime: [
            { date: '2025-04-19', views: 423 },
            { date: '2025-04-20', views: 387 },
            { date: '2025-04-21', views: 498 },
            { date: '2025-04-22', views: 512 },
            { date: '2025-04-23', views: 532 },
            { date: '2025-04-24', views: 487 },
            { date: '2025-04-25', views: 512 },
            { date: '2025-04-26', views: 345 },
            { date: '2025-04-27', views: 312 },
            { date: '2025-04-28', views: 543 },
            { date: '2025-04-29', views: 578 },
            { date: '2025-04-30', views: 543 },
            { date: '2025-05-01', views: 523 },
            { date: '2025-05-02', views: 498 },
            { date: '2025-05-03', views: 392 },
            { date: '2025-05-04', views: 387 },
            { date: '2025-05-05', views: 543 },
            { date: '2025-05-06', views: 567 },
            { date: '2025-05-07', views: 578 },
            { date: '2025-05-08', views: 534 },
            { date: '2025-05-09', views: 512 },
            { date: '2025-05-10', views: 398 },
            { date: '2025-05-11', views: 378 },
            { date: '2025-05-12', views: 568 },
            { date: '2025-05-13', views: 542 },
            { date: '2025-05-14', views: 543 },
            { date: '2025-05-15', views: 523 },
            { date: '2025-05-16', views: 512 },
            { date: '2025-05-17', views: 387 },
            { date: '2025-05-18', views: 392 }
          ],
          popularContent: [
            { id: '1-3-08-M-A', title: 'Book 1, Unit 3 - What is It?', type: 'slide', views: 278 },
            { id: '2-5-12-C-B', title: 'Book 2, Unit 5 - Do you collect stamps?', type: 'slide', views: 251 },
            { id: '1-7-15-F-D', title: 'Book 1, Unit 7 - Fruit Song', type: 'video', views: 243 },
            { id: '3-4-10-A-C', title: 'Book 3, Unit 4 - Solar System Planets', type: 'slide', views: 237 },
            { id: '1-2-22-B-C', title: 'Book 1, Unit 2 - Colors Video', type: 'video', views: 235 },
            { id: '4-6-30-A-F', title: 'Book 4, Unit 6 - What is your favourite subject?', type: 'slide', views: 223 },
            { id: '2-1-05-D-E', title: 'Book 2, Unit 1 - Seasons Song', type: 'video', views: 218 },
            { id: '1-10-19-H-G', title: 'Book 1, Unit 10 - Action Words Game', type: 'game', views: 214 },
            { id: '3-8-25-B-F', title: 'Book 3, Unit 8 - Where is Venus?', type: 'slide', views: 207 },
            { id: '2-3-14-F-D', title: 'Book 2, Unit 3 - Rooms of the House', type: 'video', views: 201 }
          ]
        };
        
        const mockSubscriptionAnalytics: SubscriptionAnalytics = {
          totalSubscriptions: 245,
          activeSubscriptions: 187,
          subscriptionsByType: [
            { name: 'Monthly Book', value: 112 },
            { name: 'Yearly Book', value: 58 },
            { name: 'Monthly Unit', value: 27 },
            { name: 'Yearly Unit', value: 15 },
            { name: 'Free Trial', value: 33 }
          ],
          subscriptionsByMonth: [
            { name: 'Jan', count: 15 },
            { name: 'Feb', count: 18 },
            { name: 'Mar', count: 22 },
            { name: 'Apr', count: 27 },
            { name: 'May', count: 32 },
            { name: 'Jun', count: 36 },
            { name: 'Jul', count: 29 },
            { name: 'Aug', count: 24 },
            { name: 'Sep', count: 19 },
            { name: 'Oct', count: 17 },
            { name: 'Nov', count: 14 },
            { name: 'Dec', count: 12 }
          ],
          subscriptionRetention: [
            { name: '1 Month', value: 88 },
            { name: '3 Months', value: 76 },
            { name: '6 Months', value: 68 },
            { name: '12 Months', value: 52 }
          ],
          revenue: [
            { name: 'Jan', monthly: 560, yearly: 2320, total: 2880 },
            { name: 'Feb', monthly: 580, yearly: 2180, total: 2760 },
            { name: 'Mar', monthly: 620, yearly: 2460, total: 3080 },
            { name: 'Apr', monthly: 680, yearly: 2920, total: 3600 },
            { name: 'May', monthly: 710, yearly: 3120, total: 3830 },
            { name: 'Jun', monthly: 780, yearly: 3320, total: 4100 },
            { name: 'Jul', monthly: 750, yearly: 3220, total: 3970 },
            { name: 'Aug', monthly: 720, yearly: 2980, total: 3700 },
            { name: 'Sep', monthly: 660, yearly: 2840, total: 3500 },
            { name: 'Oct', monthly: 630, yearly: 2760, total: 3390 },
            { name: 'Nov', monthly: 590, yearly: 2620, total: 3210 },
            { name: 'Dec', monthly: 540, yearly: 2480, total: 3020 }
          ],
          conversionRate: [
            { name: 'Free Trial to Paid', rate: 68 },
            { name: 'Monthly to Yearly', rate: 32 },
            { name: 'Single Unit to Full Book', rate: 47 },
            { name: 'First Time to Renewal', rate: 76 }
          ]
        };
        
        const mockPerformanceData: PerformanceData[] = [
          { date: '2025-05-12', pageLoadTime: 1.3, apiResponseTime: 0.42, errorRate: 0.12, serverCpu: 15, serverMemory: 24 },
          { date: '2025-05-13', pageLoadTime: 1.2, apiResponseTime: 0.38, errorRate: 0.09, serverCpu: 18, serverMemory: 26 },
          { date: '2025-05-14', pageLoadTime: 1.4, apiResponseTime: 0.45, errorRate: 0.14, serverCpu: 22, serverMemory: 28 },
          { date: '2025-05-15', pageLoadTime: 1.3, apiResponseTime: 0.41, errorRate: 0.11, serverCpu: 19, serverMemory: 27 },
          { date: '2025-05-16', pageLoadTime: 1.2, apiResponseTime: 0.39, errorRate: 0.08, serverCpu: 17, serverMemory: 25 },
          { date: '2025-05-17', pageLoadTime: 1.1, apiResponseTime: 0.37, errorRate: 0.07, serverCpu: 14, serverMemory: 23 },
          { date: '2025-05-18', pageLoadTime: 1.0, apiResponseTime: 0.35, errorRate: 0.06, serverCpu: 12, serverMemory: 21 }
        ];
        
        setUserAnalytics(mockUserAnalytics);
        setContentAnalytics(mockContentAnalytics);
        setSubscriptionAnalytics(mockSubscriptionAnalytics);
        setPerformanceData(mockPerformanceData);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [dateRange, bookFilter]);

  // Handle export data
  const handleExportData = () => {
    // In a real implementation, this would create a CSV or Excel file
    toast({
      title: "Export Started",
      description: "Analytics data export has been initiated. The file will be ready shortly.",
    });
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
                <BarChart3 className="mr-2 h-5 w-5" /> Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Monitor platform usage, content engagement, and subscription metrics
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="last12months">Last 12 Months</SelectItem>
                  <SelectItem value="yearToDate">Year to Date</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" /> Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Analytics</TabsTrigger>
              <TabsTrigger value="content">Content Engagement</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="performance">System Performance</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Total Users</h3>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold">{userAnalytics?.totalUsers}</div>
                      <div className="ml-2 text-sm text-green-500">
                        +{userAnalytics?.newUsers} new
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {userAnalytics?.activeUsers} active users
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Content Views</h3>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{contentAnalytics?.totalViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {contentAnalytics?.totalBooks} books, {contentAnalytics?.totalUnits} units
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Active Subscriptions</h3>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{subscriptionAnalytics?.activeSubscriptions}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((subscriptionAnalytics?.activeSubscriptions || 0) / (subscriptionAnalytics?.totalSubscriptions || 1) * 100)}% renewal rate
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Avg. Page Load</h3>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">
                      {performanceData.length > 0 ? 
                        (performanceData.reduce((sum, item) => sum + item.pageLoadTime, 0) / performanceData.length).toFixed(2) : 0}s
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {performanceData.length > 0 ? 
                        (performanceData.reduce((sum, item) => sum + item.errorRate, 0) / performanceData.length * 100).toFixed(2) : 0}% error rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Content Views Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={contentAnalytics?.viewsOverTime.slice(-14)}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [value, 'Views']}
                            labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          />
                          <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={subscriptionAnalytics?.revenue.slice(-6)}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`€${value}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="monthly" name="Monthly Plans" stackId="a" fill="#8884d8" />
                          <Bar dataKey="yearly" name="Yearly Plans" stackId="a" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">User Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userAnalytics?.usersByRole}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            label
                          >
                            {userAnalytics?.usersByRole.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any, name: any) => [`${value} users`, name]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Subscription Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subscriptionAnalytics?.subscriptionsByType}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            label
                          >
                            {subscriptionAnalytics?.subscriptionsByType.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any, name: any) => [`${value} subscriptions`, name]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Daily Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={userAnalytics?.userEngagementByDay}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`${value} users`, 'Active']} />
                          <Bar dataKey="active" name="Active Users" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Analytics Tab */}
            <TabsContent value="users" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">New User Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={userAnalytics?.userRegistrationsByMonth}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`${value} users`, 'New Registrations']} />
                          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">User Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={userAnalytics?.userRetention}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`${value}%`, 'Retention Rate']} />
                          <Bar dataKey="value" name="Retention Rate" fill="#8884d8">
                            {userAnalytics?.userRetention.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.value > 75 ? '#4ade80' : entry.value > 60 ? '#facc15' : '#f87171'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">User Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userAnalytics?.usersByRole}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {userAnalytics?.usersByRole.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any, name: any) => [`${value} users`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weekly User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={userAnalytics?.userEngagementByDay}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => [`${value} users`, 'Active']} />
                        <Bar dataKey="active" name="Active Users" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Engagement Tab */}
            <TabsContent value="content" className="space-y-4">
              <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex gap-2 items-center">
                  <Filter className="h-4 w-4" />
                  <Label>Book Filter:</Label>
                  <div className="w-[150px]">
                    <Select value={bookFilter} onValueChange={setBookFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Books" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Books</SelectItem>
                        <SelectItem value="0a">Book 0a</SelectItem>
                        <SelectItem value="0b">Book 0b</SelectItem>
                        <SelectItem value="0c">Book 0c</SelectItem>
                        <SelectItem value="1">Book 1</SelectItem>
                        <SelectItem value="2">Book 2</SelectItem>
                        <SelectItem value="3">Book 3</SelectItem>
                        <SelectItem value="4">Book 4</SelectItem>
                        <SelectItem value="5">Book 5</SelectItem>
                        <SelectItem value="6">Book 6</SelectItem>
                        <SelectItem value="7">Book 7</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Views by Book</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={contentAnalytics?.viewsByBook.filter(book => 
                            bookFilter === 'all' || book.name.includes(`Book ${bookFilter}`)
                          )}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" width={80} />
                          <Tooltip formatter={(value: any) => [`${value} views`, 'Total Views']} />
                          <Bar dataKey="views" name="Views" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Views Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={contentAnalytics?.viewsOverTime.slice(-30)}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [`${value} views`, 'Views']}
                            labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          />
                          <Line type="monotone" dataKey="views" stroke="#82ca9d" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Most Popular Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="py-3 px-4 text-left font-medium">Content ID</th>
                          <th className="py-3 px-4 text-left font-medium">Title</th>
                          <th className="py-3 px-4 text-left font-medium">Type</th>
                          <th className="py-3 px-4 text-right font-medium">Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentAnalytics?.popularContent
                          .filter(content => bookFilter === 'all' || content.id.startsWith(bookFilter))
                          .map((content, i) => (
                          <tr key={content.id} className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                            <td className="py-3 px-4">{content.id}</td>
                            <td className="py-3 px-4">{content.title}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                content.type === "slide" 
                                  ? "bg-blue-100 text-blue-700" 
                                  : content.type === "video" 
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-green-100 text-green-700"
                              }`}>
                                {content.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">{content.views}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Subscription Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={subscriptionAnalytics?.revenue}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`€${value}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="monthly" name="Monthly Plans" fill="#8884d8" />
                          <Bar dataKey="yearly" name="Yearly Plans" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">New Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={subscriptionAnalytics?.subscriptionsByMonth}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`${value}`, 'New Subscriptions']} />
                          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Subscription Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subscriptionAnalytics?.subscriptionsByType}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {subscriptionAnalytics?.subscriptionsByType.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any, name: any) => [`${value} subscriptions`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Conversion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={subscriptionAnalytics?.conversionRate}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" width={150} />
                          <Tooltip formatter={(value: any) => [`${value}%`, 'Conversion Rate']} />
                          <Bar dataKey="rate" name="Conversion Rate" fill="#82ca9d">
                            {subscriptionAnalytics?.conversionRate.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.rate > 70 ? '#4ade80' : entry.rate > 50 ? '#facc15' : '#f87171'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* System Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Page Load Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={performanceData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [`${value}s`, 'Load Time']}
                            labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          />
                          <Line type="monotone" dataKey="pageLoadTime" stroke="#8884d8" name="Page Load Time" />
                          <Line type="monotone" dataKey="apiResponseTime" stroke="#82ca9d" name="API Response Time" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Error Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={performanceData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                          <Tooltip 
                            formatter={(value: any) => [`${(value * 100).toFixed(2)}%`, 'Error Rate']}
                            labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          />
                          <Line type="monotone" dataKey="errorRate" stroke="#ef4444" name="Error Rate" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Server Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 30,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          formatter={(value: any, name: any) => {
                            return [
                              `${value}${name === "serverCpu" ? "%" : name === "serverMemory" ? "%" : ""}`,
                              name === "serverCpu" ? "CPU Usage" : "Memory Usage"
                            ];
                          }}
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        />
                        <Legend />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="serverCpu" 
                          stroke="#8884d8" 
                          name="CPU Usage" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          yAxisId="right" 
                          type="monotone" 
                          dataKey="serverMemory" 
                          stroke="#82ca9d" 
                          name="Memory Usage" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPanel;