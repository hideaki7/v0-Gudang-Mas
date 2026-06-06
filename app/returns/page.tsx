import { getReturns } from '@/lib/services/returns'

export default async function ReturnsPage() {
  const returns = await getReturns()

  return (
    <div>
      <h1>Daftar Retur</h1>

      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Supplier</th>
            <th>Alasan</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {returns?.map((r) => (
            <tr key={r.return_id}>
              <td>{r.return_date}</td>
              <td>{(r.suppliers as any)?.supplier_name}</td>
              <td>{r.reason}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}