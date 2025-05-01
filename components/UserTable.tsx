'use client'

import React, { useMemo, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { User } from '@/types/user'
import { Button } from './ui/button'
import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar'
import PaginationButton from './PaginationButton'
import { Skeleton } from './ui/skeleton'

interface UserTableProps {
  data: User[]
  isLoading: boolean
}

const UserTable: React.FC<UserTableProps> = ({ data, isLoading }) => {
  const router = useRouter()
  const [globalFilter, setGlobalFilter] = useState('')

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const user = row.original
          return (
            <Button
              variant='outline'
              size='sm'
              onClick={() => router.push(`/users/${user.id}`)}
            >
              View Details
            </Button>
          )
        },
      },
    ],
    [router]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase()
      const name = String(row.getValue('name') ?? '')
      const email = String(row.getValue('email') ?? '')
      const username = String(row.getValue('username') ?? '')

      const rowValue = name + email + username
      return rowValue.toLowerCase().includes(searchValue)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='space-y-4'>
      <SearchBar
        placeholder={'Search by name, email, or username...'}
        defaultValue={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        disabled={isLoading}
      />

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className='h-4 w-32' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-24' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-40' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-8 w-24' />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && (
        <PaginationButton
          prevOnClik={() => table.previousPage()}
          disabledPrev={!table.getCanPreviousPage()}
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPage={table.getPageCount()}
          nextOnclik={() => table.nextPage()}
          disabledNext={!table.getCanNextPage()}
        />
      )}
    </div>
  )
}

export default UserTable
