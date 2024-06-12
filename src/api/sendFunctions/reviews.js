import { unixToDate } from '@/utils/time/dateUtils.js';
export function convertToTableFormat(tabularTitle, tableHeaders, tableRows) {
    const content = [];
    const headerData = [];
    tableHeaders.forEach(header => {
      headerData.push(header.header);
    });
    content.push(headerData);
  
    tableRows.forEach(row => {
      const rowData = [];
      let rowDate = unixToDate(row.date)
      if (row.type == '1') {
        rowData.push(row.smileContent, row.tone, rowDate, row.phoneNumber, row.plate);
    } else if (row.type == '2') {
        rowData.push(row.textContent, row.tone, rowDate, row.phoneNumber, row.plate);
    } else {
        rowData.push("Голосовое сообщение", row.tone, rowDate, row.phoneNumber, row.plate);
    }
      
      content.push(rowData);
    });
  
    const tableData = {
      title: tabularTitle,
      content: content,
    };
    
    return tableData;
  }