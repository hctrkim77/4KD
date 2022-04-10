
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const PAGE_SIZE = 5;

function loadServerRows(cursor, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = cursor ? data.rows.findIndex((row) => row.id === cursor) : 0;
      const end = start + PAGE_SIZE;
      const rows = data.rows.slice(start, end);

      resolve({ rows, nextCursor: data.rows[end]?.id });
    }, Math.random() * 200 + 100); // simulate network latency
  });
}

export default function CursorPaginationGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const pagesNextCursor = React.useRef({});

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = (newPage) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || pagesNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      const nextCursor = pagesNextCursor.current[page - 1];

      if (!nextCursor && page > 0) {
        return;
      }

      setLoading(true);
      const response = await loadServerRows(nextCursor, data);

      if (response.nextCursor) {
        pagesNextCursor.current[page] = response.nextCursor;
      }

      if (!active) {
        return;
      }

      setRows(response.rows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, data]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={data.columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowCount={100}
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        loading={loading}
      />
    </div>
  );
}

/*
 // 두 번째
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// Simulates server data loading

const loadServerRows = (page, pageSize, allRows) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(allRows.slice(page * pageSize, (page + 1) * pageSize));
    }, Math.random() * 200 + 100); // simulate network latency
  });
const [rows, setRows] = React.useState([]);
const [page, setPage] = React.useState(0);
const [loading, setLoading] = React.useState(false);
const handlePageChange = (newPage) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || pagesNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
  };

const useQuery = (page, pageSize, allRows) => {
  const [rowCount, setRowCount] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    setIsLoading(true);
    setRowCount(undefined);
    loadServerRows(page, pageSize, allRows).then((newRows) => {
      if (!active) {
        return;
      }
      setData(newRows);
      setIsLoading(false);
      setRowCount(allRows.length);
    });

    return () => {
      active = false;
    };
  }, [page, pageSize, allRows]);

  return { isLoading, data, rowCount };
};


// TODO: Improve `useDemoData` to move the fake pagination inside it instead of "fetching" everything of slicing in the component
 
export default function ServerPaginationGrid() {
  const [pageSize, setPageSize] = React.useState(5);
  const { data: demoData } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const [rowsState, setRowsState] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const { isLoading, data, rowCount } = useQuery(
    rowsState.page,
    rowsState.pageSize,
    demoData.rows,
  );

  // Some api client return undefine while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(rowCount || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={demoData.columns}
        rows={data}
        rowCount={rowCountState}
        pageSize={pageSize}
        loading={isLoading}
        rowsPerPageOptions={[5, 10 ,20]}
        pagination
        {...data}
        paginationMode="server"
    //    onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
    //    onPageSizeChange={(pageSize) =>
    //     setRowsState((prev) => ({ ...prev, pageSize }))
    //    }
        onPageChange={handlePageChange}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </div>
  );
}

*/
/* // 두 번째 것 원본
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// Simulates server data loading
 const loadServerRows = (page, pageSize, allRows) =>
 new Promise((resolve) => {
   setTimeout(() => {
     resolve(allRows.slice(page * pageSize, (page + 1) * pageSize));
   }, Math.random() * 200 + 100); // simulate network latency
 });

const useQuery = (page, pageSize, allRows) => {
 const [rowCount, setRowCount] = React.useState(undefined);
 const [isLoading, setIsLoading] = React.useState(false);
 const [data, setData] = React.useState([]);

 React.useEffect(() => {
   let active = true;

   setIsLoading(true);
   setRowCount(undefined);
   loadServerRows(page, pageSize, allRows).then((newRows) => {
     if (!active) {
       return;
     }
     setData(newRows);
     setIsLoading(false);
     setRowCount(allRows.length);
   });

   return () => {
     active = false;
   };
 }, [page, pageSize, allRows]);

 return { isLoading, data, rowCount };
};


// TODO: Improve `useDemoData` to move the fake pagination inside it instead of "fetching" everything of slicing in the component

export default function ServerPaginationGrid() {
 const { data: demoData } = useDemoData({
   dataSet: 'Commodity',
   rowLength: 100,
   maxColumns: 6,
 });

 const [rowsState, setRowsState] = React.useState({
   page: 0,
   pageSize: 5,
 });

 const { isLoading, data, rowCount } = useQuery(
   rowsState.page,
   rowsState.pageSize,
   demoData.rows,
 );

 // Some api client return undefine while loading
 // Following lines are here to prevent `rowCountState` from being undefined during the loading
 const [rowCountState, setRowCountState] = React.useState(rowCount || 0);
 React.useEffect(() => {
   setRowCountState((prevRowCountState) =>
     rowCount !== undefined ? rowCount : prevRowCountState,
   );
 }, [rowCount, setRowCountState]);

 return (
   <div style={{ height: 400, width: '100%' }}>
     <DataGrid
       columns={demoData.columns}
       rows={data}
       rowCount={rowCountState}
       loading={isLoading}
       rowsPerPageOptions={[5]}
       pagination
       {...rowsState}
       paginationMode="server"
       onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
       onPageSizeChange={(pageSize) =>
         setRowsState((prev) => ({ ...prev, pageSize }))
       }
     />
   </div>
 );
}
*/