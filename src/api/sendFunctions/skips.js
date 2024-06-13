import { unixToDate } from '@/utils/time/dateUtils.js';

export function convertToLossTableFormat(tabularTitle, data, filter) {
    
    const result = [];
    
    let previousMechanic = null;
    let previousPost = null;
    if (filter == 'itemsByPosts') {
        result.push(["Пост", "Работы", "Потери", "Время записи", "Телефон", "Автомобиль", "Причина"]);
        data.forEach(post => {
            post.works.forEach(work => {
                let currentPost = post.postNumber;

                if(currentPost !== previousPost) {
                    previousPost = currentPost;
                } else {
                    currentPost = null;
                }
                result.push([
                    currentPost, // Механик/Пост
                    work.workName, // Работы
                    work.loss, // Потери
                    unixToDate(work.unixBookingTime), // Время записи
                    work.phone, // Телефон
                    work.plate, // Автомобиль
                    work.reason
                ]);
            });
        });
    } else {
        result.push(["Механик", "Работы", "Потери", "Время записи", "Телефон", "Автомобиль", "Причина"]);
        data.forEach(mechanic => {
            mechanic.works.forEach(work => {
                let currentMechanic = mechanic.mechanicName;

                if(currentMechanic !== previousMechanic) {
                    previousMechanic = currentMechanic;
                } else {
                    currentMechanic = null;
                }
                result.push([
                    currentMechanic, // Механик/Пост
                    work.workName, // Работы
                    work.loss, // Потери
                    unixToDate(work.unixBookingTime), // Время записи
                    work.phone, // Телефон
                    work.plate, // Автомобиль
                    work.reason
                ]);
            });
        });
    }

    return {
        title: tabularTitle,
        content: result
    };
}
export function convertToLossTableFormatV2(tabularTitle, data, filter) {
    const result = [];
     // Добавляем заголовки таблицы

     if (filter == 'itemsByPosts') {
        result.push(["Пост", "Работы", "Потери"]);
        let previousPostNumber = null;
        data.forEach(post => {
            post.works.forEach(work => {
                let currentPostNumber = post.postNumber;
                if(currentPostNumber !== previousPostNumber) {
                    previousPostNumber = currentPostNumber;
                } else {
                    currentPostNumber = null;
                }
                result.push([
                    currentPostNumber, // Пост
                    work.workName, // Работы
                    work.loss // Потери
                ]);
            });
        });
    } else {
        result.push(["Механик", "Работы", "Потери"]);
        let previousMechanicName = null;
        data.forEach(mechanic => {
            mechanic.works.forEach(work => {
                let currentMechanicName = mechanic.mechanicName;
                if(currentMechanicName !== previousMechanicName) {
                    previousMechanicName = currentMechanicName;
                } else {
                    currentMechanicName = null;
                }
                result.push([
                    currentMechanicName, // Механик
                    work.workName, // Работы
                    work.loss // Потери
                ]);
            });
        });
    }

    return {
        title: tabularTitle,
        content: result
    };
}
export function convertToWorkDetailsTable(tabularTitle, data, filter) {
    const result = [];

    if (filter == 'itemsByPosts') {
        result.push(["Работы", "Записанный номер", "Фактический номер", "Пост", "Время записи", "Телефон"]); // Добавляем заголовки таблицы
        let previousPostNumber = null;
        data.forEach(post => {
            post.works.forEach(work => {
                let currentPostNumber = post.postNumber;
                if(currentPostNumber !== previousPostNumber) {
                    previousPostNumber = currentPostNumber;
                } else {
                    currentPostNumber = null;
                }
                result.push([
                    work, // Работы
                    post.expectedPlate, // Записанный номер
                    post.factPlate, // Фактический номер
                    currentPostNumber, // Механик (или пост)
                    unixToDate(post.unixBookingTime), // Время записи
                    post.phoneNumber // Телефон
                ]);
            });
        });
    } else {
        result.push(["Работы", "Записанный номер", "Фактический номер", "Механик", "Время записи", "Телефон"]); // Добавляем заголовки таблицы
        let previousMechanicName = null;
        data.forEach(mechanic => {
            mechanic.works.forEach(work => {
                let currentMechanicName = mechanic.mechanicName;
                if(currentMechanicName !== previousMechanicName) {
                    previousMechanicName = currentMechanicName;
                } else {
                    currentMechanicName = null;
                }
                result.push([
                    work, // Работы
                    mechanic.expectedPlate, // Записанный номер
                    mechanic.factPlate, // Фактический номер
                    currentMechanicName, // Механик (или пост)
                    unixToDate(mechanic.unixBookingTime), // Время записи
                    mechanic.phoneNumber // Телефон
                ]);
            });
        });
    }

    return {
        title: tabularTitle,
        content: result
    };
}