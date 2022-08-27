import { Component, OnInit } from '@angular/core';
import { RootStateService } from 'src/app/services/root-state.service';
import { SearchApiService } from 'src/app/services/search-api.service';

const HEROES = [
  {id: 1, name:'Superman'},
  {id: 2, name:'Batman'},
  {id: 5, name:'BatGirl'},
  {id: 3, name:'Robin'},
  {id: 4, name:'Flash'}
];
const data = [
  {
      "tags": [
          "ember.js",
          "code-coverage",
          "ember-cli",
          "ember-cli-code-coverage"
      ],
      "owner": {
          "account_id": 925293,
          "reputation": 5992,
          "user_id": 956191,
          "user_type": "registered",
          "accept_rate": 73,
          "profile_image": "https://www.gravatar.com/avatar/b37dca77be7b6cbee715d80bcc293da8?s=256&d=identicon&r=PG",
          "display_name": "wwwuser",
          "link": "https://stackoverflow.com/users/956191/wwwuser"
      },
      "is_answered": false,
      "view_count": 2686,
      "protected_date": 1661438115,
      "answer_count": 1,
      "score": 196,
      "last_activity_date": 1661610810,
      "creation_date": 1503351279,
      "last_edit_date": 1661610810,
      "question_id": 45805855,
      "content_license": "CC BY-SA 4.0",
      "link": "https://stackoverflow.com/questions/45805855/ember-cli-code-coverage-mocha-showing-0-coverage-when-there-are-tests",
      "title": "ember-cli-code-coverage mocha showing 0% coverage when there are tests"
  },
  {
      "tags": [
          "android"
      ],
      "owner": {
          "account_id": 26173933,
          "reputation": 1,
          "user_id": 19858428,
          "user_type": "registered",
          "profile_image": "https://lh3.googleusercontent.com/a-/AFdZucrEEHLPgIb_0tTBc1_q8yc9y9rIARUf1yTZFi-P=k-s256",
          "display_name": "abdulmaged alali",
          "link": "https://stackoverflow.com/users/19858428/abdulmaged-alali"
      },
      "is_answered": false,
      "view_count": 4,
      "answer_count": 0,
      "score": -1,
      "last_activity_date": 1661610781,
      "creation_date": 1661610781,
      "question_id": 73511874,
      "content_license": "CC BY-SA 4.0",
      "link": "https://stackoverflow.com/questions/73511874/why-is-the-go-social-app-not-working-in-the-uk",
      "title": "Why is the go social app not working in the UK?"
  },
  {
      "tags": [
          "java",
          "nio",
          "zip"
      ],
      "owner": {
          "account_id": 2119030,
          "reputation": 183,
          "user_id": 1882712,
          "user_type": "registered",
          "accept_rate": 20,
          "profile_image": "https://i.stack.imgur.com/Tn2sV.jpg?s=256&g=1",
          "display_name": "Ton van Bart",
          "link": "https://stackoverflow.com/users/1882712/ton-van-bart"
      },
      "is_answered": true,
      "view_count": 43055,
      "answer_count": 3,
      "score": 10,
      "last_activity_date": 1661610690,
      "creation_date": 1464092384,
      "last_edit_date": 1464170717,
      "question_id": 37413379,
      "content_license": "CC BY-SA 3.0",
      "link": "https://stackoverflow.com/questions/37413379/java-nio-zipfilesystem-zip-end-header-not-found-while-creating-file-system",
      "title": "Java NIO ZipFileSystem: &quot;zip END header not found&quot; while creating file system"
  },
  {
      "tags": [
          "java",
          "nio",
          "zip"
      ],
      "owner": {
          "account_id": 2119030,
          "reputation": 183,
          "user_id": 1882712,
          "user_type": "registered",
          "accept_rate": 20,
          "profile_image": "https://i.stack.imgur.com/Tn2sV.jpg?s=256&g=1",
          "display_name": "Ton van Bart",
          "link": "https://stackoverflow.com/users/1882712/ton-van-bart"
      },
      "is_answered": true,
      "view_count": 43055,
      "answer_count": 3,
      "score": 10,
      "last_activity_date": 1661610690,
      "creation_date": 1464092384,
      "last_edit_date": 1464170717,
      "question_id": 37413379,
      "content_license": "CC BY-SA 3.0",
      "link": "https://stackoverflow.com/questions/37413379/java-nio-zipfilesystem-zip-end-header-not-found-while-creating-file-system",
      "title": "Java NIO ZipFileSystem: &quot;zip END header not found&quot; while creating file system"
  },
  {
      "tags": [
          "java",
          "nio",
          "zip"
      ],
      "owner": {
          "account_id": 2119030,
          "reputation": 183,
          "user_id": 1882712,
          "user_type": "registered",
          "accept_rate": 20,
          "profile_image": "https://i.stack.imgur.com/Tn2sV.jpg?s=256&g=1",
          "display_name": "Ton van Bart",
          "link": "https://stackoverflow.com/users/1882712/ton-van-bart"
      },
      "is_answered": true,
      "view_count": 43055,
      "answer_count": 3,
      "score": 10,
      "last_activity_date": 1661610690,
      "creation_date": 1464092384,
      "last_edit_date": 1464170717,
      "question_id": 37413379,
      "content_license": "CC BY-SA 3.0",
      "link": "https://stackoverflow.com/questions/37413379/java-nio-zipfilesystem-zip-end-header-not-found-while-creating-file-system",
      "title": "Java NIO ZipFileSystem: &quot;zip END header not found&quot; while creating file system"
  },
  {
      "tags": [
          "java",
          "nio",
          "zip"
      ],
      "owner": {
          "account_id": 2119030,
          "reputation": 183,
          "user_id": 1882712,
          "user_type": "registered",
          "accept_rate": 20,
          "profile_image": "https://i.stack.imgur.com/Tn2sV.jpg?s=256&g=1",
          "display_name": "Ton van Bart",
          "link": "https://stackoverflow.com/users/1882712/ton-van-bart"
      },
      "is_answered": true,
      "view_count": 43055,
      "answer_count": 3,
      "score": 10,
      "last_activity_date": 1661610690,
      "creation_date": 1464092384,
      "last_edit_date": 1464170717,
      "question_id": 37413379,
      "content_license": "CC BY-SA 3.0",
      "link": "https://stackoverflow.com/questions/37413379/java-nio-zipfilesystem-zip-end-header-not-found-while-creating-file-system",
      "title": "Java NIO ZipFileSystem: &quot;zip END header not found&quot; while creating file system"
  },
  {
      "tags": [
          "java",
          "nio",
          "zip"
      ],
      "owner": {
          "account_id": 2119030,
          "reputation": 183,
          "user_id": 1882712,
          "user_type": "registered",
          "accept_rate": 20,
          "profile_image": "https://i.stack.imgur.com/Tn2sV.jpg?s=256&g=1",
          "display_name": "Ton van Bart",
          "link": "https://stackoverflow.com/users/1882712/ton-van-bart"
      },
      "is_answered": true,
      "view_count": 43055,
      "answer_count": 3,
      "score": 10,
      "last_activity_date": 1661610690,
      "creation_date": 1464092384,
      "last_edit_date": 1464170717,
      "question_id": 37413379,
      "content_license": "CC BY-SA 3.0",
      "link": "https://stackoverflow.com/questions/37413379/java-nio-zipfilesystem-zip-end-header-not-found-while-creating-file-system",
      "title": "Java NIO ZipFileSystem: &quot;zip END header not found&quot; while creating file system"
  }
]

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  heroes = HEROES;
  test = data;
  constructor(private rootStateService: RootStateService, private searchApiService: SearchApiService) { }
  data = this.searchApiService.getStaticDataForDevelopment();
  ngOnInit(): void {
    this.rootStateService.searchResponse$.subscribe(data => {
      // console.log(data)
    })
    this.searchApiService.getStaticDataForDevelopment().subscribe(
      (data) => console.log(data)
    )
  }

}
