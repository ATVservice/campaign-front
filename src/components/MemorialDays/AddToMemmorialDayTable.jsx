import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AddToMemmorialDayTable({ rowData, onAddMemorialDayToPerson }) {
  const hebrewToEnglishMapping = {
    "מזהה אנש": "AnashIdentifier",
    שם: "FirstName",
    משפחה: "LastName",
  };

  const heLocaleText = {
    page: "עמוד",
    more: "עוד",
    to: "עד",
    of: "מתוך",
    next: "הבא",
    last: "אחרון",
    first: "ראשון",
    previous: "הקודם",
    loadingOoo: "טוען...",
    noRowsToShow: "אין נתונים להצגה",
  };

  const replaceTextNodes = (rootEl, regex, replacement) => {
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
    const toChange = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (regex.test(node.nodeValue)) {
        toChange.push(node);
      }
    }
    toChange.forEach((node) => {
      node.nodeValue = node.nodeValue.replace(regex, replacement);
    });
  };

  const replacePageSizeEverywhere = () => {
    const containers = document.querySelectorAll(`
      .ag-paging-panel,
      .ag-paging-page-size-panel,
      .ag-paging-page-size,
      .ag-status-bar,
      .ag-root-wrapper
    `);
    containers.forEach((el) => {
      replaceTextNodes(el, /\bpage\s*size\b/gi, "רשומות בעמוד");
    });
  };

  useEffect(() => {
    const t1 = setTimeout(replacePageSizeEverywhere, 0);
    const t2 = setTimeout(replacePageSizeEverywhere, 100);
    const t3 = setTimeout(replacePageSizeEverywhere, 500);

    const root = document.querySelector(".ag-root-wrapper") || document.body;
    const mo = new MutationObserver(() => {
      replacePageSizeEverywhere();
    });
    mo.observe(root, { subtree: true, childList: true, characterData: true });

    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      mo.disconnect();
    };
  }, []);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const onSearch = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);

  };


  const hebrewFilterOptions = [
    {
      displayKey: "contains",
      displayName: "מכיל",
      test: (filterValue, cellValue) => {
        return (
          cellValue != null &&
          cellValue
            .toString()
            .toLowerCase()
            .indexOf(filterValue.toLowerCase()) >= 0
        );
      },
    },
    {
      displayKey: "startsWith",
      displayName: "מתחיל ב",
      test: (filterValue, cellValue) => {
        return (
          cellValue != null &&
          cellValue
            .toString()
            .toLowerCase()
            .startsWith(filterValue.toLowerCase())
        );
      },
    },
  ];
  const ActionCellRenderer = (props) => {
    // const isCurrentRowEditing = props.api.getEditingCells().some((cell) => cell.rowIndex === props.node.rowIndex);

    return (
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          className="action-button update border-2 p-1 w-[100px]"
          onClick={() => addMemorialDay(props.api, props.node)}
        >
          הוסף
        </button>
      </div>
    );
  };

  const addMemorialDay = async (api, node) => {
    const { AnashIdentifier } = node.data;
    onAddMemorialDayToPerson(AnashIdentifier);

  };

  const columns = [
    {
      headerName: "מזהה אנש",
      field: "AnashIdentifier",
      editable: false,
      sortable: true,
      filter: true,
      width: 120,
      sort: 'asc'  // This will sort the column from lowest to highest by default

    },
    {
      headerName: "שם",
      field: "FirstName",
      editable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: "משפחה",
      field: "LastName",
      editable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: "הוסף יום הנצחה",
      cellRenderer: ActionCellRenderer,
      editable: false,
      colId: "action",
    },
  ];

  const pageSizeOptions = [2, 4];

  return (
    <div>
      <input
        type="text"
        placeholder="חיפוש..."
        value={searchText}
        onChange={onSearch}
        className="block mb-6 p-2 m-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <div className="ag-theme-alpine custom-theme p-2 w-[50vw]">
        {
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={2} // Increase the pagination page size as needed
            paginationPageSizeSelector={pageSizeOptions} // this property is not a valid AG Grid property
            domLayout="autoHeight" // Use autoHeight layout to adjust grid height automatically
            enableRtl={true}
            localeText={heLocaleText}
            quickFilterText={searchText} // Applying the search text to filter the grid
            suppressClickEdit={true}
            defaultColDef={{
              filterParams: {
                filterOptions: hebrewFilterOptions,
              },
            }}
            gridOptions={{
              enableCellTextSelection: true,
              localeText: {
                noRowsToShow: 'אין שורות להצגה'

              }

            }}

          />
        }
      </div>
    </div>
  );
}

export default AddToMemmorialDayTable;
