import { useMemo, useState } from 'react'
import {
  DollarSign,
  // TrendingUp, TrendingDown,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Types
interface SpendRecord {
  id: string
  date: string
  model: string
  provider: string
  spend: number
  requests: number
  avgCostPerRequest: number
}

type SortField = 'date' | 'model' | 'spend' | 'requests' | 'avgCostPerRequest'
type SortDirection = 'asc' | 'desc'
type TimePeriod = 'today' | 'yesterday' | '7days' | '30days' | 'all'

// Mock data - replace with real data fetching
const generateMockData = (): SpendRecord[] => {
  const models = [
    { name: 'Groq Llama 4 Scout', provider: 'Groq', baseCost: 0 },
    { name: 'Groq Llama 70B', provider: 'Groq', baseCost: 12.45 },
    { name: 'GPT-4o-mini', provider: 'OpenAI', baseCost: 34.89 },
    { name: 'Flux Schnell', provider: 'Black Forest Labs', baseCost: 8.2 },
    { name: 'DALL-E 3', provider: 'OpenAI', baseCost: 15.6 },
  ]

  const records: SpendRecord[] = []
  const today = new Date()

  // Generate 30 days of data
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    models.forEach((model) => {
      const variance = (Math.random() - 0.5) * 0.4 // ±20% variance
      const spend =
        model.baseCost *
        (1 + variance) *
        (i === 0 ? 1 : 0.8 + Math.random() * 0.4)
      const requests = Math.floor(spend * 100 + Math.random() * 50)

      records.push({
        id: `${dateStr}-${model.name}`,
        date: dateStr,
        model: model.name,
        provider: model.provider,
        spend: Math.max(0, spend),
        requests,
        avgCostPerRequest: requests > 0 ? spend / requests : 0,
      })
    })
  }

  return records
}

export function AISpendTable() {
  const [allData] = useState<SpendRecord[]>(generateMockData)
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7days')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // Filter data by time period
  const filteredData = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return allData.filter((record) => {
      const recordDate = new Date(record.date)

      switch (timePeriod) {
        case 'today':
          return recordDate.getTime() === today.getTime()
        case 'yesterday': {
          const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1)
          return recordDate.getTime() === yesterday.getTime()
        }
        case '7days': {
          const sevenDaysAgo = new Date(today)
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          return recordDate >= sevenDaysAgo && recordDate <= today
        }
        case '30days': {
          const thirtyDaysAgo = new Date(today)
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return recordDate >= thirtyDaysAgo && recordDate <= today
        }
        case 'all':
          return true
        default:
          return true
      }
    })
  }, [allData, timePeriod])

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case 'model':
          comparison = a.model.localeCompare(b.model)
          break
        case 'spend':
          comparison = a.spend - b.spend
          break
        case 'requests':
          comparison = a.requests - b.requests
          break
        case 'avgCostPerRequest':
          comparison = a.avgCostPerRequest - b.avgCostPerRequest
          break
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortField, sortDirection])

  // Calculate totals
  const totals = useMemo(() => {
    return sortedData.reduce(
      (acc, record) => ({
        spend: acc.spend + record.spend,
        requests: acc.requests + record.requests,
      }),
      { spend: 0, requests: 0 }
    )
  }, [sortedData])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // const SortIcon = ({ field }: { field: SortField }) => {
  //   if (sortField !== field) return null
  //   return sortDirection === 'asc' ? (
  //     <TrendingUp className='ml-1 inline h-3 w-3' />
  //   ) : (
  //     <TrendingDown className='ml-1 inline h-3 w-3' />
  //   )
  // }

  // // ✅ Move SortIcon OUTSIDE of AISpendTable
  // const SortIcon = ({
  //   field,
  //   currentSortField,
  //   sortDirection,
  // }: {
  //   field: SortField
  //   currentSortField: SortField
  //   sortDirection: SortDirection
  // }) => {
  //   if (currentSortField !== field) return null
  //   return sortDirection === 'asc' ? (
  //     <TrendingUp className='ml-1 inline h-3 w-3' />
  //   ) : (
  //     <TrendingDown className='ml-1 inline h-3 w-3' />
  //   )
  // }

  return (
    <div className='space-y-4'>
      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Spend</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totals.spend.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>
              {timePeriod === 'today' && 'Today'}
              {timePeriod === 'yesterday' && 'Yesterday'}
              {timePeriod === '7days' && 'Last 7 days'}
              {timePeriod === '30days' && 'Last 30 days'}
              {timePeriod === 'all' && 'All time'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Requests
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {totals.requests.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>Across all models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Avg Cost/Request
            </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              $
              {totals.requests > 0
                ? (totals.spend / totals.requests).toFixed(4)
                : '0.00'}
            </div>
            <p className='text-xs text-muted-foreground'>Per request average</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Select
            value={timePeriod}
            onValueChange={(value: TimePeriod) => setTimePeriod(value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select time period' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Today</SelectItem>
              <SelectItem value='yesterday'>Yesterday</SelectItem>
              <SelectItem value='7days'>Last 7 days</SelectItem>
              <SelectItem value='30days'>Last 30 days</SelectItem>
              <SelectItem value='all'>All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant='outline' size='sm'>
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className='pt-6'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className='cursor-pointer hover:bg-muted/50'
                  onClick={() => handleSort('date')}
                >
                  Date
                  {/* <SortIcon field='date' /> */}
                </TableHead>
                <TableHead
                  className='cursor-pointer hover:bg-muted/50'
                  onClick={() => handleSort('model')}
                >
                  Model
                  {/* <SortIcon field='model' /> */}
                </TableHead>
                <TableHead>Provider</TableHead>
                <TableHead
                  className='cursor-pointer text-right hover:bg-muted/50'
                  onClick={() => handleSort('requests')}
                >
                  Requests
                  {/* <SortIcon field='requests' /> */}
                </TableHead>
                <TableHead
                  className='cursor-pointer text-right hover:bg-muted/50'
                  onClick={() => handleSort('avgCostPerRequest')}
                >
                  Avg Cost/Req
                  {/* <SortIcon field='avgCostPerRequest' /> */}
                </TableHead>
                <TableHead
                  className='cursor-pointer text-right hover:bg-muted/50'
                  onClick={() => handleSort('spend')}
                >
                  Total Spend
                  {/* <SortIcon field='spend' /> */}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='py-8 text-center text-muted-foreground'
                  >
                    No data available for the selected time period
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className='font-medium'>
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{record.model}</TableCell>
                    <TableCell className='text-muted-foreground'>
                      {record.provider}
                    </TableCell>
                    <TableCell className='text-right'>
                      {record.requests.toLocaleString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      ${record.avgCostPerRequest.toFixed(4)}
                    </TableCell>
                    <TableCell className='text-right font-semibold'>
                      ${record.spend.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
