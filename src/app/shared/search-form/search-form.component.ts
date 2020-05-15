import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SourceModel } from '../../models/source.model';
import { ObservablesService } from '../../services/observable/observable.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styles: []
})
export class SearchFormComponent implements OnInit {
  @Input() sources: Object[];
  @Input() bookmarks: SourceModel[];

  @Output() formSubmit = new EventEmitter();
  @Output() addBookmark = new EventEmitter();
  @Output() deleteBookmark = new EventEmitter();

  public formData: FormGroup;
  public isLogged: Boolean = false;
  public currentUser: Object;

  constructor(
    private ObservablesService: ObservablesService,
    private FormBuilder: FormBuilder
  ) {
    this.ObservablesService.getToken().subscribe(token => {
      this.isLogged = token !== null;
    })
  }

  private checkBookmarks = sourceId => {
    return this.bookmarks !== null ? this.bookmarks.some(bookmark => bookmark.id === sourceId) : false;
  }

  private resetForm = ()  => {
    this.formData = this.FormBuilder.group({
        source: [ localStorage.getItem('last_source'), Validators.required ],
        keywords: [ null ],
    });
  };

  ngOnInit() {
      this.resetForm();
  }

}
