'use client'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const cacheStats = [
  { name: 'ref_wiki_cache', hits: 8542, misses: 1234, hitRate: 87.4 },
  { name: 'catalog_chunk_cache', hits: 6230, misses: 890, hitRate: 87.5 },
]

const errorRates = [
  { provider: 'Groq', code: '429', count: 12, type: 'Rate Limit' },
  { provider: 'Groq', code: '500', count: 3, type: 'Server Error' },
  { provider: 'OpenAI', code: '429', count: 8, type: 'Rate Limit' },
  { provider: 'OpenAI', code: '500', count: 2, type: 'Server Error' },
  { provider: 'Flux', code: '429', count: 5, type: 'Rate Limit' },
  { provider: 'DALL-E', code: '429', count: 4, type: 'Rate Limit' },
]

export function CacheAndErrors() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Cache Performance</CardTitle>
          <CardDescription>Hit rates for AI response caches</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cache Name</TableHead>
                <TableHead className='text-right'>Hits</TableHead>
                <TableHead className='text-right'>Misses</TableHead>
                <TableHead className='text-right'>Hit Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cacheStats.map((cache) => (
                <TableRow key={cache.name}>
                  <TableCell className='font-medium'>{cache.name}</TableCell>
                  <TableCell className='text-right text-green-600'>
                    {cache.hits.toLocaleString()}
                  </TableCell>
                  <TableCell className='text-right text-red-600'>
                    {cache.misses.toLocaleString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Badge
                      variant={cache.hitRate >= 85 ? 'default' : 'destructive'}
                    >
                      {cache.hitRate}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Error Rates</CardTitle>
          <CardDescription>
            429s, 500s, and timeouts per provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Error Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className='text-right'>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {errorRates.map((error, idx) => (
                <TableRow key={`${error.provider}-${error.code}-${idx}`}>
                  <TableCell className='font-medium'>
                    {error.provider}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{error.code}</Badge>
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {error.type}
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    {error.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
