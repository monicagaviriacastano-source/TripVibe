export interface SquadMember {
  id: string;
  name: string;
  role: string;
  roleType: 'lider' | 'tesorero' | 'conductor' | 'fotografo' | 'explorador' | 'curador' | 'miembro';
  avatar: string;
  status: 'confirmado' | 'pendiente';
  contributionAmount: number;
  targetAmount: number;
  percentage: number;
  statusText: string;
  note?: string;
  isKeyRole?: boolean;
}

export interface ActivityItem {
  id: string;
  time: string;
  location: string;
  title: string;
  description: string;
  tag: string;
  tagColor?: string;
  type: 'flight' | 'car' | 'hotel' | 'dinner' | 'activity';
  image?: string;
  accessCode?: string;
}

export interface PollOption {
  id: string;
  title: string;
  subtitle: string;
  votes: number;
  voters: string[];
  percentage: number;
}

export interface Poll {
  id: string;
  dayLabel: string;
  question: string;
  closesIn: string;
  options: PollOption[];
  userVotedOptionId?: string;
}

export interface TripExpense {
  id: string;
  title: string;
  amount: number;
  status: 'Confirmado' | 'Pagado' | 'En reserva' | 'Meta en curso';
  category: 'alojamiento' | 'transporte' | 'actividades' | 'comida';
  description: string;
}

export interface TransactionItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'in' | 'out';
  method: string;
}

export interface Trip {
  id: string;
  title: string;
  squadName: string;
  dates: string;
  days: number;
  daysRemaining: number;
  status: 'En progreso' | 'En planificación' | 'Completado';
  image: string;
  totalSaved: number;
  totalGoal: number;
  progressPercentage: number;
  estimatedPerPerson: number;
  members: SquadMember[];
  poll: Poll;
  activities: Record<string, ActivityItem[]>;
  expenses: TripExpense[];
  transactions: TransactionItem[];
}
