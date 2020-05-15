import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SourceModel } from '../../models/source.model'
import { CrudService } from "../../services/crud/crud.service";
import { ObservablesService } from "../../services/observable/observable.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  private sources: SourceModel[] = [];
  private posts?: Object[] = null;
  private bookmarks = [];

  constructor(
    private ObservablesService: ObservablesService,
    private CrudService: CrudService
  ) {
    this.CrudService.createItem('news/sources', { news_api_token: environment.apiToken })
    .then(({ data }) => this.sources = data.sources)
    .catch(console.error)

    if (localStorage.getItem('last_source') !== null) {
      this.getArticles({ source: localStorage.getItem('last_source'), keywords: null }) 
    }

    this.ObservablesService.getBookmarks().subscribe(bookmarks => {
      this.bookmarks = bookmarks;
    })
  }

  private createBookmark = (sourceId: String) => {
    if (sourceId === null) return;
    const token = localStorage.getItem('token')
    const source = this.sources.find(({ id }) => id === sourceId)

    this.CrudService.createItem(`bookmark`, { ...source, token })
      .then(({ data }) => {
        this.bookmarks = [...this.bookmarks, data.data]
        this.ObservablesService.setObservableData('bookmarks', this.bookmarks);
      })
      .catch(console.error)
  }

  private deleteBookmark = (sourceId: String) => {
    if (sourceId === null) return;

    const token = localStorage.getItem('token')
    const bookmark = this.bookmarks.find(bookmark => bookmark.id === sourceId)

    this.CrudService.deleteItem(`bookmark`, bookmark._id, { token })
      .then(() => {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== sourceId)
        this.ObservablesService.setObservableData('bookmarks', this.bookmarks);
      })
      .catch(console.error)
  }

  private getArticles = ({ keywords, source }) => {
    localStorage.setItem('last_source', source)
    this.CrudService.createItem(`news/${source}/${keywords}`, { news_api_token: environment.apiToken })
    .then(({ data }) => this.posts = data.articles)
    .catch(console.error)
  }
}
