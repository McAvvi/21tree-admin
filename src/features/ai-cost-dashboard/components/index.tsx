'use client'

import { useState } from 'react'
import {
  DollarSign,
  AlertTriangle,
  Zap,
  // TrendingUp, Database
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CacheAndErrors } from './cache-and-errors'
import { SpendByFeatureChart } from './spend-by-feature-chart'
import { SpendByModelChart } from './spend-by-model-chart'
import { TopSpendersTable } from './top-spenders-table'

export function AICostDashboard() {
  // 3. Define the missing state variables to fix "undefined" errors
  const [todaySpend] = useState(62.5) // Replace with real data fetching
  const [dailyCap] = useState(100) // Replace with real data fetching

  return (
    <>
      {/* ===== Top Heading ===== */}
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            AI Cost & Usage Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Real-time monitoring of AI spend, usage, and performance metrics
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Badge
            variant={todaySpend > 50 ? 'destructive' : 'default'}
            className='px-3 py-1 text-sm'
          >
            <AlertTriangle className='mr-1 h-4 w-4' />
            Today: ${todaySpend.toFixed(2)}
          </Badge>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* ===== Spend Cards ===== */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Today's Spend</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${todaySpend.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>
              {dailyCap > 0
                ? `${((todaySpend / dailyCap) * 100).toFixed(1)}% of $${dailyCap} cap`
                : 'No cap set'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Groq Llama 4 Scout
            </CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$0.00</div>
            <p className='text-xs font-medium text-green-600'>Free Tier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Groq Llama 70B
            </CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$12.45</div>
            <p className='text-xs text-muted-foreground'>
              +8.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>GPT-4o-mini</CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$34.89</div>
            <p className='text-xs text-muted-foreground'>
              +12.4% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Flux Schnell</CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$8.20</div>
            <p className='text-xs text-muted-foreground'>
              +3.1% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ===== DALL-E Card (separate row) ===== */}
      <div className='grid gap-4 pt-2'>
        <Card className='max-w-xs'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>DALL-E 3</CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$15.60</div>
            <p className='text-xs text-muted-foreground'>
              +5.7% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ===== Daily Spend Cap Alert ===== */}
      <Card className='mt-4'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5' />
            Daily Spend Cap Alert
          </CardTitle>
          <CardDescription>
            Set a threshold to receive email/Slack alerts when daily spend is
            hit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-end gap-4'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='daily-cap'>Daily Cap ($)</Label>
              <Input
                id='daily-cap'
                type='number'
                placeholder='Enter amount (e.g., 100)'
                defaultValue={dailyCap || ''}
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='alert-email'>Alert Email</Label>
              <Input
                id='alert-email'
                type='email'
                placeholder='admin@example.com'
                defaultValue='admin@example.com'
              />
            </div>
            <Button>Save Alert Settings</Button>
          </div>
        </CardContent>
      </Card>

      {/* ===== Charts Row 1 ===== */}
      <div className='mt-4 grid gap-4 md:grid-cols-5'>
        {/* Ensure these components are imported and accept the correct props */}
        <SpendByModelChart />
        <SpendByFeatureChart />
      </div>

      {/* ===== Top Spenders ===== */}
      <div className='mt-4'>
        <TopSpendersTable />
      </div>

      {/* ===== Cache Performance & Error Rates ===== */}
      <div className='mt-4'>
        <CacheAndErrors />
      </div>
    </>
  )
}

// export function AICostDashboard() {
// 	const todaySpend = 71.14
// const dailyCap = 100
//   return (
//     <>
//       {/* ===== Top Heading ===== */}
//       <div className='mb-2 flex items-center justify-between space-y-2'>
//         <div>
//           <h1 className='text-2xl font-bold tracking-tight'>AI Cost & Usage Dashboard</h1>
//           <p className='text-muted-foreground'>
//             Real-time monitoring of AI spend, usage, and performance metrics
//           </p>
//         </div>
//         <div className='flex items-center space-x-2'>
//           <Badge variant={todaySpend > 50 ? 'destructive' : 'default'} className='px-3 py-1 text-sm'>
//             <AlertTriangle className='mr-1 h-4 w-4' />
//             Today: ${todaySpend.toFixed(2)}
//           </Badge>
//           <Button>Export Report</Button>
//         </div>
//       </div>

