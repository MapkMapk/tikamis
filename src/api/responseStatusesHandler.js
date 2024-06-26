export function responseStatusesHandler(response) {
  if (response.status === 409) {
    console.log('Conflict response:', response.data);
    alert(response.data);
    // Дополнительные проверки DOM элементов
    setTimeout(() => {
      console.log('Checking element heights after alert...');
      document.querySelectorAll('*').forEach(el => {
        console.log(el, el.offsetHeight);
      });
    }, 1000); // Задержка для завершения алерта
  }
  if (
    response.status > 400 &&
    response.status !== 409 &&
    response.status !== 401
  ) {
    alert(`Произошла ошибка на сервере, код ошибки ${response.status}`);
  }
}