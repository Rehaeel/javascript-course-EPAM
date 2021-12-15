export interface State {
    shipmentId: number;
    toAdress: string;
    fromAdress: string;
    toZipCode: string;
    fromZipCode: string;
    weight: number;
    marks?: string[];
}
