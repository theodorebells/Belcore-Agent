
import React, { useMemo, useState } from 'react';
import { SMESubmission, User } from '../types';
import { storage } from '../services/db';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  MoreVertical,
  MessageSquare,
  CreditCard,
  Package,
  Bell,
  ClipboardList,
  Truck,
  Star
} from 'lucide-react';

interface DashboardProps {
  submissions: SMESubmission[];
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ submissions, user }) => {
  const db = storage.get();
  const [selectedBranch, setSelectedBranch] = useState('Port Harcourt (HQ)');

  const branches = ['Port Harcourt (HQ)', 'Lagos Branch', 'BUSINESS OVERALL'];

  // Realistic Nigerian SME Demo Data for Garden City Logistics
  const demoData = useMemo(() => {
    const isHQ = selectedBranch === 'Port Harcourt (HQ)';
    const isOverall = selectedBranch === 'BUSINESS OVERALL';
    
    const hqRevenue = [
      { day: 1, amount: 120000 }, { day: 2, amount: 95000 }, { day: 3, amount: 143000 }, { day: 4, amount: 167000 }, { day: 5, amount: 210000 },
      { day: 6, amount: 185000 }, { day: 7, amount: 198000 }, { day: 8, amount: 176000 }, { day: 9, amount: 222000 }, { day: 10, amount: 205000 },
      { day: 11, amount: 240000 }, { day: 12, amount: 260000 }, { day: 13, amount: 230000 }, { day: 14, amount: 255000 }, { day: 15, amount: 278000 },
      { day: 16, amount: 265000 }, { day: 17, amount: 290000 }, { day: 18, amount: 310000 }, { day: 19, amount: 295000 }, { day: 20, amount: 330000 },
      { day: 21, amount: 345000 }, { day: 22, amount: 360000 }, { day: 23, amount: 342000 }, { day: 24, amount: 370000 }, { day: 25, amount: 390000 },
      { day: 26, amount: 410000 }, { day: 27, amount: 395000 }, { day: 28, amount: 420000 }, { day: 29, amount: 438000 }, { day: 30, amount: 452000 }
    ];

    const lagosRevenue = [
      { day: 1, amount: 80000 }, { day: 2, amount: 75000 }, { day: 3, amount: 93000 }, { day: 4, amount: 117000 }, { day: 5, amount: 150000 },
      { day: 6, amount: 135000 }, { day: 7, amount: 148000 }, { day: 8, amount: 126000 }, { day: 9, amount: 162000 }, { day: 10, amount: 145000 },
      { day: 11, amount: 180000 }, { day: 12, amount: 200000 }, { day: 13, amount: 170000 }, { day: 14, amount: 195000 }, { day: 15, amount: 218000 },
      { day: 16, amount: 205000 }, { day: 17, amount: 230000 }, { day: 18, amount: 250000 }, { day: 19, amount: 235000 }, { day: 20, amount: 270000 },
      { day: 21, amount: 285000 }, { day: 22, amount: 300000 }, { day: 23, amount: 282000 }, { day: 24, amount: 310000 }, { day: 25, amount: 330000 },
      { day: 26, amount: 350000 }, { day: 27, amount: 335000 }, { day: 28, amount: 360000 }, { day: 29, amount: 378000 }, { day: 30, amount: 392000 }
    ];

    const overallRevenue = hqRevenue.map((item, index) => ({
      day: item.day,
      amount: item.amount + lagosRevenue[index].amount
    }));

    return {
      revenueData: isOverall ? overallRevenue : (isHQ ? hqRevenue : lagosRevenue),
      kpis: isOverall ? {
        today: "₦297,600",
        weekly: "₦1,840,000",
        monthly: "₦7,970,000",
        customers: "61",
        outstanding: "₦1,825,000",
        revenueChange: "+13.8%",
        customerChange: "+10%"
      } : (isHQ ? {
        today: "₦185,400",
        monthly: "₦4,820,000",
        customers: "37",
        outstanding: "₦1,145,000",
        revenueChange: "+12.4%",
        customerChange: "+8%"
      } : {
        today: "₦112,200",
        monthly: "₦3,150,000",
        customers: "24",
        outstanding: "₦680,000",
        revenueChange: "+15.2%",
        customerChange: "+12%"
      }),
      activityFeed: isOverall ? [
        { id: 1, type: 'payment', title: 'Payment received from Chidi Ventures', amount: '₦85,000', time: '2 hours ago' },
        { id: 2, type: 'payment', title: 'Payment received from Lekki Mart', amount: '₦55,000', time: '1 hour ago' },
        { id: 3, type: 'order', title: 'New delivery order from Blessing Stores', amount: '₦42,500', time: '5 hours ago' },
        { id: 4, type: 'invoice', title: 'Invoice sent to Rivers Pharma Ltd', amount: '₦120,000', time: '8 hours ago' },
        { id: 5, type: 'automation', title: 'Group-wide follow-up automation triggered', amount: null, time: '14 hours ago' }
      ] : (isHQ ? [
        { id: 1, type: 'payment', title: 'Payment received from Chidi Ventures', amount: '₦85,000', time: '2 hours ago' },
        { id: 2, type: 'order', title: 'New delivery order from Blessing Stores', amount: '₦42,500', time: '5 hours ago' },
        { id: 3, type: 'invoice', title: 'Invoice sent to Rivers Pharma Ltd', amount: '₦120,000', time: '8 hours ago' },
        { id: 4, type: 'booking', title: 'WhatsApp booking completed', amount: '₦18,000', time: '12 hours ago' },
        { id: 5, type: 'automation', title: 'Follow-up automation triggered for 6 inactive customers', amount: null, time: '14 hours ago' },
        { id: 6, type: 'payment', title: 'Payment confirmed from Harcourt Retail Hub', amount: '₦63,000', time: '21 hours ago' }
      ] : [
        { id: 1, type: 'payment', title: 'Payment received from Lekki Mart', amount: '₦55,000', time: '1 hour ago' },
        { id: 2, type: 'order', title: 'New delivery order from Ikeja Logistics', amount: '₦32,500', time: '4 hours ago' },
        { id: 3, type: 'invoice', title: 'Invoice sent to Mainland Pharma', amount: '₦90,000', time: '7 hours ago' },
        { id: 4, type: 'booking', title: 'WhatsApp booking completed', amount: '₦15,000', time: '11 hours ago' },
        { id: 5, type: 'automation', title: 'Follow-up automation triggered for 4 inactive customers', amount: null, time: '13 hours ago' },
        { id: 6, type: 'payment', title: 'Payment confirmed from VI Retail Hub', amount: '₦43,000', time: '20 hours ago' }
      ]),
      automations: [
        { name: 'WhatsApp Booking Automation', status: 'Active' },
        { name: 'Invoice Auto-Generation', status: 'Active' },
        { name: 'Customer Follow-ups', status: 'Active' },
        { name: 'Payment Confirmation Alerts', status: 'Active' }
      ],
      insights: isOverall ? [
        { text: "Total group revenue is up 13.8%. Lagos branch is growing faster than HQ.", type: 'positive' },
        { text: "Group-wide outstanding invoices at ₦1.82M. Centralized collection could help.", type: 'warning' }
      ] : (isHQ ? [
        { text: "Revenue has increased by 12% in the last 30 days. Logistics demand is rising.", type: 'positive' },
        { text: "You have ₦1.14M in unpaid invoices. Following up could improve cash flow.", type: 'warning' },
        { text: "Customer activity peaks between 2PM–6PM. Consider prioritizing deliveries in this window.", type: 'info' }
      ] : [
        { text: "Lagos branch revenue up 15% this month. E-commerce deliveries are the main driver.", type: 'positive' },
        { text: "Outstanding invoices at ₦680k. Automated reminders are recovering 80% of debts.", type: 'positive' },
        { text: "Traffic patterns suggest early morning dispatches (5AM) save 2 hours per driver.", type: 'info' }
      ])
    };
  }, [selectedBranch]);

  const stats = useMemo(() => {
    const mySubmissions = user?.role === 'CLIENT' && user.businessId
      ? submissions.filter(s => s.id === user.businessId)
      : submissions;

    const total = mySubmissions.length;
    const completed = mySubmissions.filter(s => s.status === 'Completed').length;
    const inProgress = mySubmissions.filter(s => s.status === 'Implementation').length;
    
    const healthScore = total > 0 ? Math.min(100, Math.round(((completed * 2 + inProgress) / total) * 50 + 50)) : 50;
    const totalRevenue = db.transactions.reduce((acc, t) => acc + t.amount, 0);

    return {
      total,
      completed,
      inProgress,
      healthScore,
      totalRevenue,
      mySubmissions
    };
  }, [submissions, user, db.transactions]);

  // View for STAFF: Focused on Operations & Logistics
  if (user?.role === 'STAFF') {
    const [tasks, setTasks] = useState([
      { id: 1, title: "Deliver package to Chidi Ventures", priority: "High", due: "2:30 PM", status: "In Progress" },
      { id: 2, title: "Confirm payment from Blessing Stores", priority: "Medium", due: "4:00 PM", status: "Pending" },
      { id: 3, title: "Pickup shipment from Rivers Pharma Ltd", priority: "High", due: "1:15 PM", status: "Pending" },
      { id: 4, title: "Call 3 inactive customers", priority: "Low", due: "5:30 PM", status: "Pending" },
      { id: 5, title: "Update delivery status for Order #GCL-1024", priority: "Medium", due: "Today", status: "Completed" },
      { id: 6, title: "Verify address for Harcourt Retail Hub", priority: "Low", due: "Tomorrow", status: "Pending" }
    ]);

    const [orders, setOrders] = useState([
      { id: "GCL-1024", customer: "Chidi Ventures", location: "Port Harcourt", amount: "₦85,000", status: "In Transit", statusColor: "text-blue-600 bg-blue-50" },
      { id: "GCL-1025", customer: "Blessing Stores", location: "Obio-Akpor", amount: "₦42,500", status: "Pending Pickup", statusColor: "text-amber-600 bg-amber-50" },
      { id: "GCL-1026", customer: "Rivers Pharma Ltd", location: "GRA Phase 2", amount: "₦120,000", status: "Delivered", statusColor: "text-emerald-600 bg-emerald-50" },
      { id: "GCL-1027", customer: "Harcourt Retail Hub", location: "Rumuola", amount: "₦63,000", status: "Issue Reported", statusColor: "text-red-600 bg-red-50" }
    ]);

    const handleUpdateTask = (taskId: number) => {
      setTasks(prev => {
        const updatedTasks = prev.map(task => {
          if (task.id === taskId) {
            const nextStatus = task.status === 'Pending' ? 'In Progress' : 
                              task.status === 'In Progress' ? 'Completed' : 'Pending';
            
            // Link Task 5 to Order GCL-1024
            if (taskId === 5 && nextStatus === 'Completed') {
              setOrders(prevOrders => prevOrders.map(o => 
                o.id === 'GCL-1024' ? { ...o, status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50' } : o
              ));
            } else if (taskId === 5 && nextStatus !== 'Completed') {
              setOrders(prevOrders => prevOrders.map(o => 
                o.id === 'GCL-1024' ? { ...o, status: 'In Transit', statusColor: 'text-blue-600 bg-blue-50' } : o
              ));
            }

            return { ...task, status: nextStatus };
          }
          return task;
        });
        return updatedTasks;
      });
    };

    const staffData = {
      profile: {
        name: "Michael Okoro",
        role: "Dispatch Officer",
        dept: "Operations",
        status: "On Duty",
        shift: "Morning Shift",
        tasksToday: 6
      },
      performance: {
        completed: tasks.filter(t => t.status === 'Completed').length,
        ordersHandled: 11,
        onTimeRate: "96%",
        rating: "4.7 / 5",
        prodChange: "+9%",
        delayChange: "-2%"
      },
      notifications: [
        { id: 1, text: "New delivery assigned", time: "8 mins ago" },
        { id: 2, text: "Customer requested ETA update", time: "21 mins ago" },
        { id: 3, text: "Payment confirmed for Order #GCL-1024", time: "35 mins ago" },
        { id: 4, text: "Route optimized by BELCORE AI", time: "1 hour ago" },
        { id: 5, text: "Follow-up message auto-sent to 3 customers", time: "2 hours ago" }
      ],
      automation: {
        route: true,
        followup: true,
        invoice: true,
        payment: true,
        tasksAutomated: 27,
        timeSaved: "3.2 hours",
        lastRun: "9 minutes ago"
      }
    };

    return (
      <div className="space-y-10 animate-in fade-in duration-700 px-2 sm:px-0 pb-20">
        {/* Staff Profile Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-900 rounded-[30px] flex items-center justify-center text-white text-3xl font-black shadow-2xl relative">
              MO
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-[#FDFDFD] rounded-full"></span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">{staffData.profile.name}</h2>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[8px] font-black rounded-full uppercase tracking-widest">On Duty</span>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {staffData.profile.role} | {staffData.profile.dept} | {staffData.profile.shift}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex-grow lg:flex-grow-0 text-left sm:text-right bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tasks Today</p>
              <p className="text-3xl font-black text-gray-900 tracking-tighter">{staffData.profile.tasksToday}</p>
            </div>
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            label="Tasks Completed" 
            value={staffData.performance.completed.toString()} 
            change={staffData.performance.prodChange} 
            icon={<CheckCircle2 className="w-5 h-5" />} 
            trend="up"
          />
          <KPICard 
            label="Orders Handled" 
            value={staffData.performance.ordersHandled.toString()} 
            icon={<Truck className="w-5 h-5" />} 
          />
          <KPICard 
            label="On-Time Rate" 
            value={staffData.performance.onTimeRate} 
            change={staffData.performance.delayChange} 
            icon={<Clock className="w-5 h-5" />} 
            trend="up"
          />
          <KPICard 
            label="Customer Rating" 
            value={staffData.performance.rating} 
            icon={<Star className="w-5 h-5" />} 
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Today's Assigned Tasks */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Assigned Workload</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today's Operations Queue</p>
              </div>
              <ClipboardList className="w-6 h-6 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-50">
              {tasks.map((task) => (
                <div key={task.id} className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors text-lg">{task.title}</p>
                       {task.status === 'Completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        task.priority === 'High' ? 'text-red-500' : 
                        task.priority === 'Medium' ? 'text-amber-500' : 'text-gray-400'
                      }`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Due: {task.due}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {task.status}
                    </span>
                    <button 
                      onClick={() => handleUpdateTask(task.id)}
                      className="px-5 py-2.5 bg-gray-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-4 bg-white p-8 sm:p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Operational Alerts</h3>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              {staffData.notifications.map((notif) => (
                <div key={notif.id} className="flex gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">{notif.text}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all">Clear All Notifications</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Orders Queue */}
          <div className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Active Orders</h3>
              <Truck className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{order.id}</span>
                      <p className="text-sm font-black text-gray-900">{order.customer}</p>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.location} | {order.amount}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Assist Status */}
          <div className="bg-gray-900 p-10 rounded-[45px] text-white shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-8xl grayscale">🤖</div>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-tighter">AI Copilot Status</h3>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full uppercase tracking-widest">Active</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AutomationToggle label="Route Optimization" active={staffData.automation.route} />
              <AutomationToggle label="Customer Follow-up" active={staffData.automation.followup} />
              <AutomationToggle label="Invoice Generation" active={staffData.automation.invoice} />
              <AutomationToggle label="Payment Confirmation" active={staffData.automation.payment} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">AI Tasks Today</p>
                <p className="text-2xl font-black text-white">{staffData.automation.tasksAutomated}</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Time Saved</p>
                <p className="text-2xl font-black text-white">{staffData.automation.timeSaved}</p>
              </div>
            </div>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">Last sync: {staffData.automation.lastRun}</p>
          </div>
        </div>
      </div>
    );
  }

  // View for CLIENT: Focused on their specific Business Monitor
  if (user?.role === 'CLIENT') {
    const mySub = stats.mySubmissions[0];
    const isOverall = selectedBranch === 'BUSINESS OVERALL';

    return (
      <div className="space-y-10 animate-in fade-in duration-700 px-2 sm:px-0 pb-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">
                {isOverall ? 'Group Command Center' : 'Branch Monitoring Hub'}
              </p>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[8px] font-black rounded-full uppercase tracking-widest">Active</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              {isOverall ? 'Business Overall' : (mySub?.businessName || 'Garden City Logistics')}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {isOverall ? 'Aggregated Performance Across All Branches' : `Logistics & Delivery Services ${selectedBranch.split(' ')[0]}, Nigeria`}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Branch Switcher */}
            <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
              {branches.map(branch => (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedBranch === branch 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>

            <div className="flex-grow lg:flex-grow-0 text-left sm:text-right bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm w-full sm:w-auto">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Automation Readiness</p>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-black text-gray-900 tracking-tighter">45%</p>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isOverall ? (
            <>
              <KPICard 
                label="Total Sales Today" 
                value={demoData.kpis.today} 
                change={demoData.kpis.revenueChange} 
                icon={<TrendingUp className="w-5 h-5" />} 
                trend="up"
                highlight={true}
              />
              <KPICard 
                label="Total Sales This Week" 
                value={demoData.kpis.weekly!} 
                icon={<TrendingUp className="w-5 h-5" />} 
                trend="up"
              />
              <KPICard 
                label="Total Sales This Month" 
                value={demoData.kpis.monthly} 
                icon={<CreditCard className="w-5 h-5" />} 
              />
              <KPICard 
                label="Total Outstanding" 
                value={demoData.kpis.outstanding} 
                icon={<FileText className="w-5 h-5" />} 
                trend="warning"
              />
            </>
          ) : (
            <>
              <KPICard 
                label="Today Revenue" 
                value={demoData.kpis.today} 
                change={demoData.kpis.revenueChange} 
                icon={<TrendingUp className="w-5 h-5" />} 
                trend="up"
              />
              <KPICard 
                label="Monthly Revenue" 
                value={demoData.kpis.monthly} 
                icon={<CreditCard className="w-5 h-5" />} 
              />
              <KPICard 
                label="New Customers" 
                value={demoData.kpis.customers} 
                change={demoData.kpis.customerChange} 
                icon={<Users className="w-5 h-5" />} 
                trend="up"
              />
              <KPICard 
                label="Outstanding Invoices" 
                value={demoData.kpis.outstanding} 
                icon={<FileText className="w-5 h-5" />} 
                trend="warning"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Revenue Growth</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last 30 Days Performance</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">+12.4%</span>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demoData.revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                    label={{ value: 'Day of Month', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                    tickFormatter={(value) => `₦${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900 }}
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-4 bg-white p-8 sm:p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Recent Activity</h3>
              <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-6">
              {demoData.activityFeed.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    item.type === 'payment' ? 'bg-emerald-50 text-emerald-600' :
                    item.type === 'order' ? 'bg-blue-50 text-blue-600' :
                    item.type === 'invoice' ? 'bg-purple-50 text-purple-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {item.type === 'payment' && <CreditCard className="w-5 h-5" />}
                    {item.type === 'order' && <Package className="w-5 h-5" />}
                    {item.type === 'invoice' && <FileText className="w-5 h-5" />}
                    {item.type === 'automation' && <Zap className="w-5 h-5" />}
                    {item.type === 'booking' && <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">{item.title}</p>
                    <div className="flex items-center gap-2">
                      {item.amount && <span className="text-[10px] font-black text-gray-900">{item.amount}</span>}
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all">View All Logs</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Automation Status */}
          <div className="bg-gray-900 p-10 rounded-[45px] text-white shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-8xl grayscale">⚡</div>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-tighter">Automation Hub</h3>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full uppercase tracking-widest">4 Active</span>
            </div>
            <div className="space-y-4">
              {demoData.automations.map((auto, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-gray-300">{auto.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Tasks Today</p>
                <p className="text-2xl font-black text-white">53</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Time Saved</p>
                <p className="text-2xl font-black text-white">7.4h</p>
              </div>
            </div>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">Last run: 12 minutes ago</p>
          </div>

          {/* AI Insights */}
          <div className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">AI Insights</h3>
            </div>
            <div className="space-y-6">
              {demoData.insights.map((insight, i) => (
                <div key={i} className={`p-6 rounded-3xl border ${
                  insight.type === 'positive' ? 'bg-emerald-50 border-emerald-100' :
                  insight.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                  'bg-blue-50 border-blue-100'
                }`}>
                  <div className="flex gap-3">
                    {insight.type === 'positive' ? <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" /> :
                     insight.type === 'warning' ? <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" /> :
                     <Zap className="w-5 h-5 text-blue-600 shrink-0" />}
                    <p className="text-sm font-bold text-gray-800 leading-relaxed italic">"{insight.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Health */}
          <div className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-xl space-y-8">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Compliance Hub</h3>
            <div className="space-y-6">
              <HealthItem label="Record Health" status="Good" color="bg-emerald-500" />
              <HealthItem label="VAT Monitoring" status="Watching threshold" color="bg-amber-500" />
              <HealthItem label="Missing Invoices" status="1 detected" color="bg-red-500" />
              <HealthItem label="Risk Level" status="Low" color="bg-emerald-500" />
            </div>
            <div className="pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Overall Status</span>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Healthy</span>
              </div>
              <div className="h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-1">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <button className="w-full py-5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-xl">Generate FIRS Report</button>
          </div>

          {/* Security Uplink / Field Engineer */}
          <div className="bg-gray-900 p-10 rounded-[45px] text-white space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-8xl grayscale">🛡️</div>
            <div className="flex justify-between items-start">
               <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Security Uplink</p>
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]"></span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-emerald-400 tracking-tighter">PH-DESK-SYNC</p>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Regional Support Hub</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-gray-400 font-medium leading-relaxed">Direct connection to Belcore Engineering headquarters in Port Harcourt.</p>
              <button className="w-full py-5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500 transition-all shadow-xl">Request Field Engineer</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / Admin Dashboard View
  return (
    <div className="space-y-10 animate-in fade-in duration-700 px-2 sm:px-0">
      <div className="space-y-2">
        <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Network Infrastructure Overview</p>
        <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter uppercase">Global Command</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard label="Total Nodes" value={stats.total} />
        <StatCard label="Managed Capital" value={`₦${(stats.totalRevenue / 1000).toFixed(0)}k`} />
        <StatCard label="Live Audits" value={stats.inProgress} />
        <StatCard label="Efficiency Score" value={`${stats.healthScore}%`} />
      </div>
    </div>
  );
};

const KPICard = ({ label, value, change, icon, trend, highlight }: { label: string, value: string, change?: string, icon: React.ReactNode, trend?: 'up' | 'down' | 'warning', highlight?: boolean }) => (
  <div className={`p-8 rounded-[40px] border shadow-xl space-y-4 group transition-all ${
    highlight 
      ? 'bg-gray-900 border-gray-900 text-white hover:border-emerald-500' 
      : 'bg-white border-gray-100 text-gray-900 hover:border-emerald-200'
  }`}>
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${
        highlight ? 'bg-white/10 text-emerald-400' :
        trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
        trend === 'warning' ? 'bg-amber-50 text-amber-600' :
        'bg-gray-50 text-gray-600'
      }`}>
        {icon}
      </div>
      {change && (
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
          highlight ? 'bg-emerald-500 text-white' :
          trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </span>
      )}
    </div>
    <div>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highlight ? 'text-gray-400' : 'text-gray-400'}`}>{label}</p>
      <p className={`text-3xl font-black tracking-tighter ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </div>
  </div>
);

const HealthItem = ({ label, status, color }: { label: string, status: string, color: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-xs font-bold text-gray-500">{label}</span>
    </div>
    <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">{status}</span>
  </div>
);

const AutomationToggle = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
    <span className="text-[10px] font-bold text-gray-400 leading-tight">{label}</span>
    <div className={`w-3 h-3 rounded-full ${active ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-gray-600'}`}></div>
  </div>
);

const StatCard = ({ label, value }: { label: string, value: string | number }) => (
  <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-lg space-y-3 hover:shadow-2xl hover:border-emerald-100 transition-all group hover:-translate-y-1">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">{label}</p>
    <p className="text-4xl font-black text-gray-900 tracking-tighter">{value}</p>
  </div>
);

export default Dashboard;
