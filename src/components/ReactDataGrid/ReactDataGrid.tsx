import 'react-data-grid/lib/styles.css'
import { useCallback, useMemo, useState } from 'react'
import DataGrid, {
  type Column,
  type SortColumn,
  type ColSpanArgs,
} from 'react-data-grid'

interface Row {
  readonly id: number
  [key: string]: string | number
}

function createRows(numRows: number, numColumns: number): Row[] {
  const rows: Row[] = []

  for (let i = 0; i < numRows; i++) {
    const row: Row = { id: i }
    for (let j = 0; j < numColumns; j++) {
      row[`Column${j}`] = `Row${i}Col${j}`
    }
    rows.push(row)
  }

  return rows
}

function createColumns(numColumns: number): Column<Row>[] {
  return Array.from({ length: numColumns }, (_, index) => ({
    key: `Column${index}`,
    name: `Column ${index + 1}`,
    resizable: true,
    sortable: true,
    draggable: true,
    colSpan: getColSpan,
  }))
}

function getColSpan(args: ColSpanArgs<Row, unknown>): number | undefined {
  if (args.type === 'ROW') {
    if (args.row.id === 2) {
      return 2
    }

    if (args.row.id === 5) {
      return 3
    }
  }

  return undefined
}

export default function App() {
  const [rows] = useState(() => createRows(10000, 1000))
  const [columnsOrder, setColumnsOrder] = useState((): readonly number[] =>
    createColumns(1000).map((_, index) => index)
  )
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([])
  const columns = useMemo(() => createColumns(1000), [])

  const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns.slice(-1))
  }, [])

  const reorderedColumns = useMemo(() => {
    return columnsOrder.map((index) => columns[index])
  }, [columnsOrder, columns])

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows
    const { columnKey, direction } = sortColumns[0]

    let sortedRows: Row[] = [...rows]

    if (columnKey !== 'id') {
      sortedRows = sortedRows.sort((a, b) =>
        typeof a[columnKey] === 'string'
          ? (a[columnKey] as string).localeCompare(b[columnKey] as string)
          : (a[columnKey] as number) - (b[columnKey] as number)
      )
    }

    return direction === 'DESC' ? sortedRows.reverse() : sortedRows
  }, [rows, sortColumns])

  function onColumnsReorder(sourceKey: string, targetKey: string) {
    setColumnsOrder((columnsOrder) => {
      const sourceColumnOrderIndex = columnsOrder.findIndex(
        (index) => columns[index].key === sourceKey
      )
      const targetColumnOrderIndex = columnsOrder.findIndex(
        (index) => columns[index].key === targetKey
      )
      const sourceColumnOrder = columnsOrder[sourceColumnOrderIndex]
      const newColumnsOrder = columnsOrder.toSpliced(sourceColumnOrderIndex, 1)
      newColumnsOrder.splice(targetColumnOrderIndex, 0, sourceColumnOrder)
      return newColumnsOrder
    })
  }

  return (
    <DataGrid
      columns={reorderedColumns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      defaultColumnOptions={{ width: '1fr' }}
      onColumnsReorder={onColumnsReorder}
    />
  )
}
