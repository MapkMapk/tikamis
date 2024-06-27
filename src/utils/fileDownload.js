export default function handleFileDownload(data, filename) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    // Освобождение URL объекта
    URL.revokeObjectURL(url);
}