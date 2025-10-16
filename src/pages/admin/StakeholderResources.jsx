import React, { useState } from 'react';
import { 
  Users, FileText, BarChart3, AlertTriangle, 
  Download, BookOpen, Building2, GraduationCap 
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Sample data for charts and tables
const stakeholderData = {
  employer: [
    { group: 'Group A', completion: 75, score: 82, learners: 120, engagement: 85 },
    { group: 'Group B', completion: 68, score: 75, learners: 95, engagement: 72 },
    { group: 'Group C', completion: 82, score: 88, learners: 150, engagement: 90 },
  ],
  educator: [
    { group: 'Group A', completion: 85, score: 90, learners: 80, engagement: 88 },
    { group: 'Group B', completion: 78, score: 85, learners: 65, engagement: 82 },
    { group: 'Group C', completion: 92, score: 94, learners: 110, engagement: 95 },
  ],
  learner: [
    { group: 'Group A', completion: 65, score: 72, learners: 300, engagement: 70 },
    { group: 'Group B', completion: 58, score: 68, learners: 250, engagement: 65 },
    { group: 'Group C', completion: 71, score: 76, learners: 280, engagement: 75 },
  ],
};

const resourceTrendData = [
  { month: 'Jan', downloads: 1200, views: 2400, shares: 800 },
  { month: 'Feb', downloads: 1500, views: 2800, shares: 1000 },
  { month: 'Mar', downloads: 1800, views: 3200, shares: 1200 },
  { month: 'Apr', downloads: 2200, views: 3800, shares: 1500 },
  { month: 'May', downloads: 2500, views: 4200, shares: 1800 },
];

const resourceTypeData = [
  { name: 'PDFs', value: 35, color: '#22c55e' },
  { name: 'Videos', value: 25, color: '#3b82f6' },
  { name: 'Interactive', value: 20, color: '#8b5cf6' },
  { name: 'Documents', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#64748b' },
];

const engagementMetrics = [
  { metric: 'Resource Access', value: 85, fullMark: 100 },
  { metric: 'Completion Rate', value: 75, fullMark: 100 },
  { metric: 'Interaction', value: 90, fullMark: 100 },
  { metric: 'Feedback', value: 70, fullMark: 100 },
  { metric: 'Sharing', value: 65, fullMark: 100 },
];

const resourcesData = [
  {
    name: 'Digital Safety Toolkit',
    type: 'PDF',
    downloads: 1245,
    completion: 92,
    lastAccess: '2024-03-15',
    usedByPathway: 'All Pathways',
    weeklyDownloads: [45, 52, 48, 65],
    size: 150
  },
  {
    name: 'Workplace Rights Guide',
    type: 'Document',
    downloads: 986,
    completion: 88,
    lastAccess: '2024-03-14',
    usedByPathway: 'Basic, Advanced',
    weeklyDownloads: [35, 42, 38, 41],
    size: 120
  },
  {
    name: 'Safety Training Video',
    type: 'Video',
    downloads: 756,
    completion: 78,
    lastAccess: '2024-03-13',
    usedByPathway: 'Intermediate',
    weeklyDownloads: [28, 32, 35, 30],
    size: 100
  },
  {
    name: 'Employee Handbook',
    type: 'PDF',
    downloads: 1100,
    completion: 85,
    lastAccess: '2024-03-15',
    usedByPathway: 'Basic',
    weeklyDownloads: [40, 45, 42, 50],
    size: 130
  },
  {
    name: 'Leadership Training',
    type: 'Interactive',
    downloads: 850,
    completion: 95,
    lastAccess: '2024-03-14',
    usedByPathway: 'Advanced',
    weeklyDownloads: [30, 35, 38, 40],
    size: 110
  },
  {
    name: 'Communication Skills',
    type: 'Video',
    downloads: 920,
    completion: 82,
    lastAccess: '2024-03-13',
    usedByPathway: 'All Pathways',
    weeklyDownloads: [35, 38, 40, 45],
    size: 140
  },
  {
    name: 'Project Management Guide',
    type: 'Document',
    downloads: 680,
    completion: 75,
    lastAccess: '2024-03-12',
    usedByPathway: 'Advanced',
    weeklyDownloads: [25, 28, 30, 32],
    size: 90
  },
  {
    name: 'Team Building Workshop',
    type: 'Interactive',
    downloads: 550,
    completion: 98,
    lastAccess: '2024-03-11',
    usedByPathway: 'Intermediate',
    weeklyDownloads: [20, 25, 28, 30],
    size: 80
  }
];

// KPI Card Component
const KPICard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-orange-100 rounded-lg">
        <Icon className="h-5 w-5 text-orange-600" />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <div className="flex items-baseline justify-between">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
  </div>
);

// Resource Row Component
const ResourceRow = ({ resource }) => (
  <div className="grid grid-cols-5 py-3 px-4 hover:bg-orange-50 rounded-lg transition-colors">
    <div className="font-medium">{resource.name}</div>
    <div className="text-gray-600">{resource.type}</div>
    <div className="flex items-center gap-2">
      <span>{resource.downloads}</span>
      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-orange-400 rounded-full" 
             style={{ width: `${(resource.downloads / 1500) * 100}%` }} />
      </div>
    </div>
    <div className="text-gray-600">{resource.lastAccess}</div>
    <div className="text-orange-600">{resource.usedByPathway}</div>
  </div>
);

const StakeholderResources = () => {
  const [activeTab, setActiveTab] = useState('employer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Stakeholder Resources</h1>
              <p className="text-gray-600 mt-1">Monitor resource utilization and stakeholder engagement</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <KPICard icon={Users} title="Total Stakeholders" value="4,521" change={8} />
            <KPICard icon={BarChart3} title="Active Users" value="3,847" change={12} />
            <KPICard icon={FileText} title="Avg. Completion" value="76%" change={5} />
            <KPICard icon={Download} title="Total Downloads" value="12.5k" change={15} />
          </div>
        </div>

        {/* Stakeholder Segmentation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance by Stakeholder Type</h2>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('employer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'employer' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Employer
            </button>
            <button
              onClick={() => setActiveTab('educator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'educator' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Educator
            </button>
            <button
              onClick={() => setActiveTab('learner')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'learner' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Learner
            </button>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stakeholderData[activeTab]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" name="Completion %" fill="#f97316" />
                  <Bar dataKey="score" name="Avg. Score" fill="#fb923c" />
                  <Bar dataKey="engagement" name="Engagement" fill="#fdba74" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Engagement Radar */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={engagementMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Engagement" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Resource Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource Type Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resource Type Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceTypeData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {resourceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resource Usage Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resourceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="downloads" stroke="#f97316" />
                  <Line type="monotone" dataKey="views" stroke="#22c55e" />
                  <Line type="monotone" dataKey="shares" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Resource Utilization Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Resource Downloads and Usage</h2>
          
          {/* Table Header */}
          <div className="grid grid-cols-5 py-2 px-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-600 mb-2">
            <div>Resource Name</div>
            <div>Type</div>
            <div>Downloads</div>
            <div>Last Access</div>
            <div>Used By Pathway</div>
          </div>

          {/* Table Body */}
          <div className="space-y-2">
            {resourcesData.map((resource, index) => (
              <ResourceRow key={index} resource={resource} />
            ))}
          </div>
        </div>

        {/* Resource Impact Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Top Resource</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">Digital Safety Toolkit</p>
            <p className="text-gray-600 mt-1">1,245 downloads this month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Employer Engagement</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">40% Increase</p>
            <p className="text-gray-600 mt-1">in resource access</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Immersive Learning</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">2× More</p>
            <p className="text-gray-600 mt-1">PDF downloads by immersive learners</p>
          </div>
        </div>

        {/* Correlation & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resource Use vs Completion</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="downloads" 
                    name="Downloads" 
                    domain={[500, 1300]}
                    label={{ value: 'Downloads', position: 'bottom' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="completion" 
                    name="Completion %" 
                    domain={[70, 100]}
                    label={{ value: 'Completion %', angle: -90, position: 'left' }}
                  />
                  <ZAxis type="number" dataKey="size" range={[60, 200]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-900">{data.name}</p>
                            <p className="text-sm text-gray-600">Downloads: {data.downloads}</p>
                            <p className="text-sm text-gray-600">Completion: {data.completion}%</p>
                            <p className="text-sm text-gray-600">Type: {data.type}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Scatter 
                    name="Resources" 
                    data={resourcesData} 
                    fill="#f97316"
                    shape={(props) => {
                      const { cx, cy, fill } = props;
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={8} 
                          stroke="#fff"
                          strokeWidth={2}
                          fill={fill}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      );
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resource Alerts</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Low resource usage among educators</p>
                  <p className="text-sm text-gray-600">25% below average engagement</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Outdated safety resources</p>
                  <p className="text-sm text-gray-600">Last updated 6+ months ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Resource format preference</p>
                  <p className="text-sm text-gray-600">Video content has 2× higher engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderResources;
