export class StatistikJahresspiegel {
  Caption: string;
  TimeStamp: Date;
  Duration: number;
  Statistik?: MyChartItem[];
}

export class StatistikJahresstatistik {
  Caption: string;
  TimeStamp: Date;
  Duration: number;
  Statistik?: MyChartItem[];
}

export class MyChartItem {
  Label: string;
  Value: number;
}

export class StatistikRankingList {
  Caption: string;
  TimeStamp: Date;
  Duration: number;
  MaxUmsatz: number;
  Statistik?: RankingItem[];
}

export class RankingItem {
    DOIDLFB: number;
    Rank: number;
    Name: string;
    Umsatz: number;
}
