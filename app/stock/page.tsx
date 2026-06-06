import { getAllStock } from '@/lib/services/stock'

export default async function StockPage() {
  const stocks = await getAllStock()

  return (
    <div>
      <h1>Stok Gudang</h1>

      <table>
        <thead>
          <tr>
            <th>Produk</th>
            <th>SKU</th>
            <th>Stok</th>
            <th>Min. Stok</th>
            <th>Satuan</th>
          </tr>
        </thead>

        <tbody>
          {stocks?.map((s) => {
            const product = s.products as any
            const isLow = s.quantity < s.min_quantity

            return (
              <tr
                key={s.stock_id}
                style={{ color: isLow ? 'red' : 'inherit' }}
              >
                <td>{product?.product_name}</td>
                <td>{product?.sku}</td>
                <td>{s.quantity}</td>
                <td>{s.min_quantity}</td>
                <td>{product?.unit}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}