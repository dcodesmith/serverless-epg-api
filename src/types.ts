export type Programme = {
  channel: string;
  show: string;
  type: string;
  description: string;
  synopsis: string;
  day: number;
  startTime: string;
  endTime: string;
  season: number;
  episode: number;
  numberOfEpisodes: number;
  genre: string;
  frequency: string;
};

export type Channel = {
  code: string;
  name: string;
};
