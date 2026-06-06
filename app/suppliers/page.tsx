import { getSuppliers } from '@/lib/services/suppliers'

export default async function SuppliersPage() {
  const suppliers = await getSuppliers()

  return (
    <div>
      <h1>Daftar Supplier</h1>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kontak</th>
            <th>Telepon</th>
            <th>Kategori</th>
          </tr>
        </thead>

        <tbody>
          {suppliers?.map((s) => (
            <tr key={s.supplier_id}>
              <td>{s.supplier_name}</td>
              <td>{s.contact_name}</td>
              <td>{s.phone}</td>
              <td>{(s.categories as any)?.category_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}