'use client'

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const data = [
  { name: 'Chat', value: 450 },
  { name: 'Note Studio', value: 320 },
  { name: 'Mnemonic', value: 280 },
  { name: 'Q-Bank', value: 210 },
  { name: 'Verbatim', value: 180 },
  { name: 'Templates', value: 150 },
]

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#06b6d4',
]
export function SpendByFeatureChart() {
  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <CardTitle>Spend by Feature</CardTitle>
        <CardDescription>AI costs per feature this month</CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data}
              layout='vertical'
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                type='number'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                type='category'
                dataKey='name'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              {/* <Tooltip
                formatter={(value: any) => [
                  `$${Number(value).toFixed(2)}`,
                  'Cost',
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              /> */}
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
              <Bar dataKey='value' radius={[0, 4, 4, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
// export function SpendByFeatureChart() {
//   return (
//     <Card className='col-span-1 lg:col-span-2'>
//       <CardHeader>
//         <CardTitle>Spend by Feature</CardTitle>
//         <CardDescription>AI costs per feature this month</CardDescription>
//       </CardHeader>
//       <CardContent className='px-2'>
//         <div className='h-[300px]'>
//           <ResponsiveContainer width='100%' height='100%'>
//             <BarChart data={data} layout='vertical' margin={{ left: 20 }}>
//               <XAxis
//                 type='number'
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//                 tickFormatter={(value) => `$${value}`}
//               />
//               <YAxis
//                 type='category'
//                 dataKey='name'
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//                 width={100}
//               />
//               <Tooltip
//                 // formatter={(value: number) => [`$${value}`, 'Cost']}
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
//               {data.map((entry, index) => (
//                 <Bar
//                   key={entry.name}
//                   dataKey='value'
//                   radius={[0, 4, 4, 0]}
//                   barSize={32}
//                 >
//                   <Cell fill={COLORS[index % COLORS.length]} />
//                 </Bar>
//               ))}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
