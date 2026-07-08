'use client'

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const data = [
  { name: 'Mon', groq: 400, gpt: 240, flux: 100, dalle: 50 },
  { name: 'Tue', groq: 300, gpt: 139, flux: 80, dalle: 60 },
  { name: 'Wed', groq: 200, gpt: 980, flux: 150, dalle: 90 },
  { name: 'Thu', groq: 278, gpt: 390, flux: 120, dalle: 70 },
  { name: 'Fri', groq: 189, gpt: 480, flux: 90, dalle: 80 },
  { name: 'Sat', groq: 239, gpt: 380, flux: 110, dalle: 60 },
  { name: 'Sun', groq: 349, gpt: 430, flux: 130, dalle: 75 },
]

export function SpendByModelChart() {
  return (
    <Card className='col-span-1 lg:col-span-3'>
      <CardHeader>
        <CardTitle>Spend by Model (Last 7 Days)</CardTitle>
        <CardDescription>
          Daily AI costs broken down by provider
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey='name'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: any) => [
                  `$${Number(value).toFixed(2)}`,
                  'Cost',
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                }}
                itemStyle={{
                  color: 'hsl(var(--foreground))',
                  padding: '2px 0',
                }}
                labelStyle={{
                  color: 'hsl(var(--foreground))',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
              />
              <Bar
                dataKey='groq'
                stackId='a'
                fill='#10b981'
                name='Groq'
                barSize={60}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='gpt'
                stackId='a'
                fill='#3b82f6'
                name='GPT-4o-mini'
                barSize={60}
              />
              <Bar
                dataKey='flux'
                stackId='a'
                fill='#8b5cf6'
                name='Flux Schnell'
                barSize={60}
              />
              <Bar
                dataKey='dalle'
                stackId='a'
                fill='#ec4899'
                name='DALL-E 3'
                barSize={60}
                radius={[0, 0, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// export function SpendByModelChart() {
//   return (
//     <Card className='col-span-1 lg:col-span-3'>
//       <CardHeader>
//         <CardTitle>Spend by Model (Last 7 Days)</CardTitle>
//         <CardDescription>
//           Daily AI costs broken down by provider
//         </CardDescription>
//       </CardHeader>
//       <CardContent className='px-2'>
//         <div className='h-[300px]'>
//           <ResponsiveContainer width='100%' height='100%'>
//             <BarChart data={data}>
//               <XAxis
//                 dataKey='name'
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//               />
//               <YAxis
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//                 tickFormatter={(value) => `$${value}`}
//               />
//               <Tooltip
//                 // formatter={(value: number) => [`$${value}`, 'Cost']}
//                 // formatter={(value: number | undefined) => [
//                 //   `$${(value ?? 0).toFixed(2)}`,
//                 //   'Cost',
//                 // ]}
//                 // formatter={(
//                 //   value: string | number | (string | number)[] | undefined
//                 // ) => {
//                 //   const numericValue = Array.isArray(value) ? value[0] : value
//                 //   return [`$${Number(numericValue).toFixed(2)}`, 'Cost']
//                 // }}
//                 formatter={(value: any) => [
//                   `$${Number(value).toFixed(2)}`,
//                   'Cost',
//                 ]}
//                 contentStyle={{
//                   backgroundColor: 'hsl(var(--background))',
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: 'var(--radius)',
//                 }}
//               />
//               <Bar
//                 dataKey='groq'
//                 stackId='a'
//                 fill='#10b981'
//                 radius={[0, 0, 4, 4]}
//                 name='Groq'
//               />
//               <Bar
//                 dataKey='gpt'
//                 stackId='a'
//                 fill='#3b82f6'
//                 radius={[0, 0, 4, 4]}
//                 name='GPT-4o-mini'
//               />
//               <Bar
//                 dataKey='flux'
//                 stackId='a'
//                 fill='#8b5cf6'
//                 radius={[0, 0, 4, 4]}
//                 name='Flux Schnell'
//               />
//               <Bar
//                 dataKey='dalle'
//                 stackId='a'
//                 fill='#ec4899'
//                 radius={[0, 0, 4, 4]}
//                 name='DALL-E 3'
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
