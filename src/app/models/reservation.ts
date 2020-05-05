import { Voiture } from './voiture';
import { Client } from './client';

export class Reservation {
  id_reservation: number;
  voiture: Voiture;
  client: Client;
  debut_reservation: Date;
  fin_reservation: Date;
  prix_total: number;
  chauffeur: string;
}
