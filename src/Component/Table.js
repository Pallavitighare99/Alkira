import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce, usePagination, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faArrowDownShortWide, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'
import Info from './Info'
import axios from 'axios'
import Search from './Search'
import Pages from './Pagination'


const NBATable = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [info, setInfo] = useState([]);
  function getData() {
    axios.get(`https://www.balldontlie.io/api/v1/teams`).then((resp) => {
      setInfo(resp.data.data);
    }
    )
  }
  useEffect(() => {
    getData();
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: 'full_name',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Conference',
        accessor: 'conference',
      },
      {
        Header: 'Abbreviation',
        accessor: 'abbreviation',
      },
    ],
    []
  )
  function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter, }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
    return (
      <Search value={value} onChange={onChange} setValue={setValue}/>
    )
  }
  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state,
      preGlobalFilteredRows,
      setGlobalFilter,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable({ columns, data, }, useGlobalFilter, useSortBy, usePagination)
    return (
      <>
        <div className="row">
          <div className="col-sm-4 left-col">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>
        <div className="table-responsive mt-3">
          <table {...getTableProps()} className="table">
            <thead className='thead-light'>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')} &nbsp;
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <FontAwesomeIcon icon={faArrowDownShortWide} />
                            : <FontAwesomeIcon icon={faArrowUpWideShort} />
                          : <FontAwesomeIcon icon={faSort} />}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps() } onClick={() => { setId(row.original.id); handleShow(); }}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Info show={show} handleClose={handleClose} id={id} />
        <Pages canPreviousPage={canPreviousPage} canNextPage={canNextPage} pageOptions={pageOptions} pageCount={pageCount} gotoPage={gotoPage} nextPage={nextPage} previousPage={previousPage} pageIndex={pageIndex} pageSize={pageSize} setPageSize={setPageSize} />
      </>
    )
  }
  return (
    <div>
      <Table columns={columns} data={info} />
    </div>
  )
}

export default NBATable