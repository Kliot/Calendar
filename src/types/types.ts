import { Dispatch, SetStateAction } from "react";

export const ENDPOINT = "https://date.nager.at/api/v3";

export interface ThemeProps<T> {
  theme: T;
}

export interface Country {
  countryCode: string;
  name: string;
}

export enum HolidayType {
  Public = "Public",
  Bank = "Bank",
  School = "School",
  Authorities = "Authorities",
  Optional = "Optional",
  Observance = "Observance",
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string;
  launchYear?: string;
  types: HolidayType[];
}

export enum EventsType {
  Work = "work",
  Daily = "daily",
  Birthday = "birthday",
}

export interface IEvents {
  id: string;
  name: string;
  label: string;
  date: string;
  isFiltered?: boolean;
  position: number;
}

export interface IEventsContext {
  events: IEvents[];
  setEvents: Dispatch<SetStateAction<IEvents[]>>;
}
