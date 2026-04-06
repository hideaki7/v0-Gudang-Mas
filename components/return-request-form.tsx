'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'

interface FormData {
  shipmentId: string
  supplierName: string
  productName: string
  quantityToReturn: string
  returnReason: string
  photoFile: File | null
}

const returnReasons = [
  'Damaged',
  'Wrong Specification',
  'Shortage',
  'Defective',
  'Expired',
  'Wrong Item',
]

const shipmentIds = [
  { id: 'SHP001', supplier: 'PT Maju Jaya' },
  { id: 'SHP002', supplier: 'CV Industri Indonesia' },
  { id: 'SHP003', supplier: 'PT Karya Mitra' },
  { id: 'SHP004', supplier: 'Supplier Berkah' },
  { id: 'SHP005', supplier: 'PT Global Trade' },
]

export function ReturnRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    shipmentId: '',
    supplierName: '',
    productName: '',
    quantityToReturn: '',
    returnReason: '',
    photoFile: null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleShipmentChange = (shipmentId: string) => {
    const selected = shipmentIds.find((s) => s.id === shipmentId)
    setFormData((prev) => ({
      ...prev,
      shipmentId,
      supplierName: selected?.supplier || '',
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photoFile: file }))
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photoFile: null }))
    setPhotoPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          shipmentId: '',
          supplierName: '',
          productName: '',
          quantityToReturn: '',
          returnReason: '',
          photoFile: null,
        })
        setPhotoPreview(null)
      }, 2000)
    }, 1000)
  }

  const handleCancel = () => {
    setFormData({
      shipmentId: '',
      supplierName: '',
      productName: '',
      quantityToReturn: '',
      returnReason: '',
      photoFile: null,
    })
    setPhotoPreview(null)
  }

  const isFormValid =
    formData.shipmentId &&
    formData.productName &&
    formData.quantityToReturn &&
    formData.returnReason &&
    formData.photoFile

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Product Return Request</h1>
        <p className="text-muted-foreground">Submit a request to return defective or incorrect products</p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="bg-emerald-500/30 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/50 flex items-center justify-center text-sm">✓</div>
          <span>Return request submitted successfully! Your request is now pending approval.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Shipment Selection */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            Select Incoming Shipment
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Shipment ID *</label>
              <select
                value={formData.shipmentId}
                onChange={(e) => handleShipmentChange(e.target.value)}
                required
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
              >
                <option value="">Select a shipment...</option>
                {shipmentIds.map((shipment) => (
                  <option key={shipment.id} value={shipment.id}>
                    {shipment.id} - {shipment.supplier}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Supplier Name</label>
              <input
                type="text"
                value={formData.supplierName}
                readOnly
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-muted-foreground outline-none"
              />
              <p className="text-xs text-muted-foreground mt-1">Auto-filled based on selected shipment</p>
            </div>
          </div>
        </div>

        {/* Step 2: Product Information */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            Product Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
                placeholder="Enter product name..."
                required
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity to Return *</label>
              <input
                type="number"
                value={formData.quantityToReturn}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantityToReturn: e.target.value }))}
                placeholder="Enter quantity..."
                min="1"
                required
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Return Reason */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            Return Reason
          </h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select Reason *</label>
            <select
              value={formData.returnReason}
              onChange={(e) => setFormData((prev) => ({ ...prev, returnReason: e.target.value }))}
              required
              className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
            >
              <option value="">Select a return reason...</option>
              {returnReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 4: Upload Photo */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              4
            </span>
            Upload Defect Photo
          </h2>

          <div>
            {!photoPreview ? (
              <label className="flex items-center justify-center w-full border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20 backdrop-blur-md">
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium text-foreground">Drag and drop your photo here</p>
                    <p className="text-sm text-muted-foreground">or click to select a file</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  required
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full max-w-sm mx-auto">
                  <img
                    src={photoPreview}
                    alt="Defect photo"
                    className="w-full h-64 object-cover rounded-xl border border-border"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 bg-destructive/80 hover:bg-destructive p-2 rounded-lg text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex items-center justify-center w-full border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20 backdrop-blur-md">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload a different photo</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-secondary/50 hover:bg-secondary text-foreground rounded-xl transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="px-6 py-3 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-xl transition-all duration-200 font-medium shadow-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Return'}
          </button>
        </div>
      </form>
    </div>
  )
}
