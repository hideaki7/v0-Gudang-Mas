'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Trash2 } from 'lucide-react'

const recentShipments = [
  { id: 'SHP-001', supplier: 'PT Maju Jaya', items: 5, date: '2024-04-05', status: 'Received', totalQty: 250 },
  { id: 'SHP-002', supplier: 'CV Industri Indonesia', items: 3, date: '2024-04-04', status: 'In Transit', totalQty: 180 },
  { id: 'SHP-003', supplier: 'Bersama Utama', items: 7, date: '2024-04-03', status: 'Processing', totalQty: 420 },
  { id: 'SHP-004', supplier: 'Global Supplies Ltd', items: 4, date: '2024-04-02', status: 'Received', totalQty: 340 },
  { id: 'SHP-005', supplier: 'Tech Components Asia', items: 6, date: '2024-04-01', status: 'In Transit', totalQty: 510 },
]

const suppliers = [
  'PT Maju Jaya',
  'CV Industri Indonesia',
  'Bersama Utama',
  'Global Supplies Ltd',
  'Tech Components Asia',
]

interface ProductRow {
  id: string
  name: string
  quantity: number
}

export function IncomingGoodsPage() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>('SHP-001')
  const [formData, setFormData] = useState({
    supplier: suppliers[0],
    date: new Date().toISOString().split('T')[0],
  })
  const [productRows, setProductRows] = useState<ProductRow[]>([
    { id: '1', name: '', quantity: 0 },
  ])
  const [successMessage, setSuccessMessage] = useState('')

  const handleAddProductRow = () => {
    setProductRows([...productRows, { id: Date.now().toString(), name: '', quantity: 0 }])
  }

  const handleRemoveProductRow = (id: string) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter((row) => row.id !== id))
    }
  }

  const handleProductChange = (id: string, field: string, value: string | number) => {
    setProductRows(productRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const hasEmptyFields = productRows.some((row) => !row.name || row.quantity === 0)
    if (!formData.supplier || !formData.date || hasEmptyFields) {
      return
    }
    setSuccessMessage('Incoming goods added successfully!')
    setTimeout(() => {
      setFormData({ supplier: suppliers[0], date: new Date().toISOString().split('T')[0] })
      setProductRows([{ id: '1', name: '', quantity: 0 }])
      setSuccessMessage('')
    }, 2000)
  }

  const selectedShipmentData = recentShipments.find((s) => s.id === selectedShipment)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Incoming Goods Management</h1>
        <p className="text-muted-foreground">Track and record incoming shipments</p>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Recent Shipments */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Recent Shipments</h2>
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-y-auto max-h-96">
              {recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  onClick={() => setSelectedShipment(shipment.id)}
                  className={`p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-secondary/50 ${
                    selectedShipment === shipment.id ? 'bg-secondary border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{shipment.id}</p>
                      <p className="text-muted-foreground text-xs">{shipment.supplier}</p>
                    </div>
                    <Badge
                      className={`border-0 rounded-lg text-xs ${
                        shipment.status === 'Received'
                          ? 'bg-emerald-500/30 text-emerald-300'
                          : shipment.status === 'In Transit'
                            ? 'bg-blue-500/30 text-blue-300'
                            : 'bg-orange-500/30 text-orange-300'
                      }`}
                    >
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{shipment.items} items</span>
                    <span>{shipment.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment Details */}
          {selectedShipmentData && (
            <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 space-y-4">
              <h3 className="font-bold text-foreground">Shipment Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="text-foreground font-mono">{selectedShipmentData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="text-foreground">{selectedShipmentData.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items:</span>
                  <span className="text-foreground font-semibold">{selectedShipmentData.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Qty:</span>
                  <span className="text-foreground font-semibold">{selectedShipmentData.totalQty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground">{selectedShipmentData.date}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Add New Incoming Goods Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Add New Incoming Goods</h2>
          <form onSubmit={handleSubmit} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 text-sm font-medium">
                {successMessage}
              </div>
            )}

            {/* Supplier Select */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Supplier</label>
              <select
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full bg-input backdrop-blur-xl border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Select */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-input backdrop-blur-xl border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Products Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Products</label>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {productRows.map((row, idx) => (
                  <div key={row.id} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={row.name}
                      onChange={(e) => handleProductChange(row.id, 'name', e.target.value)}
                      className="flex-1 bg-input backdrop-blur-xl border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={row.quantity || ''}
                      onChange={(e) => handleProductChange(row.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-20 bg-input backdrop-blur-xl border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    {productRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProductRow(row.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Product Row Button */}
              <button
                type="button"
                onClick={handleAddProductRow}
                className="w-full py-2 px-4 border border-dashed border-border rounded-xl text-accent hover:bg-secondary/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
            >
              Record Incoming Goods
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { IncomingGoodsPage }
