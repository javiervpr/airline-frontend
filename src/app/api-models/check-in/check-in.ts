export interface CheckIn {
  checkInId: string,
  flightId:	string,
  date: string,
  seat: Seat,
  baggages: Baggage[],
  passanger: Passenger
  avaibleSeats?: Seat[],
}

export interface Baggage {
  weight:	number,
  type?:	string,
  checkInId?:	string
}

export interface Seat {
  code: string,
  type: string,
  status: string,
  rowColumn: string
}

export interface Passenger {
  id: string,
  name: string,
  lastname: string,
  birthday: string,
  ci: string,
  needAssistance: boolean
}


