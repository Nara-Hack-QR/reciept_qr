type Commodity = {
    id: string;
    name: string;
    price: number;
    count: number;
};

type Receipt = {
    date: string;
    commodities: Commodity[]; 
    publisherName: string;
    totalPrice: number;
    publisherAddress: string;
};