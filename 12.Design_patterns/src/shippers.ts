export interface Shipper {
    getCost(): number;
}

export class AirEastShipper implements Shipper {
    public getCost(): number {
        return 0.39;
    }
}

export class ChicagoSprintShipper implements Shipper {
    public getCost(): number {
        return 0.42;
    }
}

export class PacificParcelShipper implements Shipper {
    public getCost(): number {
        return 0.51;
    }
}

export class ChooseShipper {
    private shipper: Shipper;
    setShipper(shipper: Shipper): void {
        this.shipper = shipper;
    }
    getShipperRate(): number {
        return this.shipper.getCost();
    }
}
