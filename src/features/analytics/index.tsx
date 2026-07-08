'use client'

import {
  Users,
  CreditCard,
  CheckCircle2,
  Activity,
  Layers,
  MessageSquare,
  FileText,
  Zap,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// --- Mock Data (Replace with real DB queries later) ---

const signupData = [
  { date: 'Mon', total: 45, organic: 20, paid: 25 },
  { date: 'Tue', total: 52, organic: 28, paid: 24 },
  { date: 'Wed', total: 38, organic: 15, paid: 23 },
  { date: 'Thu', total: 65, organic: 40, paid: 25 },
  { date: 'Fri', total: 58, organic: 30, paid: 28 },
  { date: 'Sat', total: 42, organic: 22, paid: 20 },
  { date: 'Sun', total: 48, organic: 25, paid: 23 },
]

const ftueData = [
  { step: 'Sign Up', count: 1000 },
  { step: 'Email Verify', count: 850 },
  { step: 'Profile Setup', count: 720 },
  { step: 'First Deck Created', count: 600 },
  { step: 'First Review', count: 550 },
]

const retentionData = [
  { day: 'D1', rate: 65 },
  { day: 'D3', rate: 45 },
  { day: 'D7', rate: 32 },
  { day: 'D14', rate: 25 },
  { day: 'D30', rate: 18 },
]

const featureAdoptionData = [
  { name: 'Flashcards', value: 92, icon: <Layers className='h-4 w-4' /> },
  { name: 'Notes', value: 65, icon: <FileText className='h-4 w-4' /> },
  { name: 'Verbatim Mode', value: 45, icon: <Zap className='h-4 w-4' /> },
  { name: 'Templates', value: 38, icon: <CheckCircle2 className='h-4 w-4' /> },
  { name: 'AI Chat', value: 28, icon: <MessageSquare className='h-4 w-4' /> },
]

const activityData = [
  { time: '00:00', created: 12, reviewed: 150 },
  { time: '04:00', created: 5, reviewed: 80 },
  { time: '08:00', created: 45, reviewed: 320 },
  { time: '12:00', created: 80, reviewed: 550 },
  { time: '16:00', created: 65, reviewed: 480 },
  { time: '20:00', created: 30, reviewed: 290 },
]

export default function AnalyticsPage() {
  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Analytics</h2>
      </div>

      {/* Top Level KPIs */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Signups (7d)
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>348</div>
            <p className='text-xs text-muted-foreground'>+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              FTUE Completion
            </CardTitle>
            <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>55%</div>
            <p className='text-xs text-muted-foreground'>Of total signups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Activation Rate (24h)
            </CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>42%</div>
            <p className='text-xs text-muted-foreground'>Created first card</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Free → Pro Conv.
            </CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3.2%</div>
            <p className='text-xs text-muted-foreground'>Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        {/* Signups Trend */}
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Signups Trend</CardTitle>
            <CardDescription>Daily signups split by source</CardDescription>
          </CardHeader>
          <CardContent className='pl-2'>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={signupData}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='organic'
                    stackId='a'
                    fill='#3b82f6'
                    name='Organic'
                  />
                  <Bar dataKey='paid' stackId='a' fill='#8b5cf6' name='Paid' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Retention Curve */}
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Retention Cohort</CardTitle>
            <CardDescription>D1 / D7 / D30 Retention Rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='day' />
                  <YAxis unit='%' />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='rate'
                    stroke='#ef4444'
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        {/* FTUE Funnel (Simulated with Bar) */}
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>FTUE Funnel</CardTitle>
            <CardDescription>Drop-off during onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart layout='vertical' data={ftueData}>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis type='number' />
                  <YAxis dataKey='step' type='category' width={120} />
                  <Tooltip />
                  <Bar
                    dataKey='count'
                    fill='#10b981'
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Feature Adoption */}
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Feature Adoption</CardTitle>
            <CardDescription>
              % of active users using specific features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {featureAdoptionData.map((feature) => (
                <div key={feature.name} className='flex items-center'>
                  <div className='mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
                    {feature.icon}
                  </div>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm leading-none font-medium'>
                        {feature.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {feature.value}%
                      </p>
                    </div>
                    <div className='h-2 w-full rounded-full bg-muted'>
                      <div
                        className='h-2 rounded-full bg-primary transition-all'
                        style={{ width: `${feature.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Wide Activity */}
      <Card>
        <CardHeader>
          <CardTitle>System Activity (24h)</CardTitle>
          <CardDescription>Cards Created vs. Reviewed per hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id='colorCreated' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id='colorReviewed'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey='time' />
                <YAxis />
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Legend />
                <Area
                  type='monotone'
                  dataKey='created'
                  stroke='#8884d8'
                  fillOpacity={1}
                  fill='url(#colorCreated)'
                  name='Created'
                />
                <Area
                  type='monotone'
                  dataKey='reviewed'
                  stroke='#82ca9d'
                  fillOpacity={1}
                  fill='url(#colorReviewed)'
                  name='Reviewed'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
