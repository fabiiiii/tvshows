export class TvShows {

  movieId: number;
  img: string;
  summary: string;
  name: string;
  genre: string[];
  cast: string[];
  constructor(public id: number, public label: string) {
  this.img = null;
  }
}
