import {FlightProgramState} from "../models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {FlightProgram} from "../../api-models";
import {createReducer, on} from "@ngrx/store";
import {FlightProgramActions} from "../actions";

const selectId = (flightProgram: FlightProgram) => flightProgram.id;

export const flightProgramEntityAdapter: EntityAdapter<FlightProgram> = createEntityAdapter<FlightProgram>({
  selectId
});

export const initialState: FlightProgramState = flightProgramEntityAdapter.getInitialState({
  flightProgramSelected: {
    "id": 15,
    "created_at": "2022-10-18T15:41:46.000000Z",
    "updated_at": "2022-10-18T15:41:46.000000Z",
    "startTime": "2022-01-01 00:00:00",
    "endTime": "2022-02-02 00:00:00",
    "crewUuid": "asas",
    "aircraftUuid": "ass",
    "status": "active",
    "flightProgramId": 1,
    "uuid": "c8adfb37-8c45-46a4-8956-88a648dd2c89",
    "information": {
      "tickets": [
        {
          "clase": "turist",
          "price": 50,
          "quant": 20
        },
        {
          "clase": "first",
          "price": 120,
          "quant": 5
        }
      ],
      "avaibleSeats": [
        {
          "code": "19e85ca6-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": undefined
        },
        {
          "code": "200d3b06-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "BOOKED",
          "rowColumn": "2_5"
        },
        {
          "code": "24f92f76-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": undefined
        },
        {
          "code": "19e85ca6-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": undefined
        },
        {
          "code": "200d3b06-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "BOOKED",
          "rowColumn": "2_5"
        },
        {
          "code": "39e85ca6-368f-11ed-a261-0242ac120102",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": "5_2"
        },
        {
          "code": "200d3b06-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "BOOKED",
          "rowColumn": "2_5"
        },
        {
          "code": "5b56187a-bd30-4026-afaf-53c41e657a47",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": "2_2"
        },
        {
          "code": "200d3b06-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "BOOKED",
          "rowColumn": "1_2"
        },
        {
          "code": "19e85ca6-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": "5_1"
        },
        {
          "code": "200d3b06-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "BOOKED",
          "rowColumn": "1_6"
        },
        {
          "code": "19e85ca6-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "FREE",
          "rowColumn": "14_1"
        },
        {
          "code": "200d3b06-368f-11ed-a261-0242ac120002",
          "type": "ECONOMY",
          "status": "BOOKED",
          "rowColumn": "6_5"
        }
      ]
    }
  }
});

export const flightProgramReducer = createReducer(
  initialState,
  on(FlightProgramActions.loadFlightProgramsOnSuccess,
    (state: FlightProgramState, next: { flightPrograms: FlightProgram[] }) => {
      return flightProgramEntityAdapter.addMany(next.flightPrograms, state);
    }),
  on(FlightProgramActions.selectFlightProgram,
    (state: FlightProgramState, next: FlightProgram) => {
      return {...state, flightProgramSelected: next};
    })
);
