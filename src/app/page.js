'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Headerr';
import KPICards from '@/app/components/KPII';
import TemperatureChart from '@/app/components/TempChartt';
import FleetTable from '@/app/components/FleetTablee';
import SmartGateFeed from '@/app/components/Smartgatee';
import MapWidget from '@/app/components/MapWidgett';
import { INITIAL_TRUCKS, generateChartData } from '@/app/components/utils/data';

const DashboardPage = () => {
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
  const [gateLogs, setGateLogs] = useState([]);
  const [chartData, setChartData] = useState(generateChartData());

  // Real-time Telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prevTrucks => prevTrucks.map(t => ({
        ...t,
        speed: Math.max(0, t.speed + (Math.random() * 10 - 5)),
        brakeTemp: Math.max(50, t.brakeTemp + (Math.random() * 15 - 5)),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Smart Gate Entries
  useEffect(() => {
    const interval = setInterval(() => {
      const isSafe = Math.random() > 0.3;
      const newLog = {
        id: Date.now(),
        plat: `B ${Math.floor(Math.random() * 9000)} ${isSafe ? 'TX' : 'XX'}`,
        timestamp: new Date().toLocaleTimeString(),
        status: isSafe ? 'GREEN LANE' : 'MANUAL CHECK',
        isSafe: isSafe
      };
      setGateLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <KPICards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <TemperatureChart chartData={chartData} />
            <FleetTable trucks={trucks} setTrucks={setTrucks} />
          </div>

         
          <div className="space-y-6">
            <SmartGateFeed gateLogs={gateLogs} />
            <MapWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;













// 'use client';

// import React, { useState, useEffect } from 'react';
// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
// } from 'recharts';
// import { 
//   Truck, AlertTriangle, Activity, MapPin, Thermometer, 
//   Scale, Zap, CheckCircle, ShieldAlert 
// } from 'lucide-react';


// //data dummy
// const INITIAL_TRUCKS = [
//   { id: "B 9921 XA", load: 22, maxLoad: 20, speed: 75, brakeTemp: 180, location: "Tol Cipularang KM 90", status: "ODOL" },
//   { id: "D 1234 ABC", load: 12, maxLoad: 15, speed: 60, brakeTemp: 90, location: "Arteri Padalarang", status: "SAFE" },
//   { id: "B 5555 ZZ", load: 30, maxLoad: 20, speed: 95, brakeTemp: 320, location: "Turunan Gombel", status: "CRITICAL" },
//   { id: "F 8812 GH", load: 18, maxLoad: 20, speed: 45, brakeTemp: 110, location: "Puncak Pass", status: "SAFE" }
// ];

// const generateChartData = () => {
//   return Array.from({ length: 10 }, (_, i) => ({
//     time: `${10 + i}:00`,
//     avgTemp: 100 + Math.random() * 50,
//     odolCount: Math.floor(Math.random() * 20),
//   }));
// };

// const Dashboard = () => {
//   const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
//   const [gateLogs, setGateLogs] = useState([]);
//   const [chartData, setChartData] = useState(generateChartData());

//   // --- SIMULATION EFFECTS 
//   // Simulate Real-time Telemetry (Speed & Temp fluctuation)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTrucks(prevTrucks => prevTrucks.map(t => ({
//         ...t,
//         speed: Math.max(0, t.speed + (Math.random() * 10 - 5)),
//         brakeTemp: Math.max(50, t.brakeTemp + (Math.random() * 15 - 5)),
//       })));
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   // Simulate Smart Gate Entries
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const isSafe = Math.random() > 0.3;
//       const newLog = {
//         id: Date.now(),
//         plat: `B ${Math.floor(Math.random() * 9000)} ${isSafe ? 'TX' : 'XX'}`,
//         timestamp: new Date().toLocaleTimeString(),
//         status: isSafe ? 'GREEN LANE' : 'MANUAL CHECK',
//         isSafe: isSafe
//       };
//       setGateLogs(prev => [newLog, ...prev].slice(0, 5));
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   // --- UI COMPONENTS ---
//   const StatusBadge = ({ type }) => {
//     const styles = {
//       SAFE: "bg-green-500/10 text-green-500 border-green-500/20",
//       ODOL: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//       CRITICAL: "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse"
//     };
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[type] || styles.SAFE}`}>
//         {type}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      
//       {/* HEADER */}
//       <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//               <Activity size={20} className="text-white" />
//             </div>
//             <h1 className="text-xl font-bold tracking-tight">S-LOG <span className="text-blue-500">IoT</span></h1>
//           </div>
//           <div className="flex items-center gap-4 text-sm text-slate-400">
//             <span className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//               System Online
//             </span>
//             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto p-6 space-y-6">
        
//         {/* KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-slate-400 text-sm">Total Armada Aktif</p>
//                 <h3 className="text-2xl font-bold mt-1">1,240</h3>
//               </div>
//               <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Truck size={20} /></div>
//             </div>
//             <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Zap size={12}/> +12% Efficiency</p>
//           </div>

//           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-slate-400 text-sm">Pelanggaran ODOL</p>
//                 <h3 className="text-2xl font-bold mt-1 text-yellow-500">42</h3>
//               </div>
//               <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><Scale size={20} /></div>
//             </div>
//             <p className="text-xs text-slate-500 mt-2">Requires manual weighing</p>
//           </div>

//           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full -mr-4 -mt-4"></div>
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-slate-400 text-sm">Bahaya Rem Panas</p>
//                 <h3 className="text-2xl font-bold mt-1 text-red-500">3</h3>
//               </div>
//               <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Thermometer size={20} /></div>
//             </div>
//             <p className="text-xs text-red-400 mt-2 font-medium">Critical Alert!</p>
//           </div>

//           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-slate-400 text-sm">Smart Gate Pass</p>
//                 <h3 className="text-2xl font-bold mt-1 text-green-500">94%</h3>
//               </div>
//               <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle size={20} /></div>
//             </div>
//             <p className="text-xs text-slate-500 mt-2">Green Lane Utilization</p>
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* LEFT COLUMN (2/3) */}
//           <div className="lg:col-span-2 space-y-6">
            
//             {/* CHART SECTION */}
//             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
//               <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
//                 <Activity size={18} className="text-blue-500"/> 
//                 Analisa Rem vs Waktu (Fleet Average)
//               </h3>
//               <div className="h-64 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <defs>
//                       <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                     <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false}/>
//                     <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit="°C"/>
//                     <Tooltip 
//                       contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
//                       itemStyle={{ color: '#f1f5f9' }}
//                     />
//                     <Area 
//                       type="monotone" 
//                       dataKey="avgTemp" 
//                       stroke="#ef4444" 
//                       strokeWidth={2}
//                       fillOpacity={1} 
//                       fill="url(#colorTemp)" 
//                       name="Suhu Rem Rata-rata"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* LIVE TRACKING TABLE */}
//             <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
//               <div className="p-4 border-b border-slate-700 flex justify-between items-center">
//                 <h3 className="font-semibold">Monitoring Armada Real-Time</h3>
//                 <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Live Updates</span>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-slate-900/50 text-slate-400">
//                     <tr>
//                       <th className="px-6 py-3">ID Truk</th>
//                       <th className="px-6 py-3">Muatan (Ton)</th>
//                       <th className="px-6 py-3">Speed</th>
//                       <th className="px-6 py-3">Suhu Rem</th>
//                       <th className="px-6 py-3">Status</th>
//                       <th className="px-6 py-3">Lokasi</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-700">
//                     {trucks.map((truck, idx) => {
//                       const isHot = truck.brakeTemp > 250;
//                       const isOverload = truck.load > truck.maxLoad;
                      
//                       // Logic penentuan status dinamis
//                       let status = "SAFE";
//                       if(isHot && isOverload) status = "CRITICAL";
//                       else if(isHot || isOverload) status = "ODOL";

//                       return (
//                         <tr key={idx} className={`hover:bg-slate-700/50 transition-colors ${status === 'CRITICAL' ? 'bg-red-500/5' : ''}`}>
//                           <td className="px-6 py-4 font-medium">{truck.id}</td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-2">
//                               <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
//                                 <div 
//                                   className={`h-full ${isOverload ? 'bg-red-500' : 'bg-blue-500'}`} 
//                                   style={{ width: `${(truck.load / truck.maxLoad) * 100}%` }}
//                                 ></div>
//                               </div>
//                               <span className={isOverload ? 'text-red-400' : 'text-slate-300'}>
//                                 {truck.load.toFixed(1)} T
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">{Math.round(truck.speed)} km/h</td>
//                           <td className={`px-6 py-4 font-mono ${isHot ? 'text-red-500 font-bold' : ''}`}>
//                             {Math.round(truck.brakeTemp)}°C
//                           </td>
//                           <td className="px-6 py-4"><StatusBadge type={status} /></td>
//                           <td className="px-6 py-4 text-slate-400 flex items-center gap-1">
//                             <MapPin size={12}/> {truck.location}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN (1/3) */}
//           <div className="space-y-6">
            
//             {/* SMART GATE FEED */}
//             <div className="bg-slate-800 rounded-xl border border-slate-700 h-96 flex flex-col">
//               <div className="p-4 border-b border-slate-700 bg-slate-800 rounded-t-xl sticky top-0">
//                 <h3 className="font-semibold flex items-center gap-2">
//                   <ShieldAlert size={18} className="text-purple-500"/>
//                   Smart Gate Feed
//                 </h3>
//                 <p className="text-xs text-slate-400 mt-1">Gerbang Tol Cikampek Utama</p>
//               </div>
//               <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
//                 {gateLogs.map((log) => (
//                   <div key={log.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex justify-between items-center animate-in slide-in-from-right fade-in duration-300">
//                     <div>
//                       <div className="font-bold text-sm">{log.plat}</div>
//                       <div className="text-xs text-slate-500">{log.timestamp}</div>
//                     </div>
//                     <div className={`text-xs font-bold px-2 py-1 rounded border ${
//                       log.isSafe 
//                         ? 'bg-green-500/10 text-green-500 border-green-500/20' 
//                         : 'bg-red-500/10 text-red-500 border-red-500/20'
//                     }`}>
//                       {log.status}
//                     </div>
//                   </div>
//                 ))}
//                 {gateLogs.length === 0 && <div className="text-center text-slate-500 text-sm py-4">Waiting for traffic...</div>}
//               </div>
//             </div>

//             {/* MAP PLACEHOLDER */}
//             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 h-64 relative flex items-center justify-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/107.6191, -6.9175,10,0/400x300?access_token=YOUR_TOKEN')] bg-cover bg-center group cursor-pointer">
//                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-all"></div>
//                <div className="relative z-10 text-center">
//                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
//                     <MapPin className="text-white" />
//                  </div>
//                  <h4 className="font-semibold text-white">Live GPS Tracking</h4>
//                  <p className="text-xs text-slate-300">Click to expand map view</p>
//                </div>
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;