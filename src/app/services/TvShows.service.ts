import { Injectable } from '@angular/core';
import {TvShows} from '../modules/TvShows';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private shows: TvShows[] = [];
  detailShow: TvShows;

  constructor(private httpClient: HttpClient) {
    this.shows.push(new TvShows(1, 'Demon Slayer: Kimetsu no Yaiba'));
    this.shows.push(new TvShows(2, 'Shokugeki no Souma'));
    this.shows.push(new TvShows(3, 'Bob the Builder'));
    this.shows.push(new TvShows(4, 'Hunter x Hunter'));
    this.shows.push(new TvShows(5, 'Kono Subarashii Sekai ni Shukufuku o!'));
  }

  get tvShows() {
    return this.shows;
  }

  del(game: TvShows) {
    this.shows = this.shows.filter(t => t !== game);
  }
  async save(id: number, label: string) {
    try {
      const data = await this.httpClient.get('http://api.tvmaze.com/singlesearch/shows?q=' + label).toPromise();
        this.shows.push(new TvShows(id, data['name']));
    } catch (e) {
      alert('Die Show ' + label + ' gibt es nicht!');
    }
  }

  async detailInfo(show: TvShows) {
    const data = await this.httpClient.get('http://api.tvmaze.com/singlesearch/shows?q=' + show.label).toPromise();

    show.label = data['name'];
    show.img = data['image']['medium'];
    show.summary = data['summary'];
    show.genre = data ['genres'];
    show.movieId = data['id'];
    const castdata = await this.httpClient.get('http://api.tvmaze.com/shows/' + show.movieId + '/cast').toPromise();
    show.cast = castdata['person']['name'];
    try {
      show.name = data['webChannel']['name'];
    } catch (e) {
      show.name = '';
    }
    this.detailShow = show;
    console.table(this.detailShow);
  }
}
