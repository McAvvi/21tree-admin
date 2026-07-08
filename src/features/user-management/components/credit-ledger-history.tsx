import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { type CreditLedgerEntry } from '../data/schema'

type CreditLedgerHistoryProps = {
  entries: CreditLedgerEntry[]
}

export function CreditLedgerHistory({ entries }: CreditLedgerHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className='rounded-lg border p-4 text-center text-muted-foreground'>
        No credit transactions found
      </div>
    )
  }

  return (
    <div className='rounded-lg border'>
      <div className='max-h-64 overflow-y-auto'>
        <table className='w-full text-sm'>
          <thead className='sticky top-0 bg-muted'>
            <tr>
              <th className='p-2 text-left font-medium'>Date</th>
              <th className='p-2 text-left font-medium'>Type</th>
              <th className='p-2 text-left font-medium'>Amount</th>
              <th className='p-2 text-left font-medium'>Balance After</th>
              <th className='p-2 text-left font-medium'>Reason</th>
              <th className='p-2 text-left font-medium'>By</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className='border-t'>
                <td className='p-2'>
                  {format(new Date(entry.createdAt), 'PPp')}
                </td>
                <td className='p-2'>
                  <Badge
                    variant={
                      entry.type === 'grant'
                        ? 'default'
                        : entry.type === 'revoke'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {entry.type}
                  </Badge>
                </td>
                <td
                  className={`p-2 font-medium ${
                    entry.type === 'grant'
                      ? 'text-green-600'
                      : entry.type === 'revoke'
                        ? 'text-red-600'
                        : ''
                  }`}
                >
                  {entry.type === 'grant' ? '+' : '-'}$
                  {Math.abs(entry.amount).toFixed(2)}
                </td>
                <td className='p-2'>${entry.balanceAfter.toFixed(2)}</td>
                <td className='max-w-[200px] truncate p-2'>{entry.reason}</td>
                <td className='p-2 text-muted-foreground'>
                  {entry.createdBy || 'System'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
