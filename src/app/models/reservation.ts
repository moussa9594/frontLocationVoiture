import { Client } from './client';
import { VoitureIms } from './voitureIms';

export class Reservation {
  id_reservation: number;
  docVoiture: string;
  docClient: string;
  debut_reservation: Date;
  fin_reservation: Date;
  prix_total: number;
  chauffeur: string;
}
