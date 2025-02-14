import React from 'react'
import DataTable from "examples/Tables/DataTable";
export default function OffersTable({data}) {
    const columns = [
        { Header: "SNo.", accessor: "no", align: "left" }, // Updated to "no" instead of "no."
        { Header: "Company name", accessor: "cname", align: "left" },
        { Header: "Role", accessor: "role", align: "center" },
        { Header: "Eligibility", accessor: "eligibility", align: "center" },
        { Header: "Open Date", accessor: "openDate", align: "center" },
        { Header: "Close Date", accessor: "closeDate", align: "center" },
      ];
      const rows = data.map((data, index) => ({
        no: index + 1, // Serial number
        cname: data.cname,
        role: data.role,
        eligibility: data.eligibility,
        openDate: data.open_date,
        closeDate: data.close_date,
       
        
      }));

  return (
    <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
  )
}
