'use client'

import { useState } from 'react'
import { Search, Filter, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ReturnItem {
  id: string
  timestamp: string
  supplier: string
  productName: string
  reason: string
  quantity: number
  status: 'Pending' | 'Approved' | 'Rejected'
}

const returnHistoryData: ReturnItem[] = [
  {
    id: 'RET001',
    timestamp: '2024-04-05 14:30',
    supplier: 'PT Maju Jaya',
    productName: 'LCD Display 24"',
    reason: 'Damaged',
    quantity: 3,
    status: 'Approved',
  },
  {
    id: 'RET002',
    timestamp: '2024-04-04 10:15',
    supplier: 'CV Industri Indonesia',
    productName: 'Flour 25kg',
    reason: 'Wrong Specification',
    quantity: 5,
    status: 'Pending',
  },
  {
    id: 'RET003',
    timestamp: '2024-04-03 16:45',
    supplier: 'PT Karya Mitra',
    productName: 'Steel Rod 10mm',
    reason: 'Shortage',
    quantity: 20,
    status: 'Approved',
  },
  {
    id: 'RET004',
    timestamp: '2024-04-02 09:20',
    supplier: 'Supplier Berkah',
    productName: 'Cooking Oil 5L',
    reason: 'Defective',
    quantity: 10,
    status: 'Rejected',
  },
  {
    id: 'RET005',
    timestamp: '2024-04-01 13:50',
    supplier: 'PT Global Trade',
    productName: 'Electronic Components',
    reason: 'Damaged',
    quantity: 15,
    status: 'Pending',
  },
  {
    id: 'RET006',
    timestamp: '2024-03-31 11:30',
    supplier: 'PT Maju Jaya',
    productName: 'Resistor Pack',
    reason: 'Wrong Item',
    quantity: 8,
    status: 'Approved',
  },
  {
    id: 'RET007',
    timestamp: '2024-03-30 15:10',
    supplier: 'CV Industri Indonesia',
    productName: 'Sugar 50kg',
    reason: 'Expired',
    quantity: 2,
    status: 'Rejected',
  },
  {
    id: 'RET008',
    timestamp: '2024-03-29 10:40',
    supplier: 'PT Karya Mitra',
    productName: 'Iron Plate',
    reason: 'Damaged',
    quantity: 12,
    status: 'Pending',
  },
]

export function ReturnHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All')

  const filteredData = returnHistoryData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusStyles = (status: 'Pending' | 'Approved' | 'Rejected') => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/30'
      case 'Approved':
        return 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
      case 'Rejected':
        return 'bg-red-500/30 text-red-300 border border-red-500/30'
    }
  }

  const getStatusIcon = (status: 'Pending' | 'Approved' | 'Rejected') => {
    switch (status) {
      case 'Pending':
        return '⏳'
      case 'Approved':
        return '✓'
      case 'Rejected':
        return '✕'
    }
  }

  const stats = {
    total: returnHistoryData.length,
    pending: returnHistoryData.filter((item) => item.status === 'Pending').length,
    approved: returnHistoryData.filter((item) => item.status === 'Approved').length,
    rejected: returnHistoryData.filter((item) => item.status === 'Rejected').length,
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Return History</h1>
          <p className="text-muted-foreground">Track the status of all product returns</p>
        </div>
        <button className="bg-secondary/50 hover:bg-secondary text-foreground px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium border border-border">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Returns</p>
          <h3 className="text-3xl font-bold text-foreground">{stats.total}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 border-l-4 border-l-yellow-500">
          <p className="text-muted-foreground text-sm mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-yellow-300">{stats.pending}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 border-l-4 border-l-emerald-500">
          <p className="text-muted-foreground text-sm mb-2">Approved</p>
          <h3 className="text-3xl font-bold text-emerald-300">{stats.approved}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 border-l-4 border-l-red-500">
          <p className="text-muted-foreground text-sm mb-2">Rejected</p>
          <h3 className="text-3xl font-bold text-red-300">{stats.rejected}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Search Returns</label>
            <div className="flex items-center gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by ID, supplier, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-64">
            <label className="block text-sm font-medium text-foreground mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-accent transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Return Items List */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 hover:shadow-xl hover:border-accent/50 transition-all duration-200 hover:backdrop-blur-2xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{item.productName}</h3>
                        <Badge className="bg-secondary/70 text-muted-foreground border-0 rounded-lg">
                          {item.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.supplier}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Return Reason</p>
                      <p className="text-sm font-medium text-foreground">{item.reason}</p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-border"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="text-sm font-medium text-foreground">{item.quantity} units</p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-border"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                      <p className="text-sm font-medium text-foreground">{item.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-end lg:justify-start">
                  <Badge className={`${getStatusStyles(item.status)} rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 min-w-fit`}>
                    <span>{getStatusIcon(item.status)}</span>
                    <span>{item.status}</span>
                  </Badge>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-12 text-center">
            <p className="text-muted-foreground mb-2">No returns found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground text-center">
        Showing {filteredData.length} of {returnHistoryData.length} returns
      </div>
    </div>
  )
}
