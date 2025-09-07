import  dayjs  from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; 

export function findDeliveryOption(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}

function isWeekend(date){
    if(date.format('dddd') === 'Sunday' || date.format('dddd') === 'Saturday'){
        return true;
    }
    else return false;
}


export function calcDeliveryDate(deliveryOption){
    const today = dayjs();
    let daysToAdd = deliveryOption.deliveryDays;
    let deliveryDate = today;
    while (daysToAdd >0){
        deliveryDate = deliveryDate.add(1,'days');
        if(!isWeekend(deliveryDate)){
            daysToAdd--;
        }
    }
    return deliveryDate.format('dddd, MMMM D');
}

export const deliveryOptions = [
    {
        id : '1',
        deliveryDays : 7,
        priceCents : 0
    },
    {
        id : '2',
        deliveryDays : 3,
        priceCents : 499
    },
    {
        id : '3',
        deliveryDays : 1,
        priceCents : 999
    }
]