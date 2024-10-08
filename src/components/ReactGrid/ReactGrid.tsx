import {
  ReactGrid as ReactGridComponent,
  type CellChange,
  type CellLocation,
  type Column,
  type Id,
  type MenuOption,
  type Row,
  type SelectionMode,
} from '@silevis/reactgrid'
import '@silevis/reactgrid/styles.css'
import * as React from 'react'

interface Person {
  name: string
  surname: string
  birth: Date | undefined
  mobile: number
  company: string
  occupation: string
}

const getPeople = (): Person[] => [
  {
    name: 'Thomas',
    surname: 'Goldman',
    birth: new Date('1970-12-02'),
    mobile: 574839457,
    company: 'Snatia Ebereum',
    occupation: 'CEO',
  },
  {
    name: 'Mathew Lawrence',
    surname: 'Joshua',
    birth: new Date('1943-12-02'),
    mobile: 684739283,
    company: 'De-Jaiz Mens Clothing',
    occupation: 'Technical recruiter',
  },
  {
    name: 'Susie Evelyn',
    surname: 'Spencer',
    birth: new Date('1976-01-23'),
    mobile: 684739283,
    company: 'Harold Powell',
    occupation: 'Concrete paving machine operator',
  },
  {
    name: '',
    surname: '',
    birth: undefined,
    mobile: NaN,
    company: '',
    occupation: '',
  },
]

const getColumns = (): Column[] => [
  { columnId: 'Name', width: 150 },
  { columnId: 'Surname', width: 100 },
  { columnId: 'Birth Data', width: 100 },
  { columnId: 'Phone', width: 100 },
  { columnId: 'Company', width: 150 },
  { columnId: 'Occupation', width: 230 },
]

const headerRow: Row = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Name' },
    { type: 'header', text: 'Surname' },
    { type: 'header', text: 'Birth Data' },
    { type: 'header', text: 'Phone' },
    { type: 'header', text: 'Company' },
    { type: 'header', text: 'Occupation' },
  ],
}

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: 'text', text: person.name },
      { type: 'text', text: person.surname },
      { type: 'date', date: person.birth },
      { type: 'number', value: person.mobile },
      { type: 'text', text: person.company },
      { type: 'text', text: person.occupation },
    ],
  })),
]

const headerRowWithSpan: Row = {
  rowId: 'header',
  cells: [
    { type: 'header', text: "'Merged' column", colspan: 2 },
    { type: 'header', text: 'Birth Data' },
    { type: 'header', text: 'Phone' },
    { type: 'header', text: 'Company' },
    { type: 'header', text: 'Occupation' },
  ],
}

const getRowsWithSpan = (people: Person[]): Row[] => [
  headerRowWithSpan,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: 'text', text: `${person.name} ${person.surname}`, colspan: 2 },
      { type: 'date', date: person.birth },
      { type: 'number', value: person.mobile },
      { type: 'text', text: person.company },
      { type: 'text', text: person.occupation },
    ],
  })),
]

const applyChangesToPeople = (
  changes: CellChange[],
  prevPeople: Person[]
): Person[] => {
  changes.forEach((change) => {
    if (change.newCell.type === 'text') {
      const personIndex = change.rowId as number
      const fieldName = change.columnId as keyof Person
      prevPeople[personIndex][fieldName] = change.newCell.text as never
    }
  })
  return [...prevPeople]
}

export default function ReactGrid() {
  const [people, setPeople] = React.useState<Person[]>(getPeople())
  const [columns] = React.useState<Column[]>(getColumns())

  const rows = getRows(people)
  const rowsWithSpan = getRowsWithSpan(people)

  const handleChanges = (changes: CellChange[]) => {
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople))
  }

  const handleContextMenu = (
    selectedRowIds: Id[],
    selectedColIds: Id[],
    selectionMode: SelectionMode,
    menuOptions: MenuOption[],
    selectedRanges: CellLocation[][]
  ): MenuOption[] => {
    if (selectionMode === 'row') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'removePerson',
          label: 'Remove person',
          handler: () => {
            setPeople((prevPeople) => {
              return [
                ...prevPeople.filter(
                  (person, idx) => !selectedRowIds.includes(idx)
                ),
              ]
            })
          },
        },
      ]
    }
    return menuOptions
  }

  return (
    <div>
      <h3>regular component</h3>

      <ReactGridComponent
        rows={rows}
        columns={columns}
        stickyLeftColumns={1}
        stickyRightColumns={1}
        stickyTopRows={1}
        stickyBottomRows={1}
        enableFillHandle
        enableRangeSelection
        enableColumnSelection
        onContextMenu={handleContextMenu}
        onCellsChanged={handleChanges}
      />

      <h3>with colSpan</h3>

      <ReactGridComponent
        rows={rowsWithSpan}
        columns={columns}
        stickyLeftColumns={1}
        stickyRightColumns={1}
        stickyTopRows={1}
        stickyBottomRows={1}
        enableFillHandle
        enableRangeSelection
        enableColumnSelection
        onContextMenu={handleContextMenu}
        onCellsChanged={handleChanges}
      />
    </div>
  )
}
