import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styles: []
})
export class BookmarksPageComponent{

  private bookmarks : Object[];
  private posts: Object[];

  constructor(
    private ObservablesService: ObservablesService,
    private CrudService: CrudService
  ) { 
    this.ObservablesService.getBookmarks().subscribe(bookmarks => {
      this.bookmarks = bookmarks
    })
  }

  public getArticles = (sourceId: String) => {
    this.CrudService.createItem(`news/${sourceId}/null`, { news_api_token: environment.apiToken })
    .then(({ data }) => {
      this.posts = data.articles
    }).catch(console.error);
  }
}