//       {/* ===== Spend Cards ===== */}
//       <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
//         <Card>
//           <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//             <CardTitle className='text-sm font-medium'>Today's Spend</CardTitle>
//             <DollarSign className='h-4 w-4 text-muted-foreground' />
//           </CardHeader>
//           <CardContent>
//             <div className='text-2xl font-bold'>${todaySpend.toFixed(2)}</div>
//             <p className='text-xs text-muted-foreground'>
//               {dailyCap > 0 ? `${((todaySpend / dailyCap) * 100).toFixed(1)}% of $${dailyCap} cap` : 'No cap set'}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//             <CardTitle className='text-sm font-medium'>Groq Llama 4 Scout</CardTitle>
//             <Zap className='h-4 w-4 text-muted-foreground' />
//           </CardHeader>
//           <CardContent>
//             <div className='text-2xl font-bold'>$0.00</div>
//             <p className='text-xs text-green-600 font-medium'>Free Tier</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//             <CardTitle className='text-sm font-medium'>Groq Llama 70B</CardTitle>
//             <Zap className='h-4 w-4 text-muted-foreground' />
//           </CardHeader>
//           <CardContent>
//             <div className='text-2xl font-bold">$12.45</div>
//             <p className='text-xs text-muted-foreground'>+8.2% from yesterday</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//             <CardTitle className='text-sm font-medium'>GPT-4o-mini</CardTitle>
//             <Zap className='h-4 w-4 text-muted-foreground' />
//           </CardHeader>
//           <CardContent>
//             <div className='text-2xl font-bold'>$34.89</div>
//             <p className='text-xs text-muted-foreground'>+12.4% from yesterday</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//             <CardTitle className='text-sm font-medium'>Flux Schnell</CardTitle>
//             <Zap className='h-4 w-4 text-muted-foreground' />
//           </CardHeader>
//           <CardContent>
//             <div className='text-2xl font-bold'>$8.20</div>
//             <p className='text-xs text-muted-foreground'>+3.1% from yesterday</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* ===== DALL-E Card (separate row) ===== */}
//       <div className='grid gap-4 pt-2'>
//         <Card className='max-w-xs'>
//           <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//             <CardTitle className='text-sm font-medium'>DALL-E 3</CardTitle>
//             <Zap className='h-4 w-4 text-muted-foreground' />
//           </CardHeader>
//           <CardContent>
//             <div className='text-2xl font-bold'>$15.60</div>
//             <p className='text-xs text-muted-foreground'>+5.7% from yesterday</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* ===== Daily Spend Cap Alert ===== */}
//       <Card className='mt-4'>
//         <CardHeader>
//           <CardTitle className='flex items-center gap-2'>
//             <AlertTriangle className='h-5 w-5' />
//             Daily Spend Cap Alert
//           </CardTitle>
//           <CardDescription>Set a threshold to receive email/Slack alerts when daily spend is hit</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className='flex items-end gap-4'>
//             <div className='grid w-full max-w-sm items-center gap-1.5'>
//               <Label htmlFor='daily-cap'>Daily Cap ($)</Label>
//               <Input
//                 id='daily-cap'
//                 type='number'
//                 placeholder='Enter amount (e.g., 100)'
//                 defaultValue={dailyCap || ''}
//               />
//             </div>
//             <div className='grid w-full max-w-sm items-center gap-1.5'>
//               <Label htmlFor='alert-email'>Alert Email</Label>
//               <Input
//                 id='alert-email'
//                 type='email'
//                 placeholder='admin@example.com'
//                 defaultValue='admin@example.com'
//               />
//             </div>
//             <Button>Save Alert Settings</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* ===== Charts Row 1 ===== */}
//       <div className='grid gap-4 md:grid-cols-5 mt-4'>
//         <SpendByModelChart />
//         <SpendByFeatureChart />
//       </div>

//       {/* ===== Top Spenders ===== */}
//       <div className='mt-4'>
//         <TopSpendersTable />
//       </div>

//       {/* ===== Cache Performance & Error Rates ===== */}
//       <div className='mt-4'>
//         <CacheAndErrors />
//       </div>
//     </>
//   )
// }

{
  /* // Mock data - replace with real API calls
const todaySpend = 71.14
const dailyCap = 100 */
}
