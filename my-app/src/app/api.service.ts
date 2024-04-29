import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private posts: Post[] = [];
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsSubject.next([...this.posts]);
      })
    return this.postsSubject.asObservable();
  }

  addPost(post: Post) {
    this.posts = [...this.posts, post];
    this.postsSubject.next(this.posts);
  }
}
