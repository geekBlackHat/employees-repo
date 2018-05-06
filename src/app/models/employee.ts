export interface Employee {
  name: string;
  phone: string
  address: {
    city: string;
    address_line1: string;
    address_line2: string;
    postal_code: string;
  }
}
